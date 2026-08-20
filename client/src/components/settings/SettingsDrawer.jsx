import {
  X,
  Globe,
  Sun,
  Monitor,
  Moon,
  LogOut,
  Info,
  Trash2,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useSettings } from "../../context/SettingsContext";
import useAuth from "../../hooks/useAuth";
import useLanguage from "../../hooks/useLanguage";
import { useBlogs } from "../../context/BlogContext";

function SettingsDrawer() {
  const {
    drawerOpen,
    setDrawerOpen,
    theme,
    setTheme,
    language,
    setLanguage,
  } = useSettings();

  const { logout } = useAuth();

  const {
    blogs,
    clearAllBlogs,
  } = useBlogs();

  const t = useLanguage();

  /* ==========================================
     Logout
  ========================================== */

  const handleLogout = async () => {
    await logout();
    setDrawerOpen(false);
  };

  /* ==========================================
     Clear History
  ========================================== */

  const handleClearHistory = async () => {
    const confirmed =
      window.confirm(
        t.settings.clearConfirmation
      );

    if (!confirmed) {
      return;
    }

    try {
      await clearAllBlogs();

      /*
       * Close the settings drawer
       * after successful deletion.
       */
      setDrawerOpen(false);
    } catch (error) {
      console.error(
        "Clear History Error:",
        error
      );

      alert(
        error.message ||
          "Failed to clear history."
      );
    }
  };

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* ==========================================
              Overlay
          ========================================== */}

          <motion.div
            className="
              fixed
              inset-0
              z-40
              bg-black/40
              backdrop-blur-[2px]
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setDrawerOpen(false)
            }
          />

          {/* ==========================================
              Drawer
          ========================================== */}

          <motion.aside
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="
              fixed
              right-0
              top-0
              z-50
              flex
              h-full
              w-full
              max-w-md
              flex-col
              overflow-y-auto
              border-l
              border-slate-700
              bg-[#151A23]
              text-white
              shadow-2xl

              max-[639px]:max-w-full
            "
          >
            {/* ==========================================
                Header
            ========================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-700
                px-6
                py-5
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  {t.settings.title}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-400
                  "
                >
                  {t.settings.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDrawerOpen(false)
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
                aria-label="Close settings"
              >
                <X size={20} />
              </button>
            </div>

            {/* ==========================================
                Content
            ========================================== */}

            <div
              className="
                flex-1
                space-y-8
                px-6
                py-6
              "
            >
              {/* ========================================
                  Appearance
              ======================================== */}

              <section>
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-600/15
                      text-blue-400
                    "
                  >
                    {theme === "dark" ? (
                      <Moon size={18} />
                    ) : theme ===
                      "light" ? (
                      <Sun size={18} />
                    ) : (
                      <Monitor size={18} />
                    )}
                  </div>

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      {t.settings.appearance}
                    </h3>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {t.settings.appearanceDescription}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-3
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      setTheme("light")
                    }
                    className={`
                      flex
                      flex-col
                      items-center
                      gap-2
                      rounded-xl
                      border
                      px-3
                      py-4
                      text-sm
                      transition

                      ${
                        theme === "light"
                          ? "border-blue-500 bg-blue-600/10 text-blue-400"
                          : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                      }
                    `}
                  >
                    <Sun size={18} />
                    <span>
                      {t.settings.light}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setTheme("system")
                    }
                    className={`
                      flex
                      flex-col
                      items-center
                      gap-2
                      rounded-xl
                      border
                      px-3
                      py-4
                      text-sm
                      transition

                      ${
                        theme === "system"
                          ? "border-blue-500 bg-blue-600/10 text-blue-400"
                          : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                      }
                    `}
                  >
                    <Monitor size={18} />
                    <span>
                      {t.settings.system}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setTheme("dark")
                    }
                    className={`
                      flex
                      flex-col
                      items-center
                      gap-2
                      rounded-xl
                      border
                      px-3
                      py-4
                      text-sm
                      transition

                      ${
                        theme === "dark"
                          ? "border-blue-500 bg-blue-600/10 text-blue-400"
                          : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
                      }
                    `}
                  >
                    <Moon size={18} />
                    <span>
                      {t.settings.dark}
                    </span>
                  </button>
                </div>
              </section>

              {/* ========================================
                  Language
              ======================================== */}
{/* 
              <section>
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-600/15
                      text-blue-400
                    "
                  >
                    <Globe size={18} />
                  </div>

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      {t.settings.language}
                    </h3>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {t.settings.languageDescription}
                    </p>
                  </div>
                </div>

                <select
                  value={language}
                  onChange={(event) =>
                    setLanguage(
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-900
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    focus:border-blue-500
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
              </section> */}

              {/* ========================================
                  Clear History
              ======================================== */}

              <section>
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-orange-500/15
                      text-orange-400
                    "
                  >
                    <Trash2 size={18} />
                  </div>

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-white
                      "
                    >
                      {t.settings.clearHistory}
                    </h3>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {blogs.length}{" "}
                      conversations
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    handleClearHistory
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-orange-500
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-orange-600
                    hover:shadow-lg
                    hover:shadow-orange-500/20
                  "
                >
                  <Trash2 size={18} />

                  {t.settings.clearHistory}
                </button>
              </section>

              {/* ========================================
                  Information
              ======================================== */}

              <section
                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900/50
                  p-4
                "
              >
                <div
                  className="
                    flex
                    gap-3
                  "
                >
                  <Info
                    size={18}
                    className="
                      mt-0.5
                      flex-shrink-0
                      text-blue-400
                    "
                  />

                  <div>
                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {t.settings.about}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      {t.settings.aboutDescription}
                    </p>
                  </div>
                </div>
              </section>

              {/* ========================================
                  Logout
              ======================================== */}

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-red-500/30
                  bg-red-500/10
                  py-3
                  font-semibold
                  text-red-400
                  transition
                  hover:bg-red-500/20
                "
              >
                <LogOut size={18} />

                {t.settings.logout}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default SettingsDrawer;