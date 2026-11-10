// Sends a push notification (via ntfy) when someone opens the portfolio.
//
// Env vars (Vercel → Project → Settings → Environment Variables):
//   NTFY_TOPIC   required. A long, unguessable topic name; subscribe to it in the ntfy app.
//   NTFY_SERVER  optional. Defaults to https://ntfy.sh (set it if you self-host ntfy).
//   NTFY_TOKEN   optional. Access token, if your ntfy topic is protected.
//
// Without NTFY_TOPIC the endpoint does nothing, so local dev and previews stay quiet.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BOT_RE =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|quora|whatsapp|telegram|discord|slack|linkedin|vercel|lighthouse|headless|phantom|python|curl|wget|axios|node-fetch|go-http/i;

// Best-effort dedupe per server instance: one notification per visitor every 30 minutes.
const recent = new Map<string, number>();
const WINDOW_MS = 30 * 60 * 1000;

function seenRecently(key: string) {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > WINDOW_MS) recent.delete(k);
  if (recent.has(key)) return true;
  recent.set(key, now);
  return false;
}

function describeDevice(ua: string) {
  const os = /iPhone|iPad/.test(ua)
    ? "iOS"
    : /Android/.test(ua)
      ? "Android"
      : /Mac OS X/.test(ua)
        ? "macOS"
        : /Windows/.test(ua)
          ? "Windows"
          : /Linux/.test(ua)
            ? "Linux"
            : "Unknown OS";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\//.test(ua)
      ? "Opera"
      : /Firefox\//.test(ua)
        ? "Firefox"
        : /Chrome\//.test(ua)
          ? "Chrome"
          : /Safari\//.test(ua)
            ? "Safari"
            : "Browser";
  const kind = /Mobi|iPhone|Android(?!.*Tablet)/.test(ua) ? "📱" : /iPad|Tablet/.test(ua) ? "📟" : "💻";
  return `${kind} ${browser} on ${os}`;
}

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.slice(0, max).replace(/[\r\n]+/g, " ") : "");

function referrerLabel(ref: string) {
  if (!ref) return "Direct / unknown";
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    return host || "Direct / unknown";
  } catch {
    return "Direct / unknown";
  }
}

export async function POST(req: Request) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return new Response(null, { status: 204 });

  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_RE.test(ua)) return new Response(null, { status: 204 });

  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(await req.text());
  } catch {
    /* sendBeacon payloads are small JSON; ignore anything else */
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (seenRecently(`${ip}|${ua}`)) return new Response(null, { status: 204 });

  // Vercel geo headers; the city comes URL-encoded.
  const country = req.headers.get("x-vercel-ip-country") ?? "";
  const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") ?? "");
  const where = [city, country].filter(Boolean).join(", ") || "Unknown location";
  const flag = /^[A-Z]{2}$/.test(country)
    ? String.fromCodePoint(...[...country].map((c) => 0x1f1a5 + c.charCodeAt(0)))
    : "🌍";

  const path = clean(body.path, 120) || "/";
  const message = [
    `📍 ${where}`,
    `🔗 From: ${referrerLabel(clean(body.referrer, 500))}`,
    `📄 Page: ${path}`,
    describeDevice(ua),
    clean(body.lang, 20) ? `🗣️ ${clean(body.lang, 20)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const server = (process.env.NTFY_SERVER || "https://ntfy.sh").replace(/\/$/, "");
  const headers: Record<string, string> = {
    // ntfy headers must be ASCII; the emoji go in the body and in Tags.
    Title: `New portfolio visitor${country ? ` (${country})` : ""}`,
    Tags: "eyes",
    Priority: "default",
  };
  if (process.env.NTFY_TOKEN) headers.Authorization = `Bearer ${process.env.NTFY_TOKEN}`;

  try {
    await fetch(`${server}/${encodeURIComponent(topic)}`, {
      method: "POST",
      headers,
      body: `${flag} ${message}`,
      signal: AbortSignal.timeout(4000),
    });
  } catch (error) {
    console.error("visit notification failed", error);
  }
  return new Response(null, { status: 204 });
}
