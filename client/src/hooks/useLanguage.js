import { translations } from "../locales/translations";
import { useSettings } from "../context/SettingsContext";

export default function useLanguage() {
  const { language } = useSettings();

  return translations[language] || translations.English;
}