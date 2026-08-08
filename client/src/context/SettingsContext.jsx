import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const SettingsContext = createContext();

function getSystemTheme() {
  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");

  const actualTheme =
    theme === "system"
      ? getSystemTheme()
      : theme;

  root.classList.add(actualTheme);
}

export function SettingsProvider({
  children,
}) {
  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [language, setLanguage] =
    useState(
      () =>
        localStorage.getItem(
          "language"
        ) || "English"
    );

  const [tone, setTone] =
    useState(
      () =>
        localStorage.getItem("tone") ||
        "Professional"
    );

  const [length, setLength] =
    useState(
      () =>
        localStorage.getItem("length") ||
        "Medium"
    );

  const [theme, setTheme] =
    useState(
      () =>
        localStorage.getItem("theme") ||
        "light"
    );

  useEffect(() => {
    localStorage.setItem(
      "language",
      language
    );
  }, [language]);

  useEffect(() => {
    localStorage.setItem(
      "tone",
      tone
    );
  }, [tone]);

  useEffect(() => {
    localStorage.setItem(
      "length",
      length
    );
  }, [length]);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      theme
    );

    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [theme]);

  return (
    <SettingsContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,

        language,
        setLanguage,

        tone,
        setTone,

        length,
        setLength,

        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}