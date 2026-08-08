import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { useSettings } from "../../context/SettingsContext";

function ProfileCard() {
  const { user, isAuthenticated } = useAuth();

  const { setDrawerOpen } = useSettings();

  if (!isAuthenticated) return null;

  return (
    <div className="border-t border-slate-800 p-4">
      <motion.button
        type="button"
        whileHover={{
          scale: 1.02,
          y: -2,
        }}
        whileTap={{
          scale: 0.98,
        }}
        onClick={() => setDrawerOpen(true)}
        className="
          group
          relative
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-slate-700
          bg-slate-800/80
          p-3
          backdrop-blur-md
          transition-all
          duration-300
          hover:border-blue-500/40
          hover:bg-slate-700
          hover:shadow-lg
          hover:shadow-blue-500/10
        "
      >
        {/* Background Glow */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-blue-600/5
            via-cyan-500/5
            to-blue-600/5
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        <div className="relative flex items-center gap-3">
          {/* Avatar */}

          <motion.div
            whileHover={{
              scale: 1.08,
            }}
            className="relative flex-shrink-0"
          >
            <img
              src={
                user?.providerData?.[0]?.photoURL ||
                user?.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.displayName || "User"
                )}`
              }
              alt={
                user?.displayName || "Profile"
              }
              referrerPolicy="no-referrer"
              className="
                h-12
                w-12
                rounded-full
                border-2
                border-slate-600
                object-cover
              "
            />

            {/* Online Indicator */}

            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="
                absolute
                bottom-0
                right-0
                h-3.5
                w-3.5
                rounded-full
                border-2
                border-slate-900
                bg-green-500
              "
            />
          </motion.div>

          {/* User Info */}

          <div className="min-w-0 flex-1 overflow-hidden text-left">
            <h3 className="truncate text-sm font-semibold text-white">
              {user?.displayName || "User"}
            </h3>

            <p className="truncate text-xs text-slate-400">
              {user?.email || ""}
            </p>
          </div>

          {/* Arrow */}

          <motion.div
            whileHover={{
              x: 4,
            }}
            className="flex-shrink-0"
          >
            <ChevronRight
              size={18}
              className="
                text-slate-400
                transition-colors
                duration-200
                group-hover:text-white
              "
            />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}

export default ProfileCard;