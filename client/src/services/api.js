import axios from "axios";

import {
  auth,
} from "../firebase/firebase";

import {
  onAuthStateChanged,
} from "firebase/auth";

/* ==========================================
   API Base URL
========================================== */

/*
  Development:
  Uses localhost automatically.

  Production:
  Set VITE_API_URL in your frontend hosting
  environment variables.
*/

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/* ==========================================
   Axios Instance
========================================== */

const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

/* ==========================================
   Wait For Firebase Auth
========================================== */

const waitForUser = () => {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          resolve(user);
        }
      );
  });
};

/* ==========================================
   Attach Firebase Token
========================================== */

api.interceptors.request.use(
  async (config) => {
    try {
      const user =
        await waitForUser();

      if (user) {
        const token =
          await user.getIdToken();

        config.headers.Authorization =
          `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  (error) =>
    Promise.reject(error)
);

/* ==========================================
   Chat APIs
========================================== */

/*
  Send a message and generation settings
  to the backend.

  generationSettings:

  {
    category: "Technology",
    tone: "Professional",
    length: "1000 Words",
    language: "English"
  }
*/

export const sendMessage = async (
  conversationId,
  message,
  generationSettings = {}
) => {
  const response =
    await api.post(
      "/chat/message",
      {
        conversationId,
        message,

        generationSettings: {
          category:
            generationSettings.category ||
            "Technology",

          tone:
            generationSettings.tone ||
            "Professional",

          length:
            generationSettings.length ||
            "1000 Words",

          language:
            generationSettings.language ||
            "English",
        },
      }
    );

  return response.data;
};

/* ==========================================
   Get Conversations
========================================== */

export const getConversations =
  async () => {
    const response =
      await api.get("/chat");

    return response.data;
  };

/* ==========================================
   Get Conversation
========================================== */

export const getConversation =
  async (id) => {
    const response =
      await api.get(
        `/chat/${id}`
      );

    return response.data;
  };

/* ==========================================
   Rename Conversation
========================================== */

export const renameConversation =
  async (
    id,
    title
  ) => {
    const response =
      await api.put(
        `/chat/${id}`,
        {
          title,
        }
      );

    return response.data;
  };

/* ==========================================
   Delete Conversation
========================================== */

export const deleteConversation =
  async (id) => {
    const response =
      await api.delete(
        `/chat/${id}`
      );

    return response.data;
  };

/* ==========================================
   Clear History
========================================== */

export const clearHistory =
  async () => {
    const response =
      await api.delete(
        "/chat/clear"
      );

    return response.data;
  };

export default api;