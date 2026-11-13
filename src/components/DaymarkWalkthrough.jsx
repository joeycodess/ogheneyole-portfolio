import { FiArrowUpRight } from "react-icons/fi";

const demoUrl = "/daymark-demo/";

export default function DaymarkWalkthrough() {
  return (
    <section className="study-section" id="walkthrough" aria-labelledby="walkthrough-title">
      <div className="study-section-heading">
        <h2 id="walkthrough-title">From inbox to today</h2>
        <p>Try the real Daymark planner with a sample workspace. Move “Review the launch checklist” to tomorrow and check that its deadline stays the same.</p>
        <div className="study-demo-actions">
          <a className="button" href={demoUrl} target="_blank" rel="noopener">Open full-screen demo <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
          <a className="text-link" href="https://getdaymark.netlify.app/">Open the live app <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
        </div>
        <p className="study-demo-note">Use Reset demo inside the planner to restore the sample workspace. For installation, offline access, and device notifications, use the live app.</p>
      </div>
      <iframe
        className="study-demo-frame"
        src={demoUrl}
        title="Daymark interactive demo"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox"
      />
    </section>
  );
}
