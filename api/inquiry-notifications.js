import { createHash, timingSafeEqual } from "node:crypto";
import { inquiryPool } from "../server/inquiry-store.js";
import { retryPendingNotifications } from "../server/inquiry-notifications.js";

function digest(value) {
  return createHash("sha256").update(value).digest();
}

export default {
  async fetch(request) {
    const headers = { "Cache-Control": "no-store" };
    if (process.env.VERCEL_ENV === "production") return new Response(null, { status: 404, headers });
    if (request.method !== "GET") return new Response(null, { status: 405, headers: { ...headers, Allow: "GET" } });

    const secret = process.env.CRON_SECRET;
    const authorization = request.headers.get("authorization") ?? "";
    if (!secret || !timingSafeEqual(digest(authorization), digest(`Bearer ${secret}`))) {
      return new Response(null, { status: 401, headers });
    }

    try {
      const result = await retryPendingNotifications(inquiryPool());
      return Response.json(result, { status: result.failures ? 503 : 200, headers });
    } catch {
      console.error("Portfolio inquiry retry job failed");
      return new Response(null, { status: 503, headers });
    }
  },
};
