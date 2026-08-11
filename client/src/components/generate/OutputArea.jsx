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
      className={`
        mb-8
        flex
        min-w-0
        max-w-full
        ${
          isAI
            ? "justify-start"
            : "justify-end"
        }
      `}
    >
      <div
        className={`
          flex
          min-w-0
          max-w-full
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
            min-w-0
            max-w-full
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

            max-[1023px]:w-full
            max-[1023px]:rounded-2xl
            max-[1023px]:px-4
            max-[1023px]:py-4
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
              ai-output-content
              min-w-0
              max-w-full
              prose
              max-w-none
              break-words
              overflow-hidden

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
                    <div
                      className="
                        my-4
                        max-w-full
                        overflow-x-auto
                        rounded-xl
                      "
                    >
                      <SyntaxHighlighter
                        style={oneDark}
                        language={
                          match[1]
                        }
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          maxWidth: "100%",
                          overflowX: "auto",
                        }}
                        wrapLongLines={false}
                      >
                        {String(
                          children
                        ).replace(
                          /\n$/,
                          ""
                        )}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className={`
                        ${className || ""}
                        break-words
                      `}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },

                table({
                  children,
                }) {
                  return (
                    <div
                      className="
                        my-5
                        max-w-full
                        overflow-x-auto
                        rounded-xl
                      "
                    >
                      <table className="w-full min-w-max">
                        {children}
                      </table>
                    </div>
                  );
                },

                img({
                  src,
                  alt,
                  ...props
                }) {
                  return (
                    <img
                      src={src}
                      alt={alt || ""}
                      className="
                        max-w-full
                        h-auto
                        rounded-xl
                      "
                      {...props}
                    />
                  );
                },

                a({
                  children,
                  href,
                  ...props
                }) {
                  return (
                    <a
                      href={href}
                      className="
                        break-words
                      "
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
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
  const blobDelays = [
    "0.2s",
    "0.4s",
    "0.6s",
    "0.8s",
    "1s",
    "1.2s",
  ];

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
        justify-center
        py-10
      "
    >
      {/* ======================================
          Goo Filter
      ====================================== */}

      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{
          position: "absolute",
        }}
      >
        <defs>
          <filter id="thinking-goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />

            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7
              "
              result="goo"
            />

            <feBlend
              in="SourceGraphic"
              in2="goo"
            />
          </filter>
        </defs>
      </svg>

      {/* ======================================
          Blob Animation
      ====================================== */}

      <div className="thinking-blobs">
        <div className="blob-center" />

        {blobDelays.map(
          (delay, index) => (
            <div
              key={index}
              className="thinking-blob"
              style={{
                animationDelay: delay,
              }}
            />
          )
        )}
      </div>

      {/* ======================================
          Animation Styles
      ====================================== */}

      <style>{`
        .thinking-blobs {
          width: 300px;
          height: 300px;
          position: relative;
          overflow: hidden;
          border-radius: 70px;
          transform-style: preserve-3d;
          filter: url(#thinking-goo);
        }

        .thinking-blobs .blob-center {
          transform-style: preserve-3d;
          position: absolute;
          background: #034282;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          transform-origin: left top;
          transform: scale(0.9)
            translate(-50%, -50%);
          animation: blob-grow-2 3.4s linear infinite;
          border-radius: 50%;
          box-shadow:
            0 -10px 40px -5px #1d1d1d;
        }

        .thinking-blobs .thinking-blob {
          position: absolute;
          background: #052f6a;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          animation: blobs-2 3.4s ease-out infinite;
          transform: scale(0.9)
            translate(-50%, -50%);
          transform-origin: center top;
          opacity: 0;
        }

        @keyframes blobs-2 {
          0% {
            opacity: 0;
            transform:
              scale(0)
              translate(
                calc(-330px - 50%),
                -50%
              );
          }

          1% {
            opacity: 1;
          }

          35%,
          65% {
            opacity: 1;
            transform:
              scale(0.9)
              translate(-50%, -50%);
          }

          99% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform:
              scale(0)
              translate(
                calc(330px - 50%),
                -50%
              );
          }
        }

        @keyframes blob-grow-2 {
          0%,
          39% {
            transform:
              scale(0)
              translate(-50%, -50%);
          }

          40%,
          42% {
            transform:
              scale(1, 0.9)
              translate(-50%, -50%);
          }

          43%,
          44% {
            transform:
              scale(1.2, 1.1)
              translate(-50%, -50%);
          }

          45%,
          46% {
            transform:
              scale(1.3, 1.2)
              translate(-50%, -50%);
          }

          47%,
          48% {
            transform:
              scale(1.4, 1.3)
              translate(-50%, -50%);
          }

          52% {
            transform:
              scale(1.5, 1.4)
              translate(-50%, -50%);
          }

          54% {
            transform:
              scale(1.7, 1.6)
              translate(-50%, -50%);
          }

          58% {
            transform:
              scale(1.8, 1.7)
              translate(-50%, -50%);
          }

          68%,
          70% {
            transform:
              scale(1.7, 1.5)
              translate(-50%, -50%);
          }

          78% {
            transform:
              scale(1.6, 1.4)
              translate(-50%, -50%);
          }

          80%,
          81% {
            transform:
              scale(1.5, 1.4)
              translate(-50%, -50%);
          }

          82%,
          83% {
            transform:
              scale(1.4, 1.3)
              translate(-50%, -50%);
          }

          84%,
          85% {
            transform:
              scale(1.3, 1.2)
              translate(-50%, -50%);
          }

          86%,
          87% {
            transform:
              scale(1.2, 1.1)
              translate(-50%, -50%);
          }

          90%,
          91% {
            transform:
              scale(1, 0.9)
              translate(-50%, -50%);
          }

          92%,
          100% {
            transform:
              scale(0)
              translate(-50%, -50%);
          }
        }

        /* ======================================
           Mobile + Tablet Output Protection
        ====================================== */

        @media (max-width: 1023px) {
          .ai-output-content {
            width: 100%;
            max-width: 100%;
            overflow-wrap: anywhere;
            word-break: normal;
          }

          .ai-output-content p,
          .ai-output-content h1,
          .ai-output-content h2,
          .ai-output-content h3,
          .ai-output-content h4,
          .ai-output-content h5,
          .ai-output-content h6,
          .ai-output-content li {
            max-width: 100%;
            overflow-wrap: anywhere;
          }

          .ai-output-content pre {
            max-width: 100%;
            overflow-x: auto;
          }

          .ai-output-content table {
            max-width: 100%;
          }

          .ai-output-content img,
          .ai-output-content video {
            max-width: 100%;
            height: auto;
          }
        }

        /* ======================================
           Small Phones
        ====================================== */

        @media (max-width: 639px) {
          .thinking-blobs {
            width: 240px;
            height: 240px;
            border-radius: 55px;
          }
        }
      `}</style>
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
        min-w-0
        max-w-full
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
              min-w-0
              max-w-5xl
              flex-col
              gap-8
              px-2
              pt-8
              sm:pt-10
              pb-36

              max-[1023px]:w-full
              max-[1023px]:max-w-full
              max-[1023px]:overflow-hidden
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
                min-w-0
                max-w-5xl
                flex-col
                px-2
                pt-8
                sm:pt-10

                max-[1023px]:w-full
                max-[1023px]:max-w-full
                max-[1023px]:overflow-hidden
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
                    max-w-full
                    break-words
                    text-3xl
                    font-bold
                    text-slate-800

                    dark:text-white

                    max-[1023px]:text-2xl
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
                  min-w-0
                  max-w-full
                  space-y-2
                  pb-36

                  max-[1023px]:w-full
                  max-[1023px]:overflow-hidden
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