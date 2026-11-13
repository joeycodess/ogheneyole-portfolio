import { useEffect, useState } from "react";
import { FiChevronDown, FiMonitor, FiMoon, FiSun } from "react-icons/fi";

export default function ThemeControl() {
  const [preference, setPreference] = useState(
    () => document.documentElement.dataset.themePreference ?? "system"
  );

  useEffect(() => {
    const root = document.documentElement;
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    const themeColor = document.querySelector('meta[name="theme-color"]');

    const updateTheme = () => {
      const dark = preference === "dark" || (preference === "system" && system.matches);
      root.dataset.theme = dark ? "dark" : "light";
      root.dataset.themePreference = preference;
      if (themeColor) {
        themeColor.content = getComputedStyle(root).getPropertyValue("--paper").trim();
      }
    };

    updateTheme();
    if (preference === "system") {
      system.addEventListener("change", updateTheme);
      return () => system.removeEventListener("change", updateTheme);
    }
  }, [preference]);

  function changeTheme(event) {
    const next = event.target.value;
    setPreference(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      // The current page can still honor the choice with storage disabled.
    }
  }

  const ThemeIcon = { system: FiMonitor, light: FiSun, dark: FiMoon }[preference] ?? FiMonitor;

  return (
    <div className="theme-control">
      <ThemeIcon className="theme-icon" aria-hidden="true" focusable="false" />
      <select aria-label="Color theme" value={preference} onChange={changeTheme}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <FiChevronDown className="theme-chevron" aria-hidden="true" focusable="false" />
    </div>
  );
}
