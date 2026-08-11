import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Ellipsis,
  SendHorizontal,
  LoaderCircle,
} from "lucide-react";

import PromptSettings from "./PromptSettings";

import { useSidebar } from "../../context/SidebarContext";

function PromptBar({
  onGenerate,
  loading = false,
}) {
  const {
    sidebarWidth,
    isMobile,
    mobileOpen,
  } = useSidebar();

  const [prompt, setPrompt] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const [generationSettings, setGenerationSettings] =
    useState({
      category: "Technology",
      tone: "Professional",
      length: "1000 Words",
      language: "English",
    });

  const [isSmallScreen, setIsSmallScreen] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      return window.matchMedia(
        "(max-width: 1023px)"
      ).matches;
    });

  const textareaRef =
    useRef(null);

  const wrapperRef =
    useRef(null);

  /* ==========================================
     Small Screen Detection
  ========================================== */

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(max-width: 1023px)"
      );

    const handleScreenChange = (
      event
    ) => {
      setIsSmallScreen(
        event.matches
      );
    };

    setIsSmallScreen(
      mediaQuery.matches
    );

    mediaQuery.addEventListener(
      "change",
      handleScreenChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleScreenChange
      );
    };
  }, []);

  /*
   * Extra-small phones, small phones,
   * and tablets:
   *
   * Sidebar open
   *       ↓
   * PromptBar hidden
   *
   * Sidebar closed
   *       ↓
   * PromptBar visible
   *
   * Desktop is never affected.
   */

  const hidePromptBar =
    isSmallScreen &&
    mobileOpen;

  /* ==========================================
     Close Settings
  ========================================== */

  useEffect(() => {
    const click = (event) => {
      if (!wrapperRef.current) {
        return;
      }

      /*
       * Do not close the settings panel when
       * interacting with anything inside the
       * prompt bar or settings panel.
       */

      if (
        wrapperRef.current.contains(
          event.target
        )
      ) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener(
      "mousedown",
      click
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        click
      );
    };
  }, []);

  /* ==========================================
     Close Settings When Sidebar Opens
  ========================================== */

  useEffect(() => {
    if (hidePromptBar) {
      setOpen(false);
    }
  }, [hidePromptBar]);

  /* ==========================================
     Auto Height
  ========================================== */

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height =
      "0px";

    textareaRef.current.style.height =
      textareaRef.current.scrollHeight +
      "px";
  }, [prompt]);

  /* ==========================================
     Generation Settings
  ========================================== */

  const handleSettingsChange = (
    settings
  ) => {
    setGenerationSettings(
      settings
    );
  };

  /* ==========================================
     Submit
  ========================================== */

  const handleSubmit = () => {
    const value =
      prompt.trim();

    if (
      !value ||
      loading
    ) {
      return;
    }

    /*
     * Send prompt + selected generation
     * settings to GenerateBlog.
     */

    onGenerate(
      value,
      generationSettings
    );

    setPrompt("");
  };

  /*
   * ==========================================
   * Hide PromptBar On Small Screens
   * While Sidebar Is Open
   * ==========================================
   *
   * We return null instead of simply using
   * display:none so the fixed prompt bar does
   * not occupy or interfere with the sidebar.
   */

  if (hidePromptBar) {
    return null;
  }

  return (
    <motion.div
      ref={wrapperRef}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        fixed
        bottom-5
        z-50
        flex
        justify-center
        px-4
      "
      style={{
        left: isMobile
          ? 0
          : sidebarWidth,
        right: 0,
      }}
    >
      {/* ======================================
          Prompt Settings
      ====================================== */}

      <div
        className="
          pointer-events-auto
          absolute
          inset-x-0
          bottom-full
          z-[60]
          flex
          justify-center
          pb-3
        "
      >
        <div
          onMouseDown={(event) =>
            event.stopPropagation()
          }
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          <PromptSettings
            open={open}
            onSettingsChange={
              handleSettingsChange
            }
          />
        </div>
      </div>

      {/* ======================================
          Prompt Container
      ====================================== */}

      <div
        className="
          pointer-events-auto
          relative
          z-50
          w-full
          max-w-4xl
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-xl

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* ======================================
            Prompt Area
        ====================================== */}

        <div
          className="
            flex
            items-end
            gap-3
            px-4
            py-3
          "
        >
          {/* Settings */}

          <motion.button
            type="button"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setOpen(
                (previous) =>
                  !previous
              )
            }
            aria-label="Prompt settings"
            className="
              flex
              h-9
              w-9
              flex-shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-700
              transition
              hover:bg-slate-100

              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >
            <Ellipsis size={20} />
          </motion.button>

          {/* Prompt */}

          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            disabled={loading}
            placeholder="Ask AI to write anything..."
            onChange={(event) =>
              setPrompt(
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();

                handleSubmit();
              }
            }}
            className="
              max-h-40
              min-h-[24px]
              flex-1
              resize-none
              overflow-y-auto
              bg-transparent
              py-1
              text-sm
              leading-6
              text-slate-800
              outline-none
              placeholder:text-slate-400
              disabled:cursor-not-allowed

              dark:text-white
              dark:placeholder:text-slate-500
            "
          />

          {/* Send */}

          <motion.button
            type="button"
            whileHover={{
              scale: loading
                ? 1
                : 1.05,
            }}
            whileTap={{
              scale: loading
                ? 1
                : 0.95,
            }}
            disabled={
              loading ||
              !prompt.trim()
            }
            onClick={
              handleSubmit
            }
            aria-label="Send prompt"
            className={`
              flex
              h-10
              w-10
              flex-shrink-0
              items-center
              justify-center
              rounded-full
              transition

              ${
                loading ||
                !prompt.trim()
                  ? "cursor-not-allowed bg-slate-300 text-white dark:bg-slate-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            {loading ? (
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
            ) : (
              <SendHorizontal
                size={18}
              />
            )}
          </motion.button>
        </div>

        {/* ======================================
            Footer
        ====================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-slate-200
            px-4
            py-2

            dark:border-slate-700
          "
        >
          <div
            className="
              min-w-0
              truncate
              text-[11px]
              text-slate-500

              dark:text-slate-400
            "
          >
            {loading
              ? "AI is generating your response..."
              : "Press Enter to send • Shift + Enter for a new line"}
          </div>

          <div
            className={`
              flex-shrink-0
              text-[11px]
              font-medium

              ${
                prompt.length > 1800
                  ? "text-red-500"
                  : "text-slate-400 dark:text-slate-500"
              }
            `}
          >
            {prompt.length}/2000
          </div>
        </div>

        {/* ======================================
            Bottom Glow
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            h-[2px]
            w-full
            bg-gradient-to-r
            from-blue-500
            via-cyan-400
            to-blue-500
          "
        />
      </div>
    </motion.div>
  );
}

export default PromptBar;