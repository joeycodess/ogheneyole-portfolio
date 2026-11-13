import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import Navbar from "./Navbar";
import useInitialFragment from "../useInitialFragment";
import vexelLight from "../assets/ventures/vexel-group-on-light.svg";
import vexelDark from "../assets/ventures/vexel-group-on-dark.svg";
import veetchLogo from "../assets/ventures/veetch-lockup-on-dark.svg";

const navigation = [
  ["VEXEL", "/vexel/"],
  ["Products", "/vexel/#veetch"],
  ["Portfolio", "/"],
];

const productLines = [
  ["Receive SMS", "Use a temporary number to receive a one-time text on supported services and read the message in your dashboard."],
  ["Rent a number", "Keep a number and its inbox for a fixed period when you need to receive texts over several days."],
  ["Travel eSIM", "Compare mobile data plans by destination, buy one for a compatible device, and follow the setup instructions before you travel."],
  ["Dedicated monthly numbers", "Keep an assigned number and inbox for recurring use, with renewals managed from the same account."],
];

const businessUseCases = [
  ["Agencies and project teams", "A short-term rental could give an event or campaign its own inbound SMS inbox for the duration of the project. A development team could use a temporary number for a one-off SMS check on a service it owns or has permission to test."],
  ["Businesses with recurring needs", "A dedicated monthly number could give a business a consistent place to receive texts for an ongoing operation, with the renewal date visible alongside the order."],
  ["Companies and travel agencies", "A company could arrange mobile data for staff heading abroad. A travel agency could use destination-specific plan information to help clients prepare for a trip."],
];

const purchaseRules = [
  ["Temporary numbers", "Choose a one-time or repeating schedule when you expect to need a number for a one-time text on a supported service. Time the order around the short window in which the number can receive the text."],
  ["Fixed-term rentals", "Set a reminder, schedule a new rental, or opt into extending the same number before expiry when the provider supports it."],
  ["Travel eSIM", "Schedule a purchase ahead of a trip or opt into a top-up where the plan supports it. Check when the plan’s validity starts before choosing when to buy."],
  ["Dedicated monthly numbers", "Opt into renewing the same number month to month. See the next charge date and get a notice if a price change or low balance needs your attention."],
];

export default function VeetchPage() {
  useInitialFragment();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar
        brand={
          <a className="wordmark vexel-wordmark" href="/vexel/" aria-label="VEXEL Group home">
            <img src={vexelLight} width="518" height="150" alt="" />
            <img src={vexelDark} width="518" height="150" alt="" />
          </a>
        }
        links={navigation}
        navigationLabel="VEXEL Group navigation"
      />
      <main id="main" tabIndex="-1">
        <section className="shell vexel-section vexel-product" id="veetch" aria-labelledby="veetch-title">
          <div className="vexel-product-intro">
            <div className="vexel-prose">
              <img src={veetchLogo} width="365" height="80" alt="VEETCH" />
              <p className="label">A product by VEXEL Group</p>
              <h1 id="veetch-title">A number when you need one. Data when you travel.</h1>
              <p>VEETCH is a product by VEXEL Group. I’m building it for individuals and for agencies and businesses that need virtual numbers or travel data for a defined period. Today those needs can send people to separate providers with different accounts, payment steps, and support channels.</p>
              <p>The product is in development. Public sign-up and purchases are currently unavailable.</p>
              <a className="vexel-link" href="https://wa.me/message/5K2INCSUDN5GA1">Ask about VEETCH <FiArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="vexel-product-scope">
            <h3>Planned services</h3>
            <dl>
              {productLines.map(([title, detail]) => (
                <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>
              ))}
            </dl>
          </div>
          <div className="vexel-progress" id="veetch-business">
            <h3>How teams could use VEETCH</h3>
            <dl>
              {businessUseCases.map(([title, detail]) => (
                <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>
              ))}
            </dl>
          </div>
          <div className="vexel-progress vexel-purchase-rules" id="veetch-automation">
            <h3>Planned purchase and renewal automation</h3>
            <p>You’ll be able to opt into scheduled purchases and renewals, set a spending limit, and see what’s due next. You can pause a rule any time. If a price changes beyond your limit or an order needs attention, you’ll be able to review it before another purchase goes through.</p>
            <dl>
              {purchaseRules.map(([title, detail]) => (
                <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <footer className="vexel-footer">
        <div className="shell">
          <div>
            <img src={vexelDark} width="518" height="150" alt="VEXEL Group" />
            <p>Founded and built by Ogheneyole Gold.</p>
          </div>
          <div className="vexel-footer-links">
            <a className="vexel-link" href="/#contact">Talk about a project <FiArrowUpRight aria-hidden="true" /></a>
            <a className="vexel-link" href="/"><FiArrowLeft aria-hidden="true" /> Back to portfolio</a>
          </div>
        </div>
      </footer>
    </>
  );
}
