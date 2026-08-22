import { Navigate } from "react-router-dom";
import { PenSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import useAuth from "../hooks/useAuth";
import GoogleButton from "../components/auth/GoogleButton";

function LandingPage() {
  const { isAuthenticated } = useAuth();

  // If already logged in, go directly to generate
  if (isAuthenticated) {
    return <Navigate to="/generate" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* ================= Navbar ================= */}

      <motion.nav
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="
          flex
          items-center
          justify-between
          px-6
          md:px-10
          py-6
          border-b
          border-slate-800
        "
      >

        {/* Logo */}

        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="flex items-center gap-3"
        >

          {/* Animated Logo Icon */}

          <motion.div
            initial={{
              scale: 0.5,
              rotate: -20,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              type: "spring",
              stiffness: 180,
              damping: 12,
            }}
            whileHover={{
              scale: 1.08,
              rotate: 5,
            }}
            className="
              w-12
              h-12
              rounded-2xl
              bg-blue-600
              flex
              items-center
              justify-center
              shadow-lg
              shadow-blue-600/20
            "
          >
            <PenSquare size={24} />
          </motion.div>

          {/* Brand Text */}

          <div>
            <motion.h1
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.45,
              }}
              className="text-2xl font-bold"
            >
              AI Blog Generator
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
              }}
              className="text-sm text-slate-400"
            >
              AI Powered Writing Platform
            </motion.p>
          </div>

        </motion.div>

        {/* Top Google Button */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.7,
            ease: "easeOut",
          }}
          className="hidden md:block"
        >
          <GoogleButton />
        </motion.div>

      </motion.nav>


      {/* ================= Hero ================= */}

      <section
        className="
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
          py-20
        "
      >

        {/* ================= AI Sparkle ================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.4,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.9,
            type: "spring",
            stiffness: 160,
            damping: 12,
          }}
          className="
            w-20
            h-20
            rounded-full
            bg-blue-600/20
            flex
            items-center
            justify-center
            mb-8
          "
        >

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 4, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles
              size={42}
              className="text-blue-500"
            />
          </motion.div>

        </motion.div>


        {/* ================= Main Heading ================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: -70,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 1.05,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            max-w-5xl
          "
        >

          Create Amazing

          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 1.45,
            }}
            className="
              text-blue-500
              inline-block
              mx-2
            "
          >
            AI Blogs
          </motion.span>

          in Seconds

        </motion.h1>


        {/* ================= Description ================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 1.65,
            ease: "easeOut",
          }}
          className="
            mt-8
            max-w-3xl
            text-lg
            text-slate-400
            leading-8
          "
        >
          Generate SEO optimized blogs using
          Artificial Intelligence.

          Organize them in your personal
          workspace.

          Edit, export and access them anytime.
        </motion.p>


        {/* ================= Google Login ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 1.9,
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
          className="
            mt-12
            w-full
            max-w-sm
          "
        >

          <motion.div
            whileHover={{
              y: -3,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <GoogleButton />
          </motion.div>

        </motion.div>

      </section>

    </div>
  );
}

export default LandingPage;