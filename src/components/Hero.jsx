import { FiArrowDown, FiDownload, FiMapPin } from "react-icons/fi";

import HeroWorkbench from "./HeroWorkbench";

export default function Hero() {
  return (
    <section className="product-intro" aria-labelledby="hero-title">
      <div className="intro-copy">
        <p className="intro-identity">
          <img src="/portrait-96.webp" width="44" height="44" alt="" />
          Ogheneyole Gold <span className="intro-location"><FiMapPin aria-hidden="true" /> Nigeria</span>
        </p>
        <h1 id="hero-title">Full-stack <em>software engineer.</em></h1>
        <div className="intro-bottom">
          <p className="intro-lede">I design and build web products, from the interface to the APIs behind it. I also build Python tools that automate repetitive work.</p>
          <div className="intro-actions">
            <a className="button" href="#work">Explore my work <FiArrowDown className="link-icon" aria-hidden="true" /></a>
            <a className="text-link" href="/downloads/ogheneyole-gold-resume.pdf" download>Download résumé <FiDownload className="link-icon" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <HeroWorkbench />
    </section>
  );
}
