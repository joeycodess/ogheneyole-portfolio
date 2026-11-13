import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import useInitialFragment from "../useInitialFragment";
import homepage from "../assets/projects/the-good-diaries.webp";
import reader from "../assets/projects/the-good-diaries-reader.jpg";
import Navbar from "./Navbar";
import ArchitectureFlow from "./ArchitectureFlow";
import Contacts from "./Contacts";

const publication = "https://thegooddiaries.com";
const article = publication + "/articles/reading-rooms-and-borrowed-silence";
const issue = publication + "/issues/volume-one-rooms-rituals-and-quiet-use";

const editorialSteps = [
  ["Write the story", "An editor creates a post in Sanity Studio, adds the byline and cover image, and builds the article with text, figures, and pull quotes."],
  ["Choose where it appears", "The same post can be referenced from an issue or featured on the homepage. Editors can change a collection or its order without copying the article."],
  ["Publish it to the reading site", "Next.js renders the published content into the homepage, archives, and article pages. Each article has its own URL and share metadata."],
];

export default function GoodDiariesCaseStudy() {
  useInitialFragment();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main className="shell diaries-study" id="main" tabIndex="-1">
        <a className="text-link diaries-back" href="/#other-work-title">
          <FiArrowLeft className="link-icon" aria-hidden="true" /> More projects
        </a>
        <article aria-labelledby="diaries-title">
          <header className="diaries-hero">
            <div>
              <p className="label">Editorial publishing · Case study</p>
              <h1 id="diaries-title">The Good Diaries</h1>
              <p className="diaries-lede">A digital publication about design, culture, and everyday life. I built the reading site and the editorial workspace behind it.</p>
              <a className="button" href={publication + "/"}>Visit the publication <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
            </div>
            <figure className="diaries-home">
              <img src={homepage} width="900" height="570" alt="The Good Diaries homepage with its editorial masthead, lead story, and publication navigation" fetchPriority="high" />
            </figure>
          </header>

          <section className="diaries-brief" aria-labelledby="diaries-brief-title">
            <div>
              <h2 id="diaries-brief-title">The publishing brief</h2>
              <p>The publication needed a comfortable place to read long stories and a way to bring related pieces together into issues. Editors also needed to change the homepage as new work came in, using the same stories across the site.</p>
            </div>
            <div>
              <h2>My role</h2>
              <p>I built the public pages, modelled stories and issues in Sanity, and connected the newsletter and comments to server-side services. That let me design the reading experience alongside the workflow editors use to publish it.</p>
              <p className="tech-list">Next.js / TypeScript / Sanity / Supabase / Resend</p>
            </div>
          </section>

          <section className="diaries-section diaries-reader" aria-labelledby="diaries-reader-title">
            <div>
              <h2 id="diaries-reader-title">A reading view people can adjust</h2>
              <p>Long-form stories use a consistent layout for images, captions, and pull quotes. Readers can adjust text size, reading width, and line height. Those preferences are saved in the browser, so they carry over to the next story on that device.</p>
              <a className="text-link" href={article}>Open a live article <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
            </div>
            <figure>
              <img className="project-image" src={reader} width="1200" height="800" loading="lazy" alt="A live Good Diaries article with controls for text size, reading width, and line height" />
            </figure>
          </section>

          <section className="diaries-section" aria-labelledby="diaries-editorial-title">
            <h2 id="diaries-editorial-title">From draft to published issue</h2>
            <p>Stories, authors, issues, and homepage selections have their own records in Sanity. References let the editorial team reuse the same story in different parts of the publication.</p>
            <ol className="diaries-flow">
              {editorialSteps.map(([title, detail]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </li>
              ))}
            </ol>
            <a className="text-link" href={issue}>Browse a published issue <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
          </section>

          <section className="diaries-section" id="engineering" aria-labelledby="diaries-engineering-title">
            <h2 id="diaries-engineering-title">Engineering decisions</h2>
            <ArchitectureFlow caption="Publishing" steps={["Editor", "Sanity Studio", "Next.js publication"]} />
            <ArchitectureFlow caption="Newsletter signup" steps={["Reader", "Next.js endpoint", "Supabase", "Resend"]} />
            <dl className="diaries-decisions">
              <div>
                <dt>Refresh content on each page’s schedule</dt>
                <dd>The homepage refreshes its content more often than an individual story. That gives editors a shorter wait when they change what’s featured and lets article pages reuse cached content for longer.</dd>
              </div>
              <div>
                <dt>Keep reader submissions in their own data store</dt>
                <dd>Sanity holds editorial content. Next.js endpoints handle newsletter signups and comments, with Supabase storing reader submissions and Resend delivering newsletter welcome emails.</dd>
              </div>
              <div>
                <dt>Validate submissions before sending email</dt>
                <dd>The newsletter route checks the email and throttles repeat requests in the current process. That reduces rapid repeats in one instance. A shared limiter would be needed for the same limit across replicas.</dd>
              </div>
              <div>
                <dt>Keep signup and email delivery separate</dt>
                <dd>The signup flow saves the subscription before sending the welcome email. It checks for an existing subscriber and records when the welcome email was sent, so a return visit can recognise a previous signup.</dd>
              </div>
            </dl>
          </section>
        </article>
      </main>
      <Contacts />
    </>
  );
}
