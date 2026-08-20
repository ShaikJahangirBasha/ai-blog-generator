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

  /*
   * Conversation currently visible
   * on the Generate page.
   *
   * This allows the previous conversation
   * to remain visible while a new response
   * is being generated.
   */
  const [displayBlog, setDisplayBlog] =
    useState(null);

  /* ==========================================
     Sync Active Blog
  ========================================== */

  useEffect(() => {
    if (loading) {
      return;
    }

    if (activeBlog) {
      setDisplayBlog(activeBlog);
      setStatus("completed");
    } else {
      setDisplayBlog(null);
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

    /*
     * Immediately show the user's prompt
     * before Gemini starts generating.
     */
    const userMessage = {
      role: "user",
      content: prompt.trim(),
      id: `temp-user-${Date.now()}`,
    };

    /*
     * Preserve the currently visible
     * conversation.
     */
    const previousMessages =
      displayBlog?.messages || [];

    /*
     * Add the new user prompt immediately.
     */
    const conversationWhileThinking = {
      ...(displayBlog || {}),
      messages: [
        ...previousMessages,
        userMessage,
      ],
    };

    /*
     * Show the prompt + thinking animation.
     */
    setDisplayBlog(
      conversationWhileThinking
    );

    setLoading(true);
    setStatus("thinking");

    try {
      const started = Date.now();

      /*
       * Send request to backend.
       */
      const response =
        await sendMessage(
          activeBlogId,
          prompt,
          generationSettings
        );

      if (!response.success) {
        throw new Error(
          response.message ||
            response.error ||
            "Failed to generate blog."
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
       * Backend returns the updated
       * conversation.
       */
      const generatedConversation =
        response.conversation;

      /*
       * IMPORTANT:
       *
       * The backend conversation should
       * normally contain the complete
       * conversation.
       *
       * Use it directly when available.
       */
      if (
        generatedConversation &&
        Array.isArray(
          generatedConversation.messages
        )
      ) {
        setDisplayBlog(
          generatedConversation
        );

        /*
         * Save the complete conversation
         * to BlogContext/history.
         */
        addBlog(
          generatedConversation
        );
      } else {
        /*
         * Fallback:
         *
         * If the backend response does not
         * contain messages, keep the current
         * visible conversation instead of
         * clearing the screen.
         */
        setDisplayBlog(
          conversationWhileThinking
        );
      }

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

      /*
       * Keep the user's prompt and all
       * previous content visible even
       * when generation fails.
       */
      setDisplayBlog(
        conversationWhileThinking
      );

      /*
       * If there was previous content,
       * remain in the completed state.
       */
      if (
        conversationWhileThinking
          ?.messages?.length
      ) {
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
          blog={displayBlog}
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