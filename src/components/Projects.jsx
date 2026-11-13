import { FiArrowUpRight } from "react-icons/fi";
import reconcile from "../assets/projects/reconcile-desk.webp";
import reconcileSmall from "../assets/projects/reconcile-desk-480.webp";
import daymark from "../assets/projects/daymark-desktop.png";
import diaries from "../assets/projects/the-good-diaries.webp";
import jeweller from "../assets/projects/mark-da-jeweller.webp";

import daymarkSmall from "../assets/projects/daymark-desktop-480.webp";

import diariesSmall from "../assets/projects/the-good-diaries-480.webp";

import jewellerSmall from "../assets/projects/mark-da-jeweller-480.webp";

const projects = [
  {
    slug: "daymark",
    title: "Daymark",
    category: "Personal planning · Offline-first",
    summary: "An installable planner that separates when you intend to do something from when it’s actually due.",
    stack: "JavaScript / Service Worker / Web Storage",
    image: daymark,
    small: daymarkSmall,
    alt: "Daymark planner showing tasks and a monthly calendar",
    width: 1440,
    height: 900,
  },
  {
    slug: "reconcile-desk",
    title: "Reconcile Desk",
    category: "Browser demo · Workflow automation",
    summary: "Match invoices to payments, inspect exceptions, and export a CSV report. Try the sample data or process your own files in the browser.",
    stack: "JavaScript / Web Workers / CSV",
    image: reconcile,
    small: reconcileSmall,
    alt: "Reconcile Desk showing a sample run with eight references, three matches and five exceptions",
    width: 960,
    height: 713,
    href: "https://joeycodess.github.io/reconcile-desk/",
    action: "Try the live demo",
  },
  {
    slug: "mark-da-jeweller",
    title: "Mark Da Jeweller",
    category: "E-commerce · Full-stack",
    summary: "A jewellery storefront with two paths to buy, and an admin workspace for managing products, orders, and bespoke inquiries.",
    stack: "Next.js / Express / MongoDB",
    image: jeweller,
    small: jewellerSmall,
    alt: "Mark Da Jeweller storefront with links to shop and explore custom jewellery",
    width: 1200,
    height: 750,
  },
  {
    slug: "the-good-diaries",
    title: "The Good Diaries",
    category: "Publishing · Full-stack",
    summary: "An editorial reading experience with a CMS for publishing issues and a backend for subscriptions and moderated comments.",
    stack: "Next.js / Sanity / Supabase / Resend",
    image: diaries,
    small: diariesSmall,
    alt: "The Good Diaries homepage and its lead story",
    width: 900,
    height: 570,
  },
];

export default function Projects() {
  return (
    <section className="work selected-work" id="work" aria-labelledby="work-title">
      <div className="work-heading selected-work-heading">
        <h2 id="work-title">Selected work</h2>
        <a className="text-link" href="https://github.com/joeycodess?tab=repositories">Browse GitHub repositories <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
      </div>
      <div className="selected-projects" id="other-work-title">
        {projects.map(({slug, title, category, summary, stack, image, small, alt, width, height, href = `/work/${slug}/`, action = "Read case study"}) => (
          <article className={`project-card project-card--${slug}`} key={slug} id={slug === "daymark" ? "daymark-engineering" : undefined}>
            <a className="project-card-media" href={href} aria-label={title}>
              <img src={image} srcSet={`${small} 480w, ${image} ${width}w`} sizes="(max-width: 544px) 92vw, 46vw" alt={alt} width={width} height={height} loading="lazy" />
            </a>
            <div className="project-card-copy">
              <p className="label">{category}</p>
              <h3>{title}</h3>
              <p>{summary}</p>
              <p className="tech-list">{stack}</p>
              <a className="text-link" href={href} aria-label={`${action} · ${title}`}>{action} <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
