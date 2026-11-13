import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { inquiryPool, saveInquiry } from "./inquiry-store.js";
import { sendNotification } from "./inquiry-notifications.js";

const bodyLimit = 16_384;
const hour = 3_600_000;
const inquiryTypes = new Set(["role", "project", "other"]);
const uuid = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

function reply(status, body, headers = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

async function readBody(request) {
  if (!request.body || Number(request.headers.get("content-length")) > bodyLimit) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let text = "";
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) return JSON.parse(text + decoder.decode());
      size += value.byteLength;
      if (size > bodyLimit) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export async function handleInquiry(request, getPool = inquiryPool, notify = sendNotification) {
  if (request.method !== "POST") return reply(405, { error: "method" }, { Allow: "POST" });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply(403, { error: "origin" });
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply(415, { error: "content-type" });
  }

  const id = request.headers.get("idempotency-key")?.toLowerCase();
  const body = await readBody(request);
  if (!uuid.test(id ?? "") || !body || !inquiryTypes.has(body.type) ||
      typeof body.email !== "string" || typeof body.message !== "string") {
    return reply(400, { error: "invalid" });
  }

  const email = body.email.trim();
  const message = body.message.trim();
  if (email.length > 254 || [...email].some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      message.length < 10 || message.length > 2000 || message.includes(String.fromCharCode(0))) {
    return reply(400, { error: "invalid" });
  }

  const now = Date.now();
  const forwardedIp = request.headers.get("x-vercel-forwarded-for");
  const secret = process.env.INQUIRY_RATE_SECRET;
  if (!secret) return reply(503, { error: "unavailable" });

  const visitor = isIP(forwardedIp ?? "") ? forwardedIp : "unknown";
  const rateKey = createHmac("sha256", secret).update(`${Math.floor(now / hour)}/${visitor}`).digest("hex");

  try {
    const pool = getPool();
    const result = await saveInquiry(pool, { id, type: body.type, email, message }, rateKey);
    if (result === "conflict") return reply(409, { error: "conflict" });
    if (result === "limited") {
      return reply(429, { error: "limited" }, { "Retry-After": String(Math.ceil((hour - now % hour) / 1000)) });
    }

    try {
      await notify(pool, id);
    } catch {
      console.error("Portfolio inquiry saved with notification pending");
    }
    return reply(result === "saved" ? 201 : 200, { received: true });
  } catch {
    console.error("Portfolio inquiry could not be saved");
    return reply(503, { error: "unavailable" });
  }
}
