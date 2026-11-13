import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useInitialFragment from "../useInitialFragment";
import storefront from "../assets/projects/mark-da-jeweller.webp";
import ArchitectureFlow from "./ArchitectureFlow";
import Navbar from "./Navbar";
import Contacts from "./Contacts";

export default function JewellerCaseStudy() {
  useInitialFragment();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main className="shell study jeweller-study" id="main" tabIndex="-1">
        <a className="text-link study-back" href="/#work"><FiArrowLeft className="link-icon" aria-hidden="true" /> Selected work</a>
        <article aria-labelledby="jeweller-title">
          <header className="study-hero">
            <div>
              <p className="label">E-commerce · Case study</p>
              <h1 id="jeweller-title">Mark Da Jeweller</h1>
              <p className="study-summary">A storefront for ready-to-buy jewellery and bespoke commissions, backed by a separate staff workspace.</p>
            </div>
            <figure className="study-cover"><img src={storefront} width="1200" height="750" alt="Mark Da Jeweller storefront with shop and custom gallery actions" fetchPriority="high" /></figure>
          </header>
          <nav className="study-index" aria-label="Case study sections">
            <a className="text-link" href="#design">Customer experience</a>
            <a className="text-link" href="#architecture">Architecture &amp; API</a>
            <a className="text-link" href="#automation">Automation</a>
          </nav>
          <section className="study-brief" id="design">
            <div><h2>The brief</h2><p>The shop needed to support two different decisions. A customer buying an existing piece wants to browse and check out. A customer commissioning a piece needs examples, then a way to describe what they have in mind.</p></div>
            <div><h2>The workflow</h2><p>The storefront offers a catalogue and a custom gallery. Catalogue visitors can add items to a cart. Gallery visitors can submit an inquiry that staff can review and update in the admin area.</p></div>
          </section>
          <section className="study-section" id="architecture" aria-labelledby="jeweller-architecture-title">
            <div className="study-section-heading"><h2 id="jeweller-architecture-title">Architecture &amp; API</h2><p>The storefront and admin share an Express API. MongoDB stores products, categories, orders, and inquiries. Public catalogue reads and staff mutations use distinct routes and permissions.</p></div>
            <ArchitectureFlow caption="Storefront and staff data" steps={["Next.js storefront or admin", "Express API", "MongoDB"]} />
            <ArchitectureFlow caption="Payment integration in source" steps={["Checkout", "Express payments route", "Flutterwave"]} />
            <div className="endpoint-list" aria-label="Selected REST endpoints">
              <div><code>GET /api/products</code><span>Public catalogue read</span></div>
              <div><code>POST /api/contact</code><span>Public bespoke inquiry submission</span></div>
              <div><code>PATCH /api/orders/:id/status</code><span>Staff-only order status update</span></div>
            </div>
            <p>Authentication identifies the requester. The admin middleware checks their current role before allowing protected changes. The payment routes implement initialization, verification, and a webhook. Live payment processing is unverified.</p>
          </section>
          <section className="study-section" id="automation" aria-labelledby="jeweller-automation-title">
            <div className="study-section-heading"><h2 id="jeweller-automation-title">Importing a catalogue from media</h2><p>A Node.js import script filters product images, assigns categories based on filenames, and writes product records using a slug as the lookup key. Rerunning the script updates matching records. Because the script can overwrite matching fields, it is suited to an initial catalogue import or a controlled update.</p></div>
            <ArchitectureFlow caption="Media import" steps={["Image inbox", "Filter and classify", "Upsert products by slug"]} />
            <a className="text-link" href="/work/the-good-diaries/">Next case study · The Good Diaries <FiArrowRight className="link-icon" aria-hidden="true" /></a>
          </section>
        </article>
      </main>
      <Contacts />
    </>
  );
}
