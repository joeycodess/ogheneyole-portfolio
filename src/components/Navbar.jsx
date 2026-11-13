import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import ThemeControl from "./ThemeControl";
import PropTypes from "prop-types";

const portfolioLinks = [
  ["Work", "/#work"],
  ["Experience", "/#experience"],
  ["Skills", "/#skills"],
  ["About", "/#about"],
  ["VEXEL", "/vexel/"],
  ["Contact", "#contact"],
];

export default function Navbar({
  brand = <a className="wordmark" href="/" aria-label="OG. Ogheneyole Gold, home">OG<span>.</span></a>,
  links = portfolioLinks,
  navigationLabel = "Main navigation",
}) {
  const [open, setOpen] = useState(false);
  const header = useRef(null);
  const toggle = useRef(null);

  useEffect(() => {
    if (!open) return;
    function dismissOutside(event) {
      if (!header.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [open]);

  function handleKeyDown(event) {
    if (event.key !== "Escape" || !open) return;
    event.preventDefault();
    setOpen(false);
    toggle.current?.focus();
  }

  function handleBlur(event) {
    if (open && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  }

  const MenuIcon = open ? FiX : FiMenu;

  return (
    <header className="shell masthead" id="top" ref={header} onKeyDown={handleKeyDown} onBlur={handleBlur}>
      {brand}
      <ThemeControl />
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen((value) => !value)}
        ref={toggle}
      >
        <MenuIcon aria-hidden="true" />
        Menu
      </button>
      <nav id="main-navigation" aria-label={navigationLabel} data-open={open}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <FiArrowRight className="menu-arrow" aria-hidden="true" />
          </a>
        ))}
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  brand: PropTypes.node,
  links: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  navigationLabel: PropTypes.string,
};
