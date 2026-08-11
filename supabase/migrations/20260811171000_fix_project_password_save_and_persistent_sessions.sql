BEGIN;

-- A duration of 0 means the visitor remains signed in until the password,
-- protection state or duration changes. Tokens still carry a far-future
-- expiry so the existing storage and cleanup paths remain simple.
CREATE OR REPLACE FUNCTION public.verify_project_password(_password text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  s_enabled boolean;
  s_password_hash text;
  s_password_version integer;
  s_session_hours integer;
  request_headers jsonb;
  request_key text;
  request_key_hash text;
  recent_failures integer;
  raw_token text;
  raw_token_hash text;
  token_expiry timestamptz;
BEGIN
  SELECT enabled, password_hash, password_version, session_duration_hours
  INTO s_enabled, s_password_hash, s_password_version, s_session_hours
  FROM public.project_access_settings
  WHERE id = 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'not_configured');
  END IF;

  request_headers := COALESCE(
    NULLIF(current_setting('request.headers', true), '')::jsonb,
    '{}'::jsonb
  );
  request_key := COALESCE(
    request_headers ->> 'cf-connecting-ip',
    request_headers ->> 'x-real-ip',
    request_headers ->> 'x-forwarded-for',
    'unknown'
  ) || '|' || COALESCE(request_headers ->> 'user-agent', 'unknown');
  request_key_hash := encode(digest(request_key || ':' || COALESCE(s_password_hash, ''), 'sha256'), 'hex');

  DELETE FROM public.project_access_attempts
  WHERE created_at < now() - interval '24 hours';
  DELETE FROM public.project_access_tokens
  WHERE expires_at <= now();

  IF s_enabled THEN
    IF s_password_hash IS NULL THEN
      RETURN jsonb_build_object('error', 'not_configured');
    END IF;

    SELECT count(*)::integer
    INTO recent_failures
    FROM public.project_access_attempts
    WHERE key_hash = request_key_hash
      AND success = false
      AND created_at >= now() - interval '15 minutes';

    IF recent_failures >= 5 THEN
      RETURN jsonb_build_object('error', 'rate_limited');
    END IF;

    IF _password IS NULL OR crypt(_password, s_password_hash) <> s_password_hash THEN
      INSERT INTO public.project_access_attempts (key_hash, success)
      VALUES (request_key_hash, false);
      RETURN jsonb_build_object('error', 'invalid_password');
    END IF;

    INSERT INTO public.project_access_attempts (key_hash, success)
    VALUES (request_key_hash, true);

    token_expiry := CASE
      WHEN s_session_hours = 0 THEN now() + interval '100 years'
      ELSE now() + make_interval(hours => s_session_hours)
    END;
  ELSE
    token_expiry := now() + interval '1 hour';
  END IF;

  raw_token := encode(gen_random_bytes(32), 'hex');
  raw_token_hash := encode(digest(raw_token, 'sha256'), 'hex');

  INSERT INTO public.project_access_tokens (token_hash, password_version, expires_at)
  VALUES (raw_token_hash, s_password_version, token_expiry);

  RETURN jsonb_build_object(
    'token', raw_token,
    'expires_at', (extract(epoch FROM token_expiry) * 1000)::bigint,
    'disabled', NOT s_enabled
  );
END;
$$;

REVOKE ALL ON FUNCTION public.verify_project_password(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_project_password(text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.set_project_password(
  _password text DEFAULT NULL,
  _enabled boolean DEFAULT NULL,
  _session_duration_hours integer DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  current_enabled boolean;
  current_session_hours integer;
  invalidate_sessions boolean := false;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF _password IS NOT NULL AND length(_password) < 8 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Password must be at least 8 characters');
  END IF;

  IF _session_duration_hours IS NOT NULL
     AND _session_duration_hours NOT IN (0, 1, 8, 24, 72) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Invalid session duration');
  END IF;

  SELECT enabled, session_duration_hours
  INTO current_enabled, current_session_hours
  FROM public.project_access_settings
  WHERE id = 1;

  invalidate_sessions := _password IS NOT NULL
    OR (_enabled IS NOT NULL AND _enabled IS DISTINCT FROM current_enabled)
    OR (
      _session_duration_hours IS NOT NULL
      AND _session_duration_hours IS DISTINCT FROM current_session_hours
    );

  UPDATE public.project_access_settings
  SET
    enabled = COALESCE(_enabled, enabled),
    session_duration_hours = COALESCE(_session_duration_hours, session_duration_hours),
    password_hash = CASE
      WHEN _password IS NOT NULL THEN crypt(_password, gen_salt('bf', 10))
      ELSE password_hash
    END,
    password_version = password_version + CASE WHEN invalidate_sessions THEN 1 ELSE 0 END,
    updated_at = now(),
    updated_by = auth.uid()
  WHERE id = 1;

  IF invalidate_sessions THEN
    -- Supabase's safe-update guard rejects a DELETE without a WHERE clause.
    DELETE FROM public.project_access_tokens
    WHERE token_hash IS NOT NULL;
  END IF;

  RETURN jsonb_build_object('ok', true);
END;
$$;

REVOKE ALL ON FUNCTION public.set_project_password(text, boolean, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.set_project_password(text, boolean, integer) TO authenticated;

COMMIT;
