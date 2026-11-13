import { FiArrowRight, FiArrowUpRight, FiDownload } from "react-icons/fi";

export default function Automation() {
  return (
    <section className="folio-section" id="automation" aria-labelledby="automation-title">
      <div className="section-heading">
        <h2 id="automation-title">Workflow automation</h2>
      </div>
      <div className="automation-content">
        <p>I build automation with a way to preview changes, review exceptions, and verify what happened after a run.</p>
        <div className="automation-downloads">
          <a className="button" href="https://joeycodess.github.io/reconcile-desk/">Try Reconcile Desk <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
          <a className="text-link" href="/downloads/screenshot-archive.zip" download>Download the Python sample <FiDownload className="link-icon" aria-hidden="true" /></a>
          <a className="text-link" href="/work/mark-da-jeweller/#automation">How the jewellery catalogue import works <FiArrowRight className="link-icon" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
