import { useEffect } from "react";
import {
  X,
  Sun,
  Monitor,
  Moon,
  LogOut,
  Info,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useSettings } from "../../context/SettingsContext";
import useAuth from "../../hooks/useAuth";
import useLanguage from "../../hooks/useLanguage";
import { useBlogs } from "../../context/BlogContext";

function SettingsDrawer() {
  const { drawerOpen, setDrawerOpen, theme, setTheme } = useSettings();
  const { logout } = useAuth();
  const { blogs } = useBlogs();
  const t = useLanguage();

  /* ==========================================
     Prevent Body Scroll When Drawer Is Open
  ========================================== */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* ==========================================
     Close Drawer on Escape Key
  ========================================== */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    if (drawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen, setDrawerOpen]);

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
  const handleClearHistory = () => {
    const confirmed = window.confirm(t.settings.clearConfirmation);

    if (!confirmed) return;

    localStorage.removeItem("blogs");
    window.location.reload();
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
          />

          {/* ==========================================
              Drawer Container
          ========================================== */}
          <motion.div
            className="
              fixed
              inset-y-0
              right-0
              z-50
              flex
              h-dvh
              w-full
              max-w-md
              flex-col
              border-l
              border-slate-200
              bg-white
              text-slate-800
              shadow-2xl
              transition-colors
              duration-300
              dark:border-slate-800
              dark:bg-slate-950
              dark:text-slate-100
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
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
                border-slate-200
                px-4
                py-4
                dark:border-slate-800
                sm:px-6
                sm:py-5
              "
            >
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {t.settings.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Customize your Blog Studio
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close settings"
                className="
                  rounded-xl
                  p-2
                  text-slate-500
                  transition
                  hover:bg-slate-100
                  hover:text-slate-800
                  dark:text-slate-400
                  dark:hover:bg-slate-800
                  dark:hover:text-white
                "
              >
                <X size={22} />
              </button>
            </div>

            {/* ==========================================
                Content
            ========================================== */}
            <div className="flex-1 space-y-8 overflow-y-auto p-4 sm:p-6">
              {/* Appearance */}
              <div>
                <h3 className="mb-3 font-semibold text-slate-800 dark:text-slate-100">
                  {t.settings.appearance}
                </h3>

                <div className="space-y-2">
                  {/* Light */}
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border
                      p-3
                      text-left
                      transition
                      ${
                        theme === "light"
                          ? "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400"
                          : "border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                      }
                    `}
                  >
                    <Sun size={18} />
                    <div>
                      <p className="font-medium">Light</p>
                      <p className="text-xs opacity-70">Bright appearance</p>
                    </div>
                  </button>

                  {/* Dark */}
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border
                      p-3
                      text-left
                      transition
                      ${
                        theme === "dark"
                          ? "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400"
                          : "border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                      }
                    `}
                  >
                    <Moon size={18} />
                    <div>
                      <p className="font-medium">Dark</p>
                      <p className="text-xs opacity-70">Dark appearance</p>
                    </div>
                  </button>

                  {/* System */}
                  <button
                    type="button"
                    onClick={() => setTheme("system")}
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border
                      p-3
                      text-left
                      transition
                      ${
                        theme === "system"
                          ? "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400"
                          : "border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                      }
                    `}
                  >
                    <Monitor size={18} />
                    <div>
                      <p className="font-medium">System</p>
                      <p className="text-xs opacity-70">Follow device theme</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* About */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Info size={18} className="text-slate-600 dark:text-slate-300" />
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                    {t.settings.about}
                  </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Blog Studio v1.0.0
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {blogs?.length || 0} Blogs Generated
                  </p>
                </div>
              </div>

              {/* Clear History */}
              <button
                type="button"
                onClick={handleClearHistory}
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

              {/* Logout */}
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
                  bg-red-500
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-600
                  hover:shadow-lg
                  hover:shadow-red-500/20
                "
              >
                <LogOut size={18} />
                {t.settings.logout}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SettingsDrawer;