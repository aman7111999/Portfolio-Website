update public.content_blocks
set data = jsonb_set(
  data,
  '{items}',
  '[{"v":"1.6M+","l":"Designed for real scale"},{"v":"4.5+","l":"Years simplifying complexity"},{"v":"1 obsession","l":"Make hard things obvious"}]'::jsonb,
  true
),
updated_at = now()
where key = 'home_stats';
