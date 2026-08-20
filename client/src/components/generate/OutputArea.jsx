import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  Copy,
  Check,
  Sparkles,
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
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={`
        mb-10
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
          gap-3

          max-[1023px]:w-full
        `}
      >

        {/* ======================================
            AI Identity
        ====================================== */}

        {isAI && (
          <div
            className="
              mt-1
              flex
              h-8
              w-8
              flex-shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-600
              shadow-sm
            "
          >
            <Sparkles
              size={16}
              className="text-white"
            />
          </div>
        )}

        {/* ======================================
            Content Area
        ====================================== */}

        <div
          className={`
            min-w-0
            max-w-full

            ${
              isAI
                ? `
                  flex-1
                  max-w-4xl
                `
                : `
                  max-w-[75%]
                  rounded-2xl
                  bg-blue-600
                  px-5
                  py-3
                  text-white

                  max-[1023px]:max-w-[85%]
                  max-[639px]:max-w-[90%]
                `
            }
          `}
        >

          {/* ====================================
              User Label
          ==================================== */}

          {!isAI && (
            <div
              className="
                mb-1
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-blue-100
              "
            >
              You
            </div>
          )}

          {/* ====================================
              AI Label
          ==================================== */}
{/* 
          {isAI && (
            <div
              className="
                mb-3
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  text-sm
                  font-semibold
                  text-slate-800

                  dark:text-white
                "
              >
                AI
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-slate-200
                  px-2
                  py-0.5
                  text-[10px]
                  font-medium
                  text-slate-500

                  dark:border-slate-700
                  dark:text-slate-400
                "
              >
                BlogGPT
              </span>
            </div>
          )} */}

          {/* ====================================
              Markdown Content
          ==================================== */}

          <div
            className={`
              ai-output-content
              min-w-0
              max-w-full
              break-words
              overflow-hidden

              ${
                isAI
                  ? `
                    prose
                    prose-slate
                    max-w-none

                    prose-headings:text-slate-900
                    prose-p:text-slate-700
                    prose-strong:text-slate-900

                    dark:prose-invert
                    dark:prose-headings:text-white
                    dark:prose-p:text-slate-300
                    dark:prose-strong:text-white
                  `
                  : `
                    prose
                    prose-invert
                    max-w-none
                  `
              }
            `}
          >
            <ReactMarkdown
              remarkPlugins={[
                remarkGfm,
              ]}
              components={{
                h1({
                  children,
                }) {
                  return (
                    <h1
                      className="
                        mb-6
                        mt-2
                        text-3xl
                        font-bold
                        leading-tight
                        tracking-tight

                        max-[1023px]:text-2xl
                        max-[639px]:text-xl
                      "
                    >
                      {children}
                    </h1>
                  );
                },

                h2({
                  children,
                }) {
                  return (
                    <h2
                      className="
                        mb-4
                        mt-8
                        border-b
                        border-slate-200
                        pb-2
                        text-2xl
                        font-bold
                        leading-tight

                        dark:border-slate-700

                        max-[1023px]:text-xl
                        max-[639px]:text-lg
                      "
                    >
                      {children}
                    </h2>
                  );
                },

                h3({
                  children,
                }) {
                  return (
                    <h3
                      className="
                        mb-3
                        mt-6
                        text-xl
                        font-semibold
                        leading-tight

                        max-[1023px]:text-lg
                        max-[639px]:text-base
                      "
                    >
                      {children}
                    </h3>
                  );
                },

                p({
                  children,
                }) {
                  return (
                    <p
                      className="
                        mb-5
                        text-[15px]
                        leading-7
                        text-slate-700

                        dark:text-slate-300

                        max-[639px]:text-sm
                        max-[639px]:leading-6
                      "
                    >
                      {children}
                    </p>
                  );
                },

                ul({
                  children,
                }) {
                  return (
                    <ul
                      className="
                        my-5
                        space-y-2
                        pl-6
                      "
                    >
                      {children}
                    </ul>
                  );
                },

                ol({
                  children,
                }) {
                  return (
                    <ol
                      className="
                        my-5
                        space-y-2
                        pl-6
                      "
                    >
                      {children}
                    </ol>
                  );
                },

                li({
                  children,
                }) {
                  return (
                    <li
                      className="
                        leading-7
                      "
                    >
                      {children}
                    </li>
                  );
                },

                blockquote({
                  children,
                }) {
                  return (
                    <blockquote
                      className="
                        my-6
                        border-l-4
                        border-blue-500
                        bg-slate-50
                        px-5
                        py-3
                        italic
                        text-slate-600

                        dark:bg-slate-800/50
                        dark:text-slate-300
                      "
                    >
                      {children}
                    </blockquote>
                  );
                },

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
                        my-6
                        max-w-full
                        overflow-x-auto
                        rounded-xl
                        border
                        border-slate-200

                        dark:border-slate-700
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
                          overflowX:
                            "auto",
                          borderRadius:
                            "0.75rem",
                        }}
                        wrapLongLines={
                          false
                        }
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
                      className="
                        rounded-md
                        bg-slate-100
                        px-1.5
                        py-0.5
                        text-sm
                        text-blue-700

                        dark:bg-slate-800
                        dark:text-blue-300

                        break-words
                      "
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
                        my-6
                        max-w-full
                        overflow-x-auto
                        rounded-xl
                        border
                        border-slate-200

                        dark:border-slate-700
                      "
                    >
                      <table
                        className="
                          w-full
                          min-w-max
                          text-sm
                        "
                      >
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
                        my-6
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
                        font-medium
                        text-blue-600
                        underline
                        decoration-blue-300
                        underline-offset-2
                        hover:decoration-blue-600
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

          {/* ====================================
              AI Actions
          ==================================== */}

          {isAI && (
            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                border-t
                border-slate-200
                pt-3

                dark:border-slate-700
              "
            >
              <button
                type="button"
                onClick={handleCopy}
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-lg
                  px-2.5
                  py-1.5
                  text-xs
                  text-slate-500
                  transition
                  hover:bg-slate-100
                  hover:text-slate-800

                  dark:text-slate-400
                  dark:hover:bg-slate-800
                  dark:hover:text-white
                "
              >
                {copied ? (
                  <>
                    <Check
                      size={14}
                    />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy
                      size={14}
                    />
                    Copy
                  </>
                )}
              </button>
            </div>
          )}
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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="
        relative
        flex
        min-h-[75vh]
        w-full
        items-center
        justify-center
        px-6
        text-center
      "
    >
      {/* ==================================
          Greeting — Appears First
      ================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: -70,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          left-8
          top-10
          text-left

          sm:left-12
          sm:top-12

          lg:left-16
          lg:top-14

          max-[639px]:left-5
          max-[639px]:top-7
        "
      >
        <div
          className="
            font-serif
            text-3xl
            font-normal
            leading-tight
            tracking-tight
            text-slate-700

            dark:text-slate-200

            sm:text-4xl
            lg:text-5xl

            max-[639px]:text-2xl
          "
        >
          <div>
            Good morning,
          </div>

          <div
            className="
              mt-1
              font-semibold
            "
          >
            Jahangir 👋
          </div>
        </div>
      </motion.div>

      {/* ==================================
          Center Content
      ================================== */}

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          pt-4

          max-[639px]:pt-16
        "
      >
        {/* ==================================
            Title — Drops From Top + Bounces
        ================================== */}

        <motion.h1
          initial={{
            opacity: 0,
            y: -500,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: [
              -500,
              40,
              -18,
              8,
              -4,
              0,
            ],
            scale: [
              0.9,
              1.03,
              0.99,
              1.01,
              1,
              1,
            ],
          }}
          transition={{
            duration: 1.35,
            delay: 0.85,
            ease: "easeOut",
            times: [
              0,
              0.62,
              0.74,
              0.84,
              0.92,
              1,
            ],
          }}
          className="
            font-serif
            text-5xl
            font-bold
            leading-tight
            tracking-tight
            text-slate-800

            dark:text-white

            sm:text-6xl
            lg:text-7xl

            max-[639px]:text-4xl
          "
        >
          AI Blog Generator
        </motion.h1>

        {/* ==================================
            Ready To Create — Appears Last
        ================================== */}

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
            duration: 0.6,
            delay: 2.15,
            ease: "easeOut",
          }}
          className="
            mt-5
            flex
            items-center
            gap-2
            font-serif
            text-sm
            italic
            text-slate-500

            dark:text-slate-400

            sm:text-base
          "
        >
          <motion.span
            initial={{
              opacity: 0,
              scale: 0,
              rotate: -45,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 2.25,
              type: "spring",
              stiffness: 220,
              damping: 12,
            }}
            className="
              inline-flex
              text-sm

              sm:text-base
            "
          >
            ✦
          </motion.span>

          <span>
            Ready to create
          </span>
        </motion.div>
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
    {/* ==================================
        User Prompt
    ================================== */}

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

    {/* ==================================
        AI Thinking
    ================================== */}

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
{/* 
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
              </div> */}

              {/* ==================================
                  Messages
              ================================== */}

              <div
                className="
                  min-w-0
                  max-w-full
                  space-y-1
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