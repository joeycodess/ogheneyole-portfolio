import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import InquiryForm from "./InquiryForm";
import { CONTACT } from "../constants";

const showInquiryForm = import.meta.env.VITE_INQUIRY_FORM_ENABLED;

const links = [
  ["GitHub", "https://github.com/joeycodess"],
  ["LinkedIn", "https://www.linkedin.com/in/ogheneyole-gold-117b63247"],
  ["WhatsApp", "https://wa.me/2347042359345"],
];

export default function Contacts() {
  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <div className="shell contact-inner">
        <div className="contact-grid">
          <div>
            <h2 id="contact-title">Let’s talk<span>.</span></h2>
            <p>Hiring for a team or working on an idea? Send me a note.</p>
            <a className="contact-email" href={`mailto:${CONTACT.email}`}>{CONTACT.email} <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
          </div>
          {showInquiryForm && <InquiryForm />}
        </div>
        {showInquiryForm && (
          <details className="inquiry-architecture">
            <summary>What happens when you send a message</summary>
            <p>Tell me a little about the role, project, or problem you have in mind.</p>
          </details>
        )}
        <div className="contact-bottom">
          <ul aria-label="Social links">
            {links.map(([label, url]) => (
              <li key={label}><a href={url}>{label} <FiArrowUpRight className="link-icon" aria-hidden="true" /></a></li>
            ))}
          </ul>
          <a href="#top">Back to top <FiArrowUp className="link-icon" aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
