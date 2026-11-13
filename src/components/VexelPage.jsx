import { FiArrowDown, FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import Navbar from "./Navbar";
import useInitialFragment from "../useInitialFragment";
import vexelLight from "../assets/ventures/vexel-group-on-light.svg";
import vexelDark from "../assets/ventures/vexel-group-on-dark.svg";
import vexelMark from "../assets/ventures/vexel-x-mark-on-dark.svg";
import veetchLogo from "../assets/ventures/veetch-lockup-on-dark.svg";

const navigation = [
  ["Story", "#story"],
  ["Approach", "#approach"],
  ["VEETCH", "#veetch"],
  ["Portfolio", "/"],
];

const milestones = [
  [
    "February 2026",
    "Where it started",
    "The idea for VEXEL came to me in February. A business can have a strong brand and a good-looking website, yet still handle every inquiry, order, and follow-up by hand. I wanted to build a company that could plan the customer experience and the work behind it together. A storefront, for example, should give shoppers a clear way to buy and give the business a practical way to manage what happens after the order comes in.",
  ],
  [
    "October 2026",
    "From services to products",
    "As I worked out what VEXEL could offer, I saw two ways to put that idea into practice. A client project can fit the way one business works. An owned product makes sense when many people need to do the same job and could use a service built around it. I wanted VEXEL to do both, with the time and responsibility to keep improving its own products after release.",
  ],
  [
    "November 2026",
    "Building VEXEL and VEETCH",
    "I developed VEXEL’s identity and started putting the product side of the business into practice with VEETCH. Individuals and businesses can need the same thing for different reasons. A traveller may need data for a trip, while an agency may need an SMS inbox for a campaign that only runs for a few days. I chose that problem because VEXEL could bring those needs into one account and own the whole experience, from helping someone choose a service to showing what happened after they paid.",
  ],
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

export default function VexelPage() {
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
        <section className="vexel-hero" aria-labelledby="vexel-title">
          <div className="shell vexel-hero-inner">
            <img className="vexel-hero-mark" src={vexelMark} alt="" width="280" height="280" />
            <div className="vexel-hero-copy">
              <p className="label">VEXEL Group</p>
              <h1 id="vexel-title">Building digital businesses.<br /> <em>Engineering digital growth.</em></h1>
              <p>I founded VEXEL to build software that fits how a business works and to develop products around needs people share. I bring design and engineering into the same conversation early, so what customers see, what the team needs to do, and what software can handle automatically are planned together.</p>
              <a className="vexel-link" href="#story">Read the story <FiArrowDown aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="shell vexel-section vexel-grid" id="story" aria-labelledby="story-title">
          <div>
            <p className="label">The story</p>
            <h2 id="story-title">Why I started VEXEL</h2>
            <div className="vexel-prose">
              <p>I’m Ogheneyole Gold, the sole founder and builder of VEXEL. I’ve been responsible for its direction, brand, and engineering. Getting the idea this far has also meant talking it through with people who see it from different angles.</p>
              <p>I used AI assistants to work through the business and product plans, then used AI-assisted research to compare existing services and identify what needed checking. AI design tools helped me explore the visual identity, and coding assistants helped me implement, review, and test the software.</p>
              <p>I shared ideas with graphic designers, software engineers, technical writers, and data analysts to get perspectives on how the brand reads, how the product could work, and what I should measure. Friends and family helped me explain the idea in everyday language and hear which parts raised questions. I’ll keep bringing in those perspectives and use hands-on feedback as VEETCH moves toward release.</p>
            </div>
          </div>
          <ol className="vexel-timeline">
            {milestones.map(([date, title, detail]) => (
              <li key={date}>
                <p className="label">{date}</p>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="vexel-approach" id="approach" aria-labelledby="approach-title">
          <div className="shell vexel-section">
            <p className="label">The approach</p>
            <h2 id="approach-title">Start with how the work gets done</h2>
            <p>I start by tracing a task from beginning to end. What does the customer need to do? Who picks it up next? Where does information get lost or entered twice? Those answers tell me what to build first and what should be easier once it’s in use.</p>
            <div className="vexel-approach-grid">
              <div className="vexel-prose">
                <h3>Software for businesses</h3>
                <p>For a client, the starting point might be a storefront that makes buying easier or an internal tool that keeps inquiries from getting buried. I design the interface alongside the data, integrations, and everyday workflows that support it. A good handover means the people doing the work can see what came in, take the next step, and understand where to look if something goes wrong.</p>
              </div>
              <div className="vexel-prose">
                <h3>Products built in-house</h3>
                <p>I build VEXEL’s own products around needs people share. With VEETCH, that means bringing virtual numbers and travel data into one account, with clear prices, order history, and a way to get help.</p>
              </div>
            </div>
            <div className="vexel-approach-grid vexel-automation-approach">
              <div className="vexel-prose">
                <h3>Automating business workflows</h3>
                <p>When an inquiry comes in, a workflow can save it once, route it to the right person, and remind them if it’s still waiting. The same approach can connect orders to fulfilment, pull routine reports from the original data, or flag missing information before a record moves on. I start with a repeated task and measure whether it takes fewer steps or spends less time waiting.</p>
              </div>
              <div className="vexel-prose">
                <h3>Automation inside products</h3>
                <p>Scheduled jobs and events such as payment confirmations can trigger the next step. I design each step so a retry won’t repeat a charge or a notification, and I record what ran so someone can pick up exceptions. For VEXEL’s own products, automated tests check these cases before release. After release, alerts and run history help make failures visible.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="shell vexel-section vexel-product" id="veetch" aria-labelledby="veetch-title">
          <div className="vexel-product-intro">
            <div className="vexel-prose">
              <img src={veetchLogo} width="365" height="80" alt="VEETCH" />
              <p className="label">A product by VEXEL Group · In development</p>
              <h2 id="veetch-title">A number when you need one. Data when you travel.</h2>
              <p>VEETCH is VEXEL’s first in-house product. I’m building it for individuals and for agencies and businesses that need virtual numbers or travel data for a defined period. Today those needs can send people to separate providers with different accounts, payment steps, and support channels.</p>
              <p>The finished product is designed around one account. You’ll be able to choose a service, understand what you’re paying for, and return to the same dashboard to check your order, use your inbox, or manage an active number or plan.</p>
            </div>
          </div>
          <div className="vexel-product-scope">
            <h3>What you’ll be able to do</h3>
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
