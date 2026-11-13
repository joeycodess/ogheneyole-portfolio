const subjects = {
  role: "New portfolio inquiry about a role",
  project: "New portfolio inquiry about a project",
  other: "New portfolio inquiry",
};

export async function sendNotification(pool, id, send = fetch) {
  const { RESEND_API_KEY, INQUIRY_FROM, INQUIRY_TO } = process.env;
  if (!RESEND_API_KEY || !INQUIRY_FROM || !INQUIRY_TO) {
    throw new Error("Inquiry email is not configured");
  }

  const { rows: [inquiry] } = await pool.query(
    `UPDATE portfolio_inquiries
     SET notification_attempted_at = now()
     WHERE id = $1 AND notification_sent_at IS NULL
       AND (notification_attempted_at IS NULL OR notification_attempted_at < now() - interval '15 minutes')
     RETURNING inquiry_type, reply_email, message`,
    [id]
  );
  if (!inquiry) return;

  const result = await send("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `portfolio-inquiry/${id}`,
    },
    body: JSON.stringify({
      from: INQUIRY_FROM,
      to: [INQUIRY_TO],
      reply_to: inquiry.reply_email,
      subject: subjects[inquiry.inquiry_type],
      text: `Inquiry ${id}\n\n${inquiry.message}`,
    }),
    signal: AbortSignal.timeout(4000),
  });
  if (!result.ok) throw new Error(`Email provider returned ${result.status}`);

  await pool.query("UPDATE portfolio_inquiries SET notification_sent_at = now() WHERE id = $1", [id]);
}

export async function retryPendingNotifications(pool) {
  const { rows } = await pool.query(
    `SELECT id FROM portfolio_inquiries
     WHERE notification_sent_at IS NULL
       AND (notification_attempted_at IS NULL OR notification_attempted_at < now() - interval '15 minutes')
     ORDER BY notification_attempted_at NULLS FIRST, created_at LIMIT 5`
  );

  let failures = 0;
  for (const { id } of rows) {
    try {
      await sendNotification(pool, id);
    } catch {
      failures++;
      console.error("Portfolio inquiry notification retry failed");
    }
  }
  return { checked: rows.length, failures };
}
