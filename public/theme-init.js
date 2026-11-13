(() => {
  // Resolve the theme before the first paint, including when storage is unavailable.
  let preference = "system";
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") preference = saved;
  } catch {/* Keep the system default when storage is blocked. */}
  const dark = preference === "dark" ||
    (preference === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor && dark) themeColor.content = themeColor.dataset.dark || "#161e19";
})();
