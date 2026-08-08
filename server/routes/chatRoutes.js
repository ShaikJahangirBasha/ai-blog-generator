import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  sendMessage,
  getConversations,
  getConversation,
  renameConversation,
  deleteConversation,
  clearHistory,
} from "../controllers/chatController.js";

const router = express.Router();

/* ==========================================
   Protected Chat Routes
========================================== */

router.use(authMiddleware);

/* ==========================================
   Chat
========================================== */

// Create conversation / Continue conversation
router.post("/message", sendMessage);

// Get all conversations
router.get("/", getConversations);

// Get single conversation
router.get("/:id", getConversation);

// Rename conversation
router.put("/:id", renameConversation);
// Clear all conversations
router.delete("/clear", clearHistory);

// Delete conversation
router.delete("/:id", deleteConversation);

export default router;