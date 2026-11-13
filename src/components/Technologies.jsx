import { FiArrowUpRight } from "react-icons/fi";

const capabilities = [
  {
    title: "Frontend & UX",
    tools: "TypeScript, JavaScript, React, Next.js, HTML, CSS, Tailwind CSS",
    practice: "Responsive layouts, keyboard navigation, light and dark themes, reduced motion, and interfaces for loading, empty, and error states.",
    evidence: ["Reading controls and editorial UI", "/work/the-good-diaries/"],
  },
  {
    title: "Backend & access control",
    tools: "Node.js, Express, Django, Django REST Framework, Flask, FastAPI",
    practice: "REST endpoints, server-side validation, rate limiting, session and JWT authentication, and role-based permissions for staff workflows.",
    evidence: ["Storefront API and staff permissions", "/work/mark-da-jeweller/#architecture"],
  },
  {
    title: "Data & content systems",
    tools: "SQL, PostgreSQL, MongoDB, Mongoose, MySQL, Supabase, Convex, Sanity, GROQ",
    practice: "Relational and document modeling, reusable publishing records, and separating editorial data from reader submissions.",
    evidence: ["Publishing and newsletter architecture", "/work/the-good-diaries/#engineering"],
  },
  {
    title: "APIs & integrations",
    tools: "REST, webhooks, Paystack, Flutterwave, Resend, Better Auth",
    practice: "Payment initialization and verification, duplicate-event safeguards, and saving submissions before attempting email delivery.",
    evidence: ["Payment integration in source", "/work/mark-da-jeweller/#architecture"],
  },
  {
    title: "Python & workflow automation",
    tools: "Python, CLI scripting, macOS file workflows, CSV, SHA-256, Web Workers",
    practice: "Batch processing, dry runs, duplicate detection, safe reruns, per-file logs, and exception reports. I benchmark throughput and verify what a repeat run changes.",
    evidence: ["Screenshot Archive source and benchmark", "https://github.com/joeycodess/screenshot-archive"],
  },
  {
    title: "AI evaluation & annotation",
    tools: "Model output review · Data annotation · Mercor / Odin",
    practice: "I contributed to AI evaluation and annotation on Mercor’s Odin project. This public example shows how I would evaluate an answer against a specific requirement.",
    example: true,
  },
  {
    title: "Testing, delivery & offline web",
    tools: "Git, GitHub Actions, Docker, Vercel, Netlify, Service Workers, Web Storage",
    practice: "Automated tests, CI builds, production troubleshooting, offline caching, and safe updates that preserve user data.",
    evidence: ["Daymark offline architecture", "/work/daymark/#architecture"],
  },
];

export default function Technologies() {
  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-title">
      <div className="section-heading">
        <h2 id="skills-title">Technical skills</h2>
      </div>
      <ul className="skills-grid">
        {capabilities.map(({title, tools, practice, evidence, example}) => (
          <li key={title}>
            <h3>{title}</h3>
            <p className="skills-tools">{tools}</p>
            <p>{practice}</p>
            {example && (
              <details className="skill-example">
                <summary>Inspect an example evaluation</summary>
                <dl>
                  <div><dt>Task</dt><dd>Flag a missing payment when an invoice has zero payment records.</dd></div>
                  <div><dt>Model answer</dt><dd>“The invoice is underpaid because the received total is zero.”</dd></div>
                  <div><dt>Annotation</dt><dd><strong>Incorrect classification.</strong> A missing payment has no linked records. Underpayment requires at least one linked payment with a total below the invoice amount.</dd></div>
                </dl>
                <p>Illustrative example based on Reconcile Desk.</p>
              </details>
            )}
            {evidence && <a className="text-link" href={evidence[1]}>{evidence[0]} <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>}
          </li>
        ))}
      </ul>
    </section>
  );
}
