import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Settings2,
  Layers3,
  PenSquare,
  FileText,
  Languages,
} from "lucide-react";

function PromptSettings({
  open,
  onSettingsChange,
}) {
  const [settings, setSettings] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "blogGenerationSettings"
          );

        if (saved) {
          return JSON.parse(saved);
        }
      } catch (error) {
        console.error(
          "Failed to load generation settings:",
          error
        );
      }

      return {
        category: "Technology",
        tone: "Professional",
        length: "1000 Words",
        language: "English",
      };
    });

  /* ==========================================
     Save Generation Settings
  ========================================== */

  useEffect(() => {
    try {
      localStorage.setItem(
        "blogGenerationSettings",
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error(
        "Failed to save generation settings:",
        error
      );
    }

    if (onSettingsChange) {
      onSettingsChange(settings);
    }
  }, [settings, onSettingsChange]);

  /* ==========================================
     Update Setting
  ========================================== */

  const updateSetting = (
    key,
    value
  ) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.96,
          }}
          transition={{
            duration: 0.22,
            ease: "easeOut",
          }}
          className="
            fixed
            bottom-28
            left-1/2
            z-50
            w-[380px]
            max-w-[calc(100vw-2rem)]
            -translate-x-1/2
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-2xl
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          {/* ======================================
              Header
          ====================================== */}

          <div
            className="
              flex
              items-center
              gap-3
              border-b
              border-slate-200
              px-6
              py-5
              dark:border-slate-700
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                text-blue-600
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <Settings2 size={20} />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-800
                  dark:text-white
                "
              >
                Blog Settings
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Customize your AI generation
              </p>
            </div>
          </div>

          {/* ======================================
              Content
          ====================================== */}

          <div className="space-y-5 p-6">
            {/* ====================================
                Category
            ==================================== */}

            <div>
              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                <Layers3 size={16} />

                Category
              </label>

              <select
                value={settings.category}
                onChange={(e) =>
                  updateSetting(
                    "category",
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-slate-800
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:focus:ring-blue-500/20
                "
              >
                <option>
                  Technology
                </option>

                <option>
                  Programming
                </option>

                <option>
                  Business
                </option>

                <option>
                  Education
                </option>
              </select>
            </div>

            {/* ====================================
                Tone
            ==================================== */}

            <div>
              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                <PenSquare size={16} />

                Tone
              </label>

              <select
                value={settings.tone}
                onChange={(e) =>
                  updateSetting(
                    "tone",
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-slate-800
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:focus:ring-blue-500/20
                "
              >
                <option>
                  Professional
                </option>

                <option>
                  Friendly
                </option>

                <option>
                  Casual
                </option>
              </select>
            </div>

            {/* ====================================
                Length
            ==================================== */}

            <div>
              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                <FileText size={16} />

                Blog Length
              </label>

              <select
                value={settings.length}
                onChange={(e) =>
                  updateSetting(
                    "length",
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-slate-800
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:focus:ring-blue-500/20
                "
              >
                <option>
                  500 Words
                </option>

                <option>
                  1000 Words
                </option>

                <option>
                  1500 Words
                </option>

                <option>
                  2000 Words
                </option>
              </select>
            </div>

            {/* ====================================
                Generation Language
            ==================================== */}

            <div>
              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                <Languages size={16} />

                Language
              </label>

              <select
                value={settings.language}
                onChange={(e) =>
                  updateSetting(
                    "language",
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-slate-800
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                  dark:focus:ring-blue-500/20
                "
              >
                <option value="English">
                  English
                </option>

                <option value="Telugu">
                  Telugu
                </option>

                <option value="Hindi">
                  Hindi
                </option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PromptSettings;