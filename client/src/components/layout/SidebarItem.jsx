import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { useSidebar } from "../../context/SidebarContext";

function SidebarItem({
  to,
  icon: Icon,
  label,
}) {
  const {
    collapsed,
    closeMobileSidebar,
  } = useSidebar();

  return (
    <NavLink
      to={to}
      onClick={closeMobileSidebar}
      className={({ isActive }) =>
        `
        relative
        flex
        items-center
        gap-3
        overflow-hidden
        rounded-2xl
        transition-all
        duration-300

        ${
          collapsed
            ? "justify-center h-12"
            : "px-4 h-12"
        }

        ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }
        `
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator */}

          {isActive && (
            <motion.div
              layoutId="active-sidebar"
              className="
                absolute
                left-0
                top-2
                bottom-2
                w-1
                rounded-full
                bg-white
              "
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}

          {/* Icon */}

          <motion.div
            whileHover={{
              scale: 1.12,
              rotate: isActive ? 0 : -8,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Icon
              size={20}
              className="shrink-0"
            />
          </motion.div>

          {/* Label */}

          {!collapsed && (
            <motion.span
              initial={{
                opacity: 0,
                x: -8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                font-medium
                whitespace-nowrap
                flex-1
              "
            >
              {label}
            </motion.span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default SidebarItem;