export const applyTheme = (theme) => {
  const root = document.documentElement;

  root.classList.remove("light", "dark");

  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    root.classList.add(prefersDark ? "dark" : "light");
  } else {
    root.classList.add(theme);
  }
};

export const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};