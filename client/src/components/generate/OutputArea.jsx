import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  Copy,
  Check,
} from "lucide-react";

/* ==========================================
   Suggestions
========================================== */

const suggestions = [
  {
    title: "Write a Blog",
    prompt:
      "Write a detailed blog about Artificial Intelligence",
  },
  {
    title: "SEO Article",
    prompt:
      "Create an SEO optimized article about React",
  },
  {
    title: "Tutorial",
    prompt:
      "Explain JavaScript Promises with examples",
  },
  {
    title: "Business",
    prompt:
      "Generate a startup business plan",
  },
];

/* ==========================================
   Message Bubble
========================================== */

function MessageBubble({ message }) {
  const isAI =
    message.role === "assistant";

  const [copied, setCopied] =
    useState(false);

  /* ==========================================
     Copy Message
  ========================================== */

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        message.content
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`mb-8 flex ${
        isAI
          ? "justify-start"
          : "justify-end"
      }`}
    >
      <div
        className={`
          flex
          max-w-4xl
          ${
            isAI
              ? ""
              : "flex-row-reverse"
          }
        `}
      >
        {/* ======================================
            Message Bubble
        ====================================== */}

        <div
          className={`
            rounded-3xl
            px-6
            py-5
            shadow-lg

            ${
              isAI
                ? `
                  border
                  border-slate-200
                  bg-white
                  text-slate-800

                  dark:border-slate-700
                  dark:bg-[#1b2029]
                  dark:text-slate-100
                `
                : `
                  bg-blue-600
                  text-white
                `
            }
          `}
        >
          {/* ======================================
              Copy Button
          ====================================== */}

          {isAI && (
            <div
              className="
                mb-4
                flex
                items-center
                justify-end
              "
            >
              <button
                type="button"
                onClick={handleCopy}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  py-1.5
                  text-xs
                  text-slate-600
                  transition
                  hover:bg-slate-100

                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>
          )}

          {/* ======================================
              User Label
          ====================================== */}

          {!isAI && (
            <div
              className="
                mb-3
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-blue-100
              "
            >
              You
            </div>
          )}

          {/* ======================================
              Markdown Content
          ====================================== */}

          <div
            className={`
              prose
              max-w-none

              ${
                isAI
                  ? `
                    prose-slate
                    dark:prose-invert
                  `
                  : "prose-invert"
              }
            `}
          >
            <ReactMarkdown
              remarkPlugins={[
                remarkGfm,
              ]}
              components={{
                code({
                  inline,
                  className,
                  children,
                  ...props
                }) {
                  const match =
                    /language-(\w+)/.exec(
                      className || ""
                    );

                  return !inline &&
                    match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={
                        match[1]
                      }
                      PreTag="div"
                    >
                      {String(
                        children
                      ).replace(
                        /\n$/,
                        ""
                      )}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={
                        className
                      }
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================
   Thinking Indicator
========================================== */

function ThinkingIndicator() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        flex
        justify-start
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          py-4
          shadow-sm

          dark:border-slate-700
          dark:bg-[#1b2029]
        "
      >
        {[0, 1, 2].map(
          (dot) => (
            <motion.div
              key={dot}
              animate={{
                y: [
                  0,
                  -6,
                  0,
                ],
                opacity: [
                  0.35,
                  1,
                  0.35,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay:
                  dot * 0.18,
                ease:
                  "easeInOut",
              }}
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-blue-600

                dark:bg-blue-400
              "
            />
          )
        )}
      </div>
    </motion.div>
  );
}

/* ==========================================
   Welcome Screen
========================================== */

function WelcomeScreen() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        flex
        min-h-[75vh]
        flex-col
        items-center
        justify-center
        px-4
        text-center
      "
    >
      <h1
        className="
          text-4xl
          font-bold
          text-slate-800
          sm:text-5xl

          dark:text-white
        "
      >
        AI Blog Generator
      </h1>

      <p
        className="
          mt-5
          max-w-2xl
          text-lg
          text-slate-500

          dark:text-slate-400
        "
      >
        Generate professional
        blogs, articles,
        tutorials and
        AI-powered content
        with a ChatGPT-like
        experience.
      </p>

      <div
        className="
          mt-12
          grid
          w-full
          max-w-3xl
          gap-4
          md:grid-cols-2
        "
      >
        {suggestions.map(
          (item) => (
            <motion.div
              key={item.title}
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                text-left
                shadow-sm
                transition

                hover:shadow-lg

                dark:border-slate-700
                dark:bg-[#1b2029]
              "
            >
              <h3
                className="
                  font-semibold
                  text-slate-800

                  dark:text-white
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                {item.prompt}
              </p>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
}

/* ==========================================
   Output Area
========================================== */

function OutputArea({
  status,
  blog,
}) {
  const bottomRef =
    useRef(null);

  /* ==========================================
     Auto Scroll
  ========================================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [blog, status]);

  return (
    <div
      className="
        relative
        w-full
        text-slate-900

        dark:text-slate-100
      "
    >
      <AnimatePresence mode="wait">

        {/* ======================================
            Welcome
        ====================================== */}

        {status === "welcome" && (
          <WelcomeScreen />
        )}

        {/* ======================================
            Thinking
        ====================================== */}

        {status === "thinking" && (
          <motion.div
            key="thinking"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              mx-auto
              flex
              max-w-5xl
              flex-col
              gap-8
              px-2
              pt-8
              sm:pt-10
              pb-36
            "
          >
            {blog?.messages?.map(
              (message) => (
                <MessageBubble
                  key={
                    message._id ||
                    message.id
                  }
                  message={message}
                />
              )
            )}

            <ThinkingIndicator />
          </motion.div>
        )}

        {/* ======================================
            Completed Conversation
        ====================================== */}

        {status === "completed" &&
          blog && (
            <motion.div
              key={
                blog._id ||
                blog.id
              }
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                mx-auto
                flex
                max-w-5xl
                flex-col
                px-2
                pt-8
                sm:pt-10
              "
            >
              {/* ==================================
                  Blog Header
              ================================== */}

              <div
                className="
                  mb-8
                  border-b
                  border-slate-200
                  pb-5

                  dark:border-slate-700
                "
              >
                <h1
                  className="
                    text-3xl
                    font-bold
                    text-slate-800

                    dark:text-white
                  "
                >
                  {blog.title}
                </h1>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  {blog.messages
                    ?.length || 0}{" "}
                  messages
                </p>
              </div>

              {/* ==================================
                  Messages
              ================================== */}

              <div
                className="
                  space-y-2
                  pb-36
                "
              >
                {blog.messages?.map(
                  (message) => (
                    <MessageBubble
                      key={
                        message._id ||
                        message.id
                      }
                      message={
                        message
                      }
                    />
                  )
                )}
              </div>
            </motion.div>
          )}
      </AnimatePresence>

      <div
        ref={bottomRef}
        className="h-1"
      />
    </div>
  );
}

export default OutputArea;