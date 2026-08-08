import {
  Bell,
  Menu,
  Settings,
  Languages,
  Moon,
  LogOut,
  ChevronDown,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { useSidebar } from "../../context/SidebarContext";
import { useSettings } from "../../context/SettingsContext";

import useAuth from "../../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();

  const { toggleSidebar } =
    useSidebar();

  const { setDrawerOpen } =
    useSettings();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileRef = useRef(null);

  /* ==========================================
     Close Profile Dropdown
  ========================================== */

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  /* ==========================================
     Logout
  ========================================== */

  const handleLogout = async () => {
    try {
      await logout();

      setProfileOpen(false);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );
    }
  };

  /* ==========================================
     Open Settings
  ========================================== */

  const openSettings = () => {
    setDrawerOpen(true);
    setProfileOpen(false);
  };

  /* ==========================================
     User Avatar
  ========================================== */

  const avatarUrl =
    user?.providerData?.[0]?.photoURL ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.displayName || "User"
    )}&background=2563eb&color=ffffff`;

  return (
    <div
      className="
        flex
        h-full
        items-center
        justify-between
        px-6
      "
    >
      {/* ==========================================
          LEFT SIDE
      ========================================== */}

      <div
        className="
          flex
          min-w-0
          items-center
          gap-4
        "
      >
        {/* Sidebar Toggle */}

        <motion.button
          type="button"
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="
            flex
            h-10
            w-10
            flex-shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-800
            transition-all
            duration-200
            hover:bg-slate-100

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
            dark:hover:bg-slate-700
          "
        >
          <Menu size={20} />
        </motion.button>

        {/* Brand */}

        <div className="min-w-0">
          <h1
            className="
              truncate
              text-xl
              font-bold
              text-slate-900
              transition-colors
              duration-300

              dark:text-white
            "
          >
            Blog Studio
          </h1>
        </div>
      </div>

      {/* ==========================================
          RIGHT SIDE
      ========================================== */}

      <div
        className="
          flex
          items-center
          gap-3
          sm:gap-4
        "
      >
        {!isAuthenticated ? (
          /* ========================================
             SIGN IN
          ======================================== */

          <motion.button
            type="button"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() =>
              navigate("/")
            }
            className="
              h-10
              rounded-xl
              bg-blue-600
              px-5
              font-semibold
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Sign In
          </motion.button>
        ) : (
          /* ========================================
             AUTHENTICATED USER
          ======================================== */

          <div
            ref={profileRef}
            className="
              relative
              flex
              items-center
              gap-3
            "
          >
            {/* ======================================
                Notification
            ====================================== */}

            <motion.button
              type="button"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              aria-label="Notifications"
              className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-800
                transition-all
                duration-200
                hover:bg-slate-100

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:hover:bg-slate-700
              "
            >
              <Bell size={19} />

              <span
                className="
                  absolute
                  right-2
                  top-2
                  h-2
                  w-2
                  rounded-full
                  bg-blue-500
                  shadow-sm
                  shadow-blue-500/50
                "
              />
            </motion.button>

            {/* ======================================
                Profile Button
            ====================================== */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                setProfileOpen(
                  (prev) => !prev
                )
              }
              aria-label="Open profile menu"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                p-1.5
                text-slate-800
                transition-all
                duration-200
                hover:bg-slate-100

                dark:text-white
                dark:hover:bg-slate-800
              "
            >
              <motion.img
                whileHover={{
                  scale: 1.04,
                }}
                src={avatarUrl}
                alt={
                  user?.displayName ||
                  "Profile"
                }
                referrerPolicy="no-referrer"
                className="
                  h-11
                  w-11
                  rounded-full
                  border-2
                  border-slate-200
                  object-cover

                  dark:border-slate-600
                "
              />

              <ChevronDown
                size={18}
                className={`
                  hidden
                  text-slate-700
                  transition-transform
                  duration-200

                  dark:text-slate-200

                  sm:block

                  ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </motion.button>

            {/* ======================================
                Profile Dropdown
            ====================================== */}

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className="
                    absolute
                    right-0
                    top-16
                    z-50
                    w-[calc(100vw-2rem)]
                    max-w-80
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-800
                    shadow-2xl
                    transition-colors
                    duration-300

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                >
                  {/* Profile Header */}

                  <div className="p-6">
                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >
                      <img
                        src={avatarUrl}
                        alt={
                          user?.displayName ||
                          "Profile"
                        }
                        referrerPolicy="no-referrer"
                        className="
                          h-16
                          w-16
                          flex-shrink-0
                          rounded-full
                          border-2
                          border-slate-200
                          object-cover

                          dark:border-slate-600
                        "
                      />

                      <div className="min-w-0">
                        <h3
                          className="
                            truncate
                            font-semibold
                            text-slate-900

                            dark:text-white
                          "
                        >
                          {user?.displayName ||
                            "User"}
                        </h3>

                        <p
                          className="
                            truncate
                            text-sm
                            text-slate-500

                            dark:text-slate-400
                          "
                        >
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}

                  <div
                    className="
                      border-t
                      border-slate-200

                      dark:border-slate-700
                    "
                  />

                  {/* Settings */}

                  <button
                    type="button"
                    onClick={openSettings}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-6
                      py-4
                      text-left
                      text-slate-700
                      transition
                      hover:bg-slate-50

                      dark:text-slate-200
                      dark:hover:bg-slate-800
                    "
                  >
                    <Settings size={18} />

                    <span>
                      Settings
                    </span>
                  </button>

               

                  {/* Appearance */}

                  <button
                    type="button"
                    onClick={openSettings}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-6
                      py-4
                      text-left
                      text-slate-700
                      transition
                      hover:bg-slate-50

                      dark:text-slate-200
                      dark:hover:bg-slate-800
                    "
                  >
                    <Moon size={18} />

                    <span>
                      Appearance
                    </span>
                  </button>

                  {/* Divider */}

                  <div
                    className="
                      border-t
                      border-slate-200

                      dark:border-slate-700
                    "
                  />

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      px-6
                      py-4
                      text-left
                      text-red-600
                      transition
                      hover:bg-red-50

                      dark:text-red-400
                      dark:hover:bg-red-500/10
                    "
                  >
                    <LogOut size={18} />

                    <span>
                      Logout
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;