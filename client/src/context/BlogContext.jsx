import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import {
  getConversations,
  getConversation,
  renameConversation,
  deleteConversation,
} from "../services/api";

const BlogContext = createContext();

export function BlogProvider({
  children,
}) {
  const [blogs, setBlogs] =
    useState([]);

  const [activeBlogId, setActiveBlogId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /* ===========================================
     Load Conversations
  =========================================== */

  const loadBlogs = useCallback(
    async () => {
      try {
        setLoading(true);

        const response =
          await getConversations();

        if (!response.success) {
          return;
        }

        /*
         * Load all previous conversations
         * into the Recent Chats list.
         *
         * IMPORTANT:
         * We intentionally DO NOT open any
         * previous conversation here.
         *
         * Every fresh page load starts with
         * a completely new chat.
         */

        setBlogs(
          response.conversations
        );

        setActiveBlogId(null);
      } catch (err) {
        console.error(
          "Load Conversations Error:",
          err
        );

        /*
         * Even if loading conversations
         * fails, keep the workspace in
         * New Chat mode.
         */

        setActiveBlogId(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  /* ===========================================
     Create New Chat
  =========================================== */

  const createNewChat = () => {
    /*
     * null means there is currently
     * no selected conversation.
     *
     * GenerateBlog will therefore show
     * the welcome / New Chat screen.
     */

    setActiveBlogId(null);
  };

  /* ===========================================
     Open Conversation
  =========================================== */

  const openBlog = async (id) => {
    try {
      if (!id) {
        return;
      }

      /*
       * If the requested conversation is
       * already open, nothing needs to happen.
       */

      if (id === activeBlogId) {
        return;
      }

      const response =
        await getConversation(id);

      if (!response.success) {
        return;
      }

      /*
       * Update the conversation inside
       * the existing blogs list.
       */

      setBlogs((prev) =>
        prev.map((chat) =>
          chat._id === id
            ? response.conversation
            : chat
        )
      );

      /*
       * Only clicking an existing chat
       * changes the active conversation.
       */

      setActiveBlogId(id);
    } catch (error) {
      console.error(
        "Open Conversation Error:",
        error
      );
    }
  };

  /* ===========================================
     Add / Update Conversation
  =========================================== */

  const addBlog = (
    conversation
  ) => {
    setBlogs((prev) => {
      const exists =
        prev.find(
          (item) =>
            item._id ===
            conversation._id
        );

      if (exists) {
        return prev.map((item) =>
          item._id ===
          conversation._id
            ? conversation
            : item
        );
      }

      return [
        conversation,
        ...prev,
      ];
    });

    /*
     * After generating the first message,
     * automatically open the newly-created
     * conversation.
     */

    setActiveBlogId(
      conversation._id
    );
  };

  /* ===========================================
     Reload Conversations
  =========================================== */

  const reloadBlogs = async () => {
    await loadBlogs();
  };

  /* ===========================================
     Rename Conversation
  =========================================== */

  const renameBlog = async (
    id,
    title
  ) => {
    try {
      const response =
        await renameConversation(
          id,
          title
        );

      if (!response.success) {
        return;
      }

      setBlogs((prev) =>
        prev.map((chat) =>
          chat._id === id
            ? response.conversation
            : chat
        )
      );
    } catch (error) {
      console.error(
        "Rename Conversation Error:",
        error
      );
    }
  };

  /* ===========================================
     Delete Conversation
  =========================================== */

  const deleteBlog = async (
    id
  ) => {
    try {
      await deleteConversation(id);

      const updatedBlogs =
        blogs.filter(
          (chat) =>
            chat._id !== id
        );

      setBlogs(updatedBlogs);

      /*
       * If the deleted conversation
       * was currently open, return to
       * a completely new chat.
       */

      if (activeBlogId === id) {
        setActiveBlogId(null);
      }
    } catch (error) {
      console.error(
        "Delete Conversation Error:",
        error
      );
    }
  };

  /* ===========================================
     Active Conversation
  =========================================== */

  const activeBlog =
    useMemo(() => {
      return (
        blogs.find(
          (chat) =>
            chat._id ===
            activeBlogId
        ) || null
      );
    }, [
      blogs,
      activeBlogId,
    ]);

  /* ===========================================
     Provider
  =========================================== */

  return (
    <BlogContext.Provider
      value={{
        /* State */

        blogs,
        loading,
        activeBlog,
        activeBlogId,

        /* Conversation */

        addBlog,
        openBlog,
        createNewChat,

        /* CRUD */

        renameBlog,
        deleteBlog,

        /* Utilities */

        reloadBlogs,
        setActiveBlogId,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

/* ===========================================
   Hook
=========================================== */

export function useBlogs() {
  const context =
    useContext(BlogContext);

  if (!context) {
    throw new Error(
      "useBlogs must be used inside BlogProvider."
    );
  }

  return context;
}