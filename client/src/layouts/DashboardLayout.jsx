import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import SettingsDrawer from "../components/settings/SettingsDrawer";

import { useSidebar } from "../context/SidebarContext";

function DashboardLayout() {
  const {
    sidebarWidth,
    isMobile,
    mobileOpen,
    closeMobileSidebar,
  } = useSidebar();

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        text-slate-800
        transition-colors
        duration-300
        dark:bg-slate-950
        dark:text-slate-100
      "
    >
      {/* ==========================================
          Mobile Overlay
      ========================================== */}

      {isMobile && mobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            backdrop-blur-[2px]
          "
        />
      )}

      {/* ==========================================
          Sidebar
      ========================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          transition-all
          duration-300

          ${
            isMobile
              ? mobileOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
        `}
        style={{
          width: sidebarWidth,
        }}
      >
        <Sidebar />
      </aside>

      {/* ==========================================
          Main Area
      ========================================== */}

      <div
        className="
          min-h-screen
          transition-all
          duration-300
        "
        style={{
          marginLeft: isMobile
            ? 0
            : sidebarWidth,
        }}
      >
        {/* ========================================
            Navbar
        ======================================== */}

        <header
          className="
            fixed
            right-0
            top-0
            z-30
            h-16
            border-b
            border-slate-200
            bg-white
            transition-all
            duration-300

            dark:border-slate-800
            dark:bg-slate-950
          "
          style={{
            left: isMobile
              ? 0
              : sidebarWidth,
          }}
        >
          <Navbar />
        </header>

        {/* ========================================
            Main Content
        ======================================== */}

        <motion.main
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            min-h-screen
            overflow-x-hidden
            bg-slate-50
            text-slate-800
            transition-colors
            duration-300

            dark:bg-slate-950
            dark:text-slate-100
          "
          style={{
            paddingTop: "88px",
            paddingLeft: isMobile
              ? "16px"
              : "24px",
            paddingRight: isMobile
              ? "16px"
              : "24px",
            paddingBottom: "24px",
          }}
        >
          <Outlet />
        </motion.main>
      </div>

      {/* ==========================================
          Settings Drawer
      ========================================== */}

      <SettingsDrawer />
    </div>
  );
}

export default DashboardLayout;