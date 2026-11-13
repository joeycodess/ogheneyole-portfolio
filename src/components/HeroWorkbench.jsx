import { useState } from "react";
import { FiArrowUpRight, FiCheck, FiCode, FiLayers, FiTerminal } from "react-icons/fi";

const views = [
  {
    label: "UI",
    tone: "ui",
    Icon: FiLayers,
    file: "daymark / task model",
    lines: [["task", '"Review launch checklist"'], ["plannedDate", '"Tomorrow"'], ["deadline", '"Friday"']],
    note: "Moving the plan leaves the deadline in place.",
    href: "/work/daymark/#architecture",
    link: "Explore Daymark",
  },
  {
    label: "API",
    tone: "api",
    Icon: FiCode,
    file: "mark da jeweller / access control",
    lines: [["request", "PATCH /api/orders/:id/status"], ["access", "Authenticated admin"], ["result", "Order status updated"]],
    note: "Staff permissions are checked before writing to MongoDB.",
    href: "/work/mark-da-jeweller/#architecture",
    link: "Inspect the API",
  },
  {
    label: "Python",
    tone: "python",
    Icon: FiTerminal,
    file: "screenshot archive / example run",
    lines: [["dry run", "would_archive=12"], ["apply", "archived=12"], ["repeat", "already_archived=12"]],
    note: "A repeat run creates zero additional copies.",
    href: "https://github.com/joeycodess/screenshot-archive#run-the-demo",
    link: "Try the Python sample",
  },
];

export default function HeroWorkbench() {
  const [active, setActive] = useState(0);
  const {file, lines, note, href, link, tone} = views[active];

  return (
    <section className="hero-workbench" data-tone={tone} aria-labelledby="workbench-title">
      <div className="workbench-header">
        <h2 id="workbench-title">Engineering workbench</h2>
        <div className="workbench-controls" role="group" aria-label="Engineering views">
          {views.map(({label, Icon, tone}, index) => (
            <button key={label} data-tone={tone} type="button" aria-pressed={active === index} aria-controls="workbench-preview" onClick={() => setActive(index)}>
              <Icon aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
      </div>
      <div id="workbench-preview">
        <div key={file} className="workbench-preview">
          <p className="workbench-file">{file}</p>
          <dl className="workbench-data">
            {lines.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}
          </dl>
          <p className="workbench-note"><FiCheck aria-hidden="true" /> {note}</p>
        </div>
        <a className="workbench-link text-link" href={href}>{link} <FiArrowUpRight className="link-icon" aria-hidden="true" /></a>
      </div>
    </section>
  );
}
