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
          w-full
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
            w-full
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
                  max-w-[85%]
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
                mb-5
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
              w-full
              max-w-none
              break-words

              ${
                isAI
                  ? `
                    text-slate-800
                    dark:text-slate-100
                  `
                  : "text-white"
              }
            `}
          >
            <ReactMarkdown
              remarkPlugins={[
                remarkGfm,
              ]}
              components={{
                /* ==================================
                   H1 - Main Article Title
                ================================== */

                h1({ children }) {
                  return (
                    <h1
                      className="
                        mb-8
                        mt-2
                        border-b
                        border-slate-200
                        pb-5
                        text-3xl
                        font-extrabold
                        leading-tight
                        tracking-tight
                        text-slate-900

                        sm:text-4xl

                        dark:border-slate-700
                        dark:text-white
                      "
                    >
                      {children}
                    </h1>
                  );
                },

                /* ==================================
                   H2 - Main Sections
                ================================== */

                h2({ children }) {
                  return (
                    <h2
                      className="
                        mb-5
                        mt-10
                        border-l-4
                        border-blue-600
                        pl-4
                        text-2xl
                        font-bold
                        leading-tight
                        text-slate-900

                        sm:text-3xl

                        dark:border-blue-400
                        dark:text-white
                      "
                    >
                      {children}
                    </h2>
                  );
                },

                /* ==================================
                   H3 - Subsections
                ================================== */

                h3({ children }) {
                  return (
                    <h3
                      className="
                        mb-3
                        mt-8
                        text-xl
                        font-bold
                        leading-snug
                        text-slate-800

                        sm:text-2xl

                        dark:text-slate-100
                      "
                    >
                      {children}
                    </h3>
                  );
                },

                /* ==================================
                   H4
                ================================== */

                h4({ children }) {
                  return (
                    <h4
                      className="
                        mb-3
                        mt-6
                        text-lg
                        font-bold
                        text-slate-800

                        dark:text-slate-100
                      "
                    >
                      {children}
                    </h4>
                  );
                },

                /* ==================================
                   Paragraph
                ================================== */

                p({ children }) {
                  return (
                    <p
                      className="
                        mb-5
                        text-[15px]
                        leading-8
                        text-slate-700

                        sm:text-base

                        dark:text-slate-300
                      "
                    >
                      {children}
                    </p>
                  );
                },

                /* ==================================
                   Strong / Bold
                ================================== */

                strong({ children }) {
                  return (
                    <strong
                      className="
                        font-bold
                        text-slate-900

                        dark:text-white
                      "
                    >
                      {children}
                    </strong>
                  );
                },

                /* ==================================
                   Emphasis
                ================================== */

                em({ children }) {
                  return (
                    <em
                      className="
                        italic
                        text-slate-700

                        dark:text-slate-300
                      "
                    >
                      {children}
                    </em>
                  );
                },

                /* ==================================
                   Unordered List
                ================================== */

                ul({ children }) {
                  return (
                    <ul
                      className="
                        mb-6
                        ml-6
                        list-disc
                        space-y-3
                        pl-2
                        text-[15px]
                        leading-7
                        text-slate-700

                        sm:text-base

                        dark:text-slate-300
                      "
                    >
                      {children}
                    </ul>
                  );
                },

                /* ==================================
                   Ordered List
                ================================== */

                ol({ children }) {
                  return (
                    <ol
                      className="
                        mb-6
                        ml-6
                        list-decimal
                        space-y-3
                        pl-2
                        text-[15px]
                        leading-7
                        text-slate-700

                        sm:text-base

                        dark:text-slate-300
                      "
                    >
                      {children}
                    </ol>
                  );
                },

                /* ==================================
                   List Item
                ================================== */

                li({ children }) {
                  return (
                    <li
                      className="
                        pl-1
                        leading-7
                      "
                    >
                      {children}
                    </li>
                  );
                },

                /* ==================================
                   Links
                ================================== */

                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        font-medium
                        text-blue-600
                        underline
                        decoration-blue-300
                        underline-offset-4
                        transition
                        hover:text-blue-700

                        dark:text-blue-400
                        dark:decoration-blue-700
                        dark:hover:text-blue-300
                      "
                    >
                      {children}
                    </a>
                  );
                },

                /* ==================================
                   Horizontal Divider
                ================================== */

                hr() {
                  return (
                    <div
                      className="
                        my-10
                        h-px
                        w-full
                        bg-gradient-to-r
                        from-transparent
                        via-slate-300
                        to-transparent

                        dark:via-slate-600
                      "
                    />
                  );
                },

                /* ==================================
                   Blockquote
                ================================== */

                blockquote({ children }) {
                  return (
                    <blockquote
                      className="
                        my-6
                        rounded-2xl
                        border-l-4
                        border-blue-500
                        bg-blue-50
                        px-5
                        py-4
                        text-[15px]
                        italic
                        leading-7
                        text-slate-700

                        dark:border-blue-400
                        dark:bg-blue-950/30
                        dark:text-slate-300
                      "
                    >
                      {children}
                    </blockquote>
                  );
                },

                /* ==================================
                   Inline / Code Blocks
                ================================== */

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

                  if (!inline && match) {
                    return (
                      <div
                        className="
                          my-7
                          overflow-hidden
                          rounded-2xl
                          border
                          border-slate-700
                          bg-[#111827]
                          shadow-lg
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-700
                            bg-[#0f172a]
                            px-4
                            py-2
                            text-xs
                            text-slate-400
                          "
                        >
                          <span>
                            {match[1]}
                          </span>

                          <span>
                            Code
                          </span>
                        </div>

                        <SyntaxHighlighter
                          style={oneDark}
                          language={
                            match[1]
                          }
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            padding: "20px",
                            background:
                              "#111827",
                            fontSize:
                              "0.875rem",
                            lineHeight:
                              "1.7",
                          }}
                        >
                          {String(
                            children
                          ).replace(
                            /\n$/,
                            ""
                          )}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }

                  return (
                    <code
                      className="
                        rounded-md
                        bg-slate-100
                        px-1.5
                        py-0.5
                        font-mono
                        text-[0.9em]
                        text-blue-700

                        dark:bg-slate-800
                        dark:text-blue-300
                      "
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },

                /* ==================================
                   Pre - Fenced Code / ASCII Diagrams
                ================================== */

                pre({ children }) {
                  return (
                    <div
                      className="
                        my-7
                        overflow-x-auto
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-950
                        shadow-lg

                        dark:border-slate-700
                      "
                    >
                      {children}
                    </div>
                  );
                },

                /* ==================================
                   Tables
                ================================== */

                table({ children }) {
                  return (
                    <div
                      className="
                        my-7
                        w-full
                        overflow-x-auto
                        rounded-2xl
                        border
                        border-slate-200

                        dark:border-slate-700
                      "
                    >
                      <table
                        className="
                          min-w-full
                          border-collapse
                          text-left
                          text-sm
                        "
                      >
                        {children}
                      </table>
                    </div>
                  );
                },

                thead({ children }) {
                  return (
                    <thead
                      className="
                        bg-slate-100

                        dark:bg-slate-800
                      "
                    >
                      {children}
                    </thead>
                  );
                },

                th({ children }) {
                  return (
                    <th
                      className="
                        border-b
                        border-slate-200
                        px-4
                        py-3
                        font-bold
                        text-slate-800

                        dark:border-slate-700
                        dark:text-white
                      "
                    >
                      {children}
                    </th>
                  );
                },

                td({ children }) {
                  return (
                    <td
                      className="
                        border-b
                        border-slate-200
                        px-4
                        py-3
                        align-top
                        text-slate-700

                        dark:border-slate-700
                        dark:text-slate-300
                      "
                    >
                      {children}
                    </td>
                  );
                },

                /* ==================================
                   Delete Table Body Border
                ================================== */

                tbody({ children }) {
                  return (
                    <tbody
                      className="
                        divide-y
                        divide-slate-200

                        dark:divide-slate-700
                      "
                    >
                      {children}
                    </tbody>
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
                ease: "easeInOut",
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
          leading-8
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
                  leading-6
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
              pt-14
              sm:pt-16
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
                  message={
                    message
                  }
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
                pt-14
                sm:pt-16
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

                    sm:text-4xl

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