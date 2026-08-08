import { motion } from "framer-motion";

import {
  ArrowRight,
  BookOpen,
  FileText,
  History,
  MessageSquare,
  PenSquare,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useBlogs } from "../context/BlogContext";

function Dashboard() {
  const navigate = useNavigate();

  const {
    blogs = [],
    openBlog,
  } = useBlogs();

  /* ==========================================
     Dashboard Statistics
  ========================================== */

  const totalBlogs = blogs.length;

  const totalMessages = blogs.reduce(
    (total, blog) =>
      total +
      (Array.isArray(blog.messages)
        ? blog.messages.length
        : 0),
    0
  );

  const aiRequests = blogs.reduce(
    (total, blog) => {
      if (!Array.isArray(blog.messages)) {
        return total;
      }

      return (
        total +
        blog.messages.filter(
          (message) =>
            message.role === "user"
        ).length
      );
    },
    0
  );

  /* ==========================================
     Generated Today
  ========================================== */

  const today = new Date();

  const generatedToday = blogs.filter(
    (blog) => {
      const date =
        blog.updatedAt ||
        blog.createdAt;

      if (!date) {
        return false;
      }

      const blogDate =
        new Date(date);

      return (
        blogDate.getDate() ===
          today.getDate() &&
        blogDate.getMonth() ===
          today.getMonth() &&
        blogDate.getFullYear() ===
          today.getFullYear()
      );
    }
  ).length;

  /* ==========================================
     Recent Blogs
  ========================================== */

  const recentBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(
          b.updatedAt ||
            b.createdAt ||
            0
        ) -
        new Date(
          a.updatedAt ||
            a.createdAt ||
            0
        )
    )
    .slice(0, 5);

  /* ==========================================
     Open Blog
  ========================================== */

  const handleOpenBlog = async (id) => {
    await openBlog(id);
    navigate("/generate");
  };

  /* ==========================================
     Format Date
  ========================================== */

  const formatDate = (date) => {
    if (!date) {
      return "Recently";
    }

    const value =
      new Date(date);

    if (Number.isNaN(value.getTime())) {
      return "Recently";
    }

    return value.toLocaleDateString(
      undefined,
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <div
      className="
        space-y-6
        pb-8
        text-slate-900
        transition-colors
        duration-300

        dark:text-white
      "
    >
      {/* ==========================================
          Header
      ========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
      >
        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <div
              className="
                mb-2
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-600

                dark:border-blue-400/20
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <Sparkles size={13} />

              AI Blog Workspace
            </div>

            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-slate-800

                dark:text-white
              "
            >
              Welcome Back 👋
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              Manage and generate
              AI-powered blogs from
              one place.
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              navigate("/generate")
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition
              hover:bg-blue-700
            "
          >
            <PenSquare size={17} />

            Generate Blog

            <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>

      {/* ==========================================
          Stats
      ========================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* Total Blogs */}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            delay: 0.05,
          }}
          whileHover={{
            y: -3,
          }}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            transition-colors

            dark:border-slate-700
            dark:bg-[#1b2029]
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Total Blogs
              </p>

              <p
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-slate-800

                  dark:text-white
                "
              >
                {totalBlogs}
              </p>
            </div>

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-600

                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <BookOpen size={20} />
            </div>
          </div>
        </motion.div>

        {/* Generated Today */}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            delay: 0.1,
          }}
          whileHover={{
            y: -3,
          }}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            transition-colors

            dark:border-slate-700
            dark:bg-[#1b2029]
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Generated Today
              </p>

              <p
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-slate-800

                  dark:text-white
                "
              >
                {generatedToday}
              </p>
            </div>

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-emerald-50
                text-emerald-600

                dark:bg-emerald-500/10
                dark:text-emerald-400
              "
            >
              <PenSquare size={20} />
            </div>
          </div>
        </motion.div>

        {/* Saved Blogs */}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            delay: 0.15,
          }}
          whileHover={{
            y: -3,
          }}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            transition-colors

            dark:border-slate-700
            dark:bg-[#1b2029]
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Saved Blogs
              </p>

              <p
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-slate-800

                  dark:text-white
                "
              >
                {totalBlogs}
              </p>
            </div>

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-violet-50
                text-violet-600

                dark:bg-violet-500/10
                dark:text-violet-400
              "
            >
              <FileText size={20} />
            </div>
          </div>
        </motion.div>

        {/* AI Requests */}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            delay: 0.2,
          }}
          whileHover={{
            y: -3,
          }}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            transition-colors

            dark:border-slate-700
            dark:bg-[#1b2029]
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-medium
                  text-slate-500

                  dark:text-slate-400
                "
              >
                AI Requests
              </p>

              <p
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-slate-800

                  dark:text-white
                "
              >
                {aiRequests}
              </p>
            </div>

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-cyan-50
                text-cyan-600

                dark:bg-cyan-500/10
                dark:text-cyan-400
              "
            >
              <MessageSquare size={20} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==========================================
          Recent Blogs
      ========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay: 0.25,
        }}
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm

          dark:border-slate-700
          dark:bg-[#1b2029]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-5
            py-5

            dark:border-slate-700
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-semibold
                text-slate-800

                dark:text-white
              "
            >
              Recent Blogs
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-500

                dark:text-slate-400
              "
            >
              Your latest generated
              conversations
            </p>
          </div>

          {recentBlogs.length > 0 && (
            <button
              type="button"
              onClick={() =>
                navigate("/generate")
              }
              className="
                text-sm
                font-semibold
                text-blue-600
                transition
                hover:text-blue-700

                dark:text-blue-400
              "
            >
              View All
            </button>
          )}
        </div>

        {recentBlogs.length === 0 ? (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              px-6
              py-14
              text-center
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                text-slate-400

                dark:bg-slate-800
                dark:text-slate-500
              "
            >
              <BookOpen size={24} />
            </div>

            <h3
              className="
                mt-4
                text-base
                font-semibold
                text-slate-700

                dark:text-slate-200
              "
            >
              No blogs generated yet
            </h3>

            <p
              className="
                mt-1
                max-w-sm
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              Start your first AI blog
              and it will appear here.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/generate")
              }
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              <PenSquare size={16} />

              Create Your First Blog
            </button>
          </div>
        ) : (
          <div
            className="
              divide-y
              divide-slate-100

              dark:divide-slate-700
            "
          >
            {recentBlogs.map(
              (blog, index) => (
                <motion.button
                  key={
                    blog._id ||
                    blog.id
                  }
                  type="button"
                  initial={{
                    opacity: 0,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      0.3 +
                      index * 0.05,
                  }}
                  onClick={() =>
                    handleOpenBlog(
                      blog._id ||
                        blog.id
                    )
                  }
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-4
                    px-5
                    py-4
                    text-left
                    transition
                    hover:bg-slate-50

                    dark:hover:bg-slate-800/60
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600

                      dark:bg-blue-500/10
                      dark:text-blue-400
                    "
                  >
                    <FileText size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-slate-800

                        dark:text-slate-100
                      "
                    >
                      {blog.title ||
                        "Untitled Blog"}
                    </h3>

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      <span>
                        {formatDate(
                          blog.updatedAt ||
                            blog.createdAt
                        )}
                      </span>

                      <span>•</span>

                      <span>
                        {Array.isArray(
                          blog.messages
                        )
                          ? blog.messages
                              .length
                          : 0}{" "}
                        messages
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    size={17}
                    className="
                      flex-shrink-0
                      text-slate-300
                      transition-all
                      group-hover:translate-x-1
                      group-hover:text-blue-500

                      dark:text-slate-600
                      dark:group-hover:text-blue-400
                    "
                  />
                </motion.button>
              )
            )}
          </div>
        )}
      </motion.div>

      {/* ==========================================
          Quick Actions
      ========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay: 0.35,
        }}
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm

          dark:border-slate-700
          dark:bg-[#1b2029]
        "
      >
        <div className="mb-5">
          <h2
            className="
              text-lg
              font-semibold
              text-slate-800

              dark:text-white
            "
          >
            Quick Actions
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-slate-500

              dark:text-slate-400
            "
          >
            Quickly access your most
            used tools.
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
          "
        >
          <motion.button
            type="button"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              navigate("/generate")
            }
            className="
              flex
              items-center
              justify-between
              rounded-xl
              bg-blue-600
              px-5
              py-4
              text-left
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <div
              className="
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
                  bg-white/15
                "
              >
                <PenSquare
                  size={18}
                />
              </div>

              <div>
                <p className="font-semibold">
                  Generate Blog
                </p>

                <p className="text-xs text-blue-100">
                  Create a new AI blog
                </p>
              </div>
            </div>

            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              navigate("/generate")
            }
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-5
              py-4
              text-left
              transition
              hover:border-slate-300
              hover:bg-slate-100

              dark:border-slate-700
              dark:bg-slate-800
              dark:hover:bg-slate-750
            "
          >
            <div
              className="
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
                  bg-white
                  text-slate-600
                  shadow-sm

                  dark:bg-slate-700
                  dark:text-slate-200
                "
              >
                <History size={18} />
              </div>

              <div>
                <p
                  className="
                    font-semibold
                    text-slate-800

                    dark:text-white
                  "
                >
                  View History
                </p>

                <p
                  className="
                    text-xs
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  Browse your blogs
                </p>
              </div>
            </div>

            <ArrowRight
              size={18}
              className="
                text-slate-400
              "
            />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;