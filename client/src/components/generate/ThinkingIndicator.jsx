import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function ThinkingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center py-24">

      {/* AI Icon */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-blue-600
          shadow-xl
        "
      >
        <Sparkles
          size={30}
          className="text-white"
        />
      </motion.div>

      {/* Title */}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="
          mt-8
          text-3xl
          font-bold
          text-slate-800
        "
      >
        AI is thinking...
      </motion.h2>

      {/* Subtitle */}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="
          mt-3
          text-slate-500
        "
      >
        Generating your response
      </motion.p>

      {/* Animated Dots */}

      <div className="mt-8 flex items-center gap-3">

        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: dot * 0.2,
            }}
            className="
              h-3
              w-3
              rounded-full
              bg-blue-600
            "
          />
        ))}

      </div>

    </div>
  );
}

export default ThinkingIndicator;