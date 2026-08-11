import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings2,
  Layers3,
  PenSquare,
  FileText,
  Languages,
  X,
  RotateCcw,
  Check,
} from "lucide-react";

const DEFAULT_SETTINGS = {
  category: "Technology",
  tone: "Professional",
  length: "1000 Words",
  language: "English",
};

const CATEGORIES = [
  "Technology",
  "Programming",
  "Business",
  "Education",
  "Marketing",
  "Lifestyle",
  "Finance",
];

const TONES = ["Professional", "Casual", "Friendly", "Formal", "Persuasive"];
const LENGTHS = ["500 Words", "1000 Words", "1500 Words", "2000 Words"];
const LANGUAGES = [
  { label: "English", value: "English" },
  { label: "Telugu", value: "Telugu" },
  { label: "Hindi", value: "Hindi" },
  { label: "Spanish", value: "Spanish" },
  { label: "French", value: "French" },
];

function PromptSettings({ open, onClose, onSettingsChange }) {
  // 1. Internal state ensures the modal CAN close itself instantly
  const [isVisible, setIsVisible] = useState(open);

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("blogGenerationSettings");
      if (saved) return JSON.parse(saved);
    } catch (error) {
      console.error("Failed to load generation settings:", error);
    }
    return DEFAULT_SETTINGS;
  });

  const [isSaved, setIsSaved] = useState(false);

  // Sync internal state whenever the 'open' prop changes from parent
  useEffect(() => {
    setIsVisible(open);
  }, [open]);

  // Fail-safe close function
  const handleClose = useCallback(() => {
    setIsVisible(false); // Force modal to hide visually immediately
    if (typeof onClose === "function") {
      onClose(); // Notify parent
    }
  }, [onClose]);

  /* Close on ESC key */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleClose]);

  /* Save Settings */
  const handleSave = useCallback(
    (newSettings) => {
      try {
        localStorage.setItem(
          "blogGenerationSettings",
          JSON.stringify(newSettings)
        );
      } catch (error) {
        console.error("Failed to save settings:", error);
      }

      if (onSettingsChange) {
        onSettingsChange(newSettings);
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1200);
    },
    [onSettingsChange]
  );

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    handleSave(updated);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    handleSave(DEFAULT_SETTINGS);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop (Dark Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            /* Prevents clicking inside the modal from closing it */
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              z-10
              flex
              max-h-[90vh]
              w-full
              max-w-md
              flex-col
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-2xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Settings2 size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800 dark:text-white">
                    Blog Generation Settings
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Customize AI response tone and length
                  </p>
                </div>
              </div>

              {/* Close Button (X) */}
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close settings"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="space-y-5 overflow-y-auto p-6 scrollbar-thin">
              {/* Category */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <Layers3 size={15} className="text-blue-500" />
                  Category
                </label>
                <select
                  value={settings.category}
                  onChange={(e) => updateSetting("category", e.target.value)}
                  className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-white dark:focus:border-blue-500 dark:focus:bg-slate-800"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <PenSquare size={15} className="text-blue-500" />
                  Writing Tone
                </label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map((toneOption) => {
                    const active = settings.tone === toneOption;
                    return (
                      <button
                        key={toneOption}
                        type="button"
                        onClick={() => updateSetting("tone", toneOption)}
                        className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition ${
                          active
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        }`}
                      >
                        {toneOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Length */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <FileText size={15} className="text-blue-500" />
                  Target Length
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {LENGTHS.map((lenOption) => {
                    const active = settings.length === lenOption;
                    return (
                      <button
                        key={lenOption}
                        type="button"
                        onClick={() => updateSetting("length", lenOption)}
                        className={`rounded-xl border py-2 text-xs font-medium transition ${
                          active
                            ? "border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-700/80 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        {lenOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <Languages size={15} className="text-blue-500" />
                  Output Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting("language", e.target.value)}
                  className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-white dark:focus:border-blue-500 dark:focus:bg-slate-800"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800/80 dark:bg-slate-900/50">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                <RotateCcw size={13} />
                Reset Defaults
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-95"
              >
                {isSaved ? (
                  <>
                    <Check size={14} /> Saved
                  </>
                ) : (
                  "Apply Settings"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PromptSettings;