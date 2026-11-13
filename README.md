# Portfolio Website

This is my personal portfolio website showcasing my projects, skills, and contact information. It is built using modern web technologies to ensure a fast, responsive, and interactive experience. Live at https://ogheneyole.vercel.app

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects
- **Framer Motion**: A library for animations and gestures
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Inquiry flow on Vercel

Production uses the direct contact email link. The inquiry form and API are available in Preview. To enable them in Production, configure a verified Resend sender and the Production variables, remove the Production guards in `api/`, enable the form in the production Vite build, and restore the daily cron schedule `0 7 * * *` for `/api/inquiry-notifications` in `vercel.json`.

The portfolio is a Vite multi-page build. Use the Vite framework preset, `npm run build`, and `dist` as the output directory. Vercel serves the functions from `api/`. Verify the Git repository and production branch on the existing Vercel project before pushing.

1. Create a dedicated PostgreSQL database for the preview. Apply [db/inquiries.sql](db/inquiries.sql) with the database owner, then set `DATABASE_URL` to its TLS connection URL. The functions use the table owner for this dedicated database. Row-level security is enabled with no public policies, and the browser never receives database credentials.
2. Add the server-only variables from [.env.example](.env.example) to the Vercel Preview environment. Use a high-entropy random value for each secret. Configure a Resend sending API key and verified `INQUIRY_FROM` address, plus your own `INQUIRY_TO` test inbox. Keep the database and email credentials out of frontend variables.
3. Deploy a preview branch. Open both `/` and `/work/daymark/`, then submit a test message. Confirm the saved row and inbox receipt. Repeat the same request with its original submission key and confirm the API returns a success without inserting a second row.
4. Configure the Production environment separately when ready to enable the form. To test notification retries in Preview, invoke `GET /api/inquiry-notifications` with `Authorization: Bearer <CRON_SECRET>`. The retry job skips attempts less than 15 minutes old and processes up to five pending messages per run.

Use `npm run dev` for frontend work or `vercel dev` with a linked Vercel project and development credentials for end-to-end local testing. With only the frontend dev server, use the direct email link instead of the form.

### ADR-001 · Persist inquiries before notifying by email

**Status** — Accepted for implementation. Provider credentials and preview verification are pending.

**Context.** The portfolio serves engineering hiring teams and prospective clients. An inquiry must survive a lost HTTP response and a temporary mail-provider failure.

**Decision.** A Vercel Function validates each JSON submission. PostgreSQL serializes writes by submission key and by visitor rate bucket. A unique UUID identifies each message. An identical retry acknowledges the existing record, while a different payload using the same key returns a conflict. The server accepts five new messages per visitor per UTC hour and stores a keyed digest of the IP and hour. The raw IP is excluded from the inquiry table.

Email notification runs after the commit. A failed attempt leaves the row pending, and the daily job can claim and retry it. The email request uses the inquiry UUID as its Resend idempotency key. The public contact page includes an architecture summary and a direct email option.

**Consequences.** Database writes can succeed while email is unavailable. Notification retry is best effort and may be delayed until the next scheduled run. Resend deduplicates within its documented 24-hour window. A crash after the provider accepts a message can result in another notification after that window. Inquiry content and reply addresses are available to the database owner and in the recipient inbox. Before launch, agree on retention for both locations. Operators can review and remove records in the database console. The implementation does not delete inquiries automatically.

**Alternatives considered.** Email-only submission has fewer dependencies but cannot acknowledge a durable record when the provider fails. A separate queue adds infrastructure for the current traffic expectations. The inquiry row doubles as the pending notification record.

**References** — [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js) · [Vercel Cron](https://vercel.com/docs/schedules/cron-jobs) · [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys)
### Refresh the Daymark demo

The case study embeds a build of Daymark with a separate sample workspace. Rebuild it from a Daymark checkout with its locked dependencies installed:

```sh
bash scripts/build-daymark-demo.sh /path/to/daymark
```

The script builds the checkout’s committed source into `public/daymark-demo/`. The demo uses its own browser storage keys and leaves installation, offline caching, and device notifications to the standalone app.
