import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { EXPERIENCES } from "../constants";

export default function Experience() {
  const timeline = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const milestones = Array.from(timeline.current.children);
    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({target, isIntersecting}) => {
        if (isIntersecting) visible.add(target);
        else visible.delete(target);
      });
      const index = milestones.findIndex((milestone) => visible.has(milestone));
      if (index !== -1) setActive(index);
    }, { rootMargin: "-48% 0px -48% 0px" });
    milestones.forEach((milestone) => observer.observe(milestone));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="career" id="experience" aria-labelledby="experience-title">
      <div className="career-heading">
        <h2 id="experience-title">Professional experience</h2>
        <p>Building products independently and shipping software with teams since 2022.</p>
      </div>
      <ol className="career-timeline" ref={timeline}>
        {EXPERIENCES.map(({ company, role, year, url, details, technologies, work }, index) => (
          <li className="career-milestone" key={company} data-active={index === active} data-passed={index < active}>
            <div className="career-card">
              <div className="career-card-heading">
                <h3>{role}</h3>
                <p className="career-date">{year}</p>
              </div>
              <p className="career-company">{url ? <a href={url}>{company}</a> : company}</p>
              <ul className="career-details">{details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <ul className="career-tech" aria-label="Technologies">{technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
              {work && <a className="text-link career-proof" href={work.href}>{work.label} <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
