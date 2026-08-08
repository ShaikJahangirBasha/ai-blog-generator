import { Link } from "react-router-dom";
import { PenSquare } from "lucide-react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useSidebar } from "../../context/SidebarContext";

function Logo() {
  const { collapsed } = useSidebar();

  return (
    <Link
      to="/dashboard"
      className={`
        flex
        h-16
        items-center
        border-b
        border-slate-800
        transition-all
        duration-300

        ${
          collapsed
            ? "justify-center"
            : "gap-3 px-5"
        }
      `}
    >
      {/* Logo Icon */}

      <div
        className="
          flex
          h-10
          w-10
          flex-shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-600
          shadow-lg
          shadow-blue-600/20
        "
      >
        <PenSquare
          size={22}
          className="text-white"
        />
      </div>

      {/* Logo Text */}

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{
              opacity: 0,
              x: -10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -10,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <h1
              className="
                text-lg
                font-bold
                leading-none
                text-white
              "
            >
              Blog Studio
            </h1>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              Blog Creator
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}

export default Logo;