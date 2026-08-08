import {
  useEffect,
  useState,
} from "react";

import OutputArea from "../components/generate/OutputArea";
import PromptBar from "../components/generate/PromptBar";

import { useBlogs } from "../context/BlogContext";

import { sendMessage } from "../services/api";

function GenerateBlog() {
  const {
    activeBlog,
    activeBlogId,
    addBlog,
  } = useBlogs();

  const [status, setStatus] =
    useState("welcome");

  const [loading, setLoading] =
    useState(false);

  /* ==========================================
     Workspace Status
  ========================================== */

  useEffect(() => {
    if (loading) return;

    if (activeBlog) {
      setStatus("completed");
    } else {
      setStatus("welcome");
    }
  }, [activeBlog, loading]);

  /* ==========================================
     Generate AI Response
  ========================================== */

  const handleGenerate = async (
    prompt,
    generationSettings
  ) => {
    if (
      !prompt.trim() ||
      loading
    ) {
      return;
    }

    try {
      setLoading(true);
      setStatus("thinking");

      const started = Date.now();

      /*
       * Generation settings come directly
       * from PromptSettings.
       *
       * Example:
       *
       * {
       *   category: "Technology",
       *   tone: "Professional",
       *   length: "1000 Words",
       *   language: "Telugu"
       * }
       */

      const response =
        await sendMessage(
          activeBlogId,
          prompt,
          generationSettings
        );

      if (!response.success) {
        throw new Error(
          response.message
        );
      }

      /*
       * Keep thinking animation visible
       * for at least 1 second.
       */

      const elapsed =
        Date.now() - started;

      if (elapsed < 1000) {
        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              1000 - elapsed
            )
        );
      }

      /*
       * Update conversation
       * in context.
       */

      addBlog(
        response.conversation
      );

      setStatus("completed");
    } catch (error) {
      console.error(
        "Blog generation error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong."
      );

      if (activeBlog) {
        setStatus("completed");
      } else {
        setStatus("welcome");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-[calc(100vh-88px)]
        bg-slate-50
        text-slate-900
        transition-colors
        duration-300

        dark:bg-[#151A23]
        dark:text-slate-100
      "
    >
      {/* ==========================================
          Main Blog Workspace
      ========================================== */}

      <div
        className="
          min-h-[calc(100vh-88px)]
          transition-colors
          duration-300
        "
      >
        <OutputArea
          status={status}
          blog={activeBlog}
        />
      </div>

      {/* ==========================================
          Prompt Bar
      ========================================== */}

      <PromptBar
        onGenerate={handleGenerate}
        loading={loading}
      />
    </div>
  );
}

export default GenerateBlog;