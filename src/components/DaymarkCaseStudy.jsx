import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import useInitialFragment from "../useInitialFragment";
import desktop from "../assets/projects/daymark-desktop.png";
import mobile from "../assets/projects/daymark-mobile.png";
import Navbar from "./Navbar";
import ArchitectureFlow from "./ArchitectureFlow";
import Contacts from "./Contacts";
import DaymarkWalkthrough from "./DaymarkWalkthrough";

const architecture = [
  {
    title: "Interface and task model",
    detail: "The planner keeps planned dates and deadlines as separate fields. Today and Upcoming use both to surface work, and stable project IDs keep assignments intact when projects are renamed or archived.",
  },
  {
    title: "Browser storage",
    detail: "A versioned workspace snapshot stores tasks, project records, and task order. A validated backup can replace that workspace in one write. Legacy data is still readable.",
  },
  {
    title: "Service worker and cache",
    detail: "The production build precaches the files for a specific release. A navigation tries the network first and falls back to the cached app when the network fails or times out.",
  },
];

export default function DaymarkCaseStudy() {
  useInitialFragment();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main className="shell study" id="main" tabIndex="-1">
        <a className="text-link study-back" href="/#work"><FiArrowLeft className="link-icon" aria-hidden="true" /> Selected work</a>
        <article aria-labelledby="daymark-title">
          <header className="study-hero">
            <div>
              <p className="label">Personal project · Case study</p>
              <h1 id="daymark-title">Daymark</h1>
              <p className="study-summary">Daymark is an offline-first personal planner. Capture a task, choose when to work on it, and keep its deadline in view. Install it on your device and use it offline after the first online visit.</p>
              <div className="study-actions">
                <a className="button" href="https://getdaymark.netlify.app/">Open Daymark <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
                <a className="text-link" href="https://github.com/syredev/todo-app">Source &amp; README <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
                <a className="text-link" href="https://github.com/syredev/todo-app/actions">CI runs <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
              </div>
            </div>
            <img className="project-image" src={desktop} width="1440" height="900" alt="Daymark Today view on desktop, with planned tasks, projects, and a calendar" />
          </header>

          <div className="study-brief">
            <div>
              <h2>The problem</h2>
              <p>I rebuilt an earlier to-do app around two moments: capturing work quickly and deciding when to do it. The redesign separates planned dates from deadlines. You can move unfinished work to tomorrow without losing sight of when it’s actually due.</p>
            </div>
            <div>
              <h2>Why it stays in the browser</h2>
              <p>After the first visit, you can open Daymark offline. That makes backups and safe updates especially important. To move your tasks to another browser or device, export a backup and import it there.</p>
            </div>
          </div>

          <section className="study-section study-release" aria-labelledby="release-title">
            <div>
              <h2 id="release-title">From a list to a daily planner</h2>
              <p>The calendar brings planned work and deadlines together by date. Checklists break a task into steps, and recurring tasks create the next occurrence when completed. You can also export a dated task to your calendar.</p>
              <p>Reminders appear while Daymark is open. On supported devices, the opt-in closed-app reminder pilot uses web push. If you change a synced reminder offline, reconnect with Daymark open so it can update the schedule.</p>
            </div>
            <img className="project-image" src={mobile} width="390" height="844" alt="Daymark Today view on mobile with bottom navigation" loading="lazy" />
          </section>

          <DaymarkWalkthrough />

          <section className="study-section" id="architecture" aria-labelledby="architecture-title">
            <div className="study-section-heading">
              <h2 id="architecture-title">How it’s built</h2>
              <p>The app files and your tasks are stored separately. Daymark can update the app files and leave your tasks where they are.</p>
            </div>
            <ArchitectureFlow caption="Offline navigation" steps={["Browser", "Service worker", "Network or release cache"]} />
            <ArchitectureFlow caption="Workspace save" steps={["Task edit", "Revision check", "Browser storage"]} />
            <ul className="architecture-grid">
              {architecture.map(({ title, detail }) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="study-section study-decisions" aria-labelledby="decisions-title">
            <div className="study-section-heading">
              <h2 id="decisions-title">Engineering decisions</h2>
            </div>
            <dl>
              <div>
                <dt>Apply updates when the workspace is safe</dt>
                <dd>Daymark checks for updates when it comes back into view online. When a new worker takes control, the page waits for an in-progress save, capture draft, open dialog, or undo prompt to clear before reloading.</dd>
              </div>
              <div>
                <dt>Reject edits based on stale data</dt>
                <dd>Daymark compares the workspace revision before saving. When Web Locks is available, it runs the comparison and write inside the same lock. A stale save is rejected and the draft can be retried. Browsers without Web Locks retain the revision check.</dd>
              </div>
              <div>
                <dt>Preserve older work during migration and restore</dt>
                <dd>The full backup carries projects as well as tasks, including empty and archived projects. Older task-only backups still import while preserving the existing project list.</dd>
              </div>
            </dl>
          </section>
        </article>
      </main>
      <Contacts />
    </>
  );
}
