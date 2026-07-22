// HMAC-SHA256 signed access tokens for the portfolio password gate.
// Format: base64url(payloadJson).base64url(signature)

const enc = new TextEncoder();

function b64urlEncode(bytes: Uint8Array): string {
  let s = btoa(String.fromCharCode(...bytes));
  return s.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(str: string): Uint8Array {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const s = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export interface AccessTokenPayload {
  scope: "portfolio_projects";
  iat: number; // seconds
  exp: number; // seconds
  pv: number; // password_version
}

export async function signAccessToken(payload: AccessTokenPayload, secret: string): Promise<string> {
  const key = await hmacKey(secret);
  const body = b64urlEncode(enc.encode(JSON.stringify(payload)));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(body)));
  return `${body}.${b64urlEncode(sig)}`;
}

export async function verifyAccessToken(
  token: string,
  secret: string,
): Promise<AccessTokenPayload | null> {
  try {
    const [body, sig] = token.split(".");
    if (!body || !sig) return null;
    const key = await hmacKey(secret);
    const ok = await crypto.subtle.verify("HMAC", key, b64urlDecode(sig), enc.encode(body));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body))) as AccessTokenPayload;
    if (payload.scope !== "portfolio_projects") return null;
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function hashKey(input: string, salt: string): Promise<string> {
  const bytes = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(`${salt}:${input}`)));
  return b64urlEncode(bytes);
}
