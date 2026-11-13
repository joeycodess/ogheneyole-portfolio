import pg from "pg";

let pool;

export function inquiryPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  if (!pool) {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 5000,
      statement_timeout: 5000,
    });
    pool.on("error", () => console.error("Idle portfolio database connection failed"));
  }
  return pool;
}

export async function saveInquiry(pool, inquiry, rateKey) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Separate lock namespaces for idempotency keys and visitor rate buckets.
    await client.query("SELECT pg_advisory_xact_lock(1, hashtext($1))", [inquiry.id]);
    const { rows: [existing] } = await client.query(
      "SELECT inquiry_type, reply_email, message FROM portfolio_inquiries WHERE id = $1",
      [inquiry.id]
    );
    if (existing) {
      await client.query("COMMIT");
      return existing.inquiry_type === inquiry.type && existing.reply_email === inquiry.email &&
        existing.message === inquiry.message ? "repeat" : "conflict";
    }

    await client.query("SELECT pg_advisory_xact_lock(2, hashtext($1))", [rateKey]);
    const { rows: [rate] } = await client.query(
      "SELECT count(*)::int AS submissions FROM portfolio_inquiries WHERE rate_key = $1",
      [rateKey]
    );
    if (rate.submissions >= 5) {
      await client.query("COMMIT");
      return "limited";
    }

    await client.query(
      `INSERT INTO portfolio_inquiries (id, inquiry_type, reply_email, message, rate_key)
       VALUES ($1, $2, $3, $4, $5)`,
      [inquiry.id, inquiry.type, inquiry.email, inquiry.message, rateKey]
    );
    await client.query("COMMIT");
    return "saved";
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}
