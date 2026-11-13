import { handleInquiry } from "../server/inquiry-handler.js";

export default {
  fetch(request) {
    if (process.env.VERCEL_ENV === "production") {
      return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
    }
    return handleInquiry(request);
  },
};
