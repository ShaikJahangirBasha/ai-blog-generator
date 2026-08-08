import Conversation from "../models/Conversation.js";
import generateAIResponse from "../services/geminiService.js";

/* ==========================================
   Send Message
========================================== */

export const sendMessage = async (req, res) => {
  try {
    const {
      conversationId,
      message,
      generationSettings = {},
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    /* ========================================
       Generation Settings
    ======================================== */

    const {
      category = "Technology",
      tone = "Professional",
      length = "1000 Words",
      language = "English",
    } = generationSettings;

    let conversation;

    /* ========================================
       Find Existing Conversation
    ======================================== */

    if (conversationId) {
      conversation =
        await Conversation.findOne({
          _id: conversationId,
          user: req.user._id,
        });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message:
            "Conversation not found.",
        });
      }
    } else {
      /* ======================================
         Create New Conversation
      ====================================== */

      conversation =
        await Conversation.create({
          user: req.user._id,

          title:
            message.length > 60
              ? message.substring(0, 60) +
                "..."
              : message,

          messages: [],
        });
    }

    /* ========================================
       Add User Message
    ======================================== */

    conversation.messages.push({
      role: "user",
      content: message,
      createdAt: new Date(),
    });

    /* ========================================
       Generate AI Response
    ======================================== */

    const ai =
      await generateAIResponse(
        conversation.messages,
        {
          category,
          tone,
          length,
          language,
        }
      );

    if (!ai.success) {
      return res.status(500).json({
        success: false,
        message: ai.error,
      });
    }

    /* ========================================
       Add AI Message
    ======================================== */

    conversation.messages.push({
      role: "assistant",
      content: ai.text,
      createdAt: new Date(),
    });

    conversation.updatedAt =
      new Date();

    await conversation.save();

    /* ========================================
       Response
    ======================================== */

    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error(
      "Chat Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get All Conversations
========================================== */

export const getConversations = async (
  req,
  res
) => {
  try {
    const conversations =
      await Conversation.find({
        user: req.user._id,
      }).sort({
        updatedAt: -1,
      });

    res.json({
      success: true,
      conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get One Conversation
========================================== */

export const getConversation = async (
  req,
  res
) => {
  try {
    const conversation =
      await Conversation.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message:
          "Conversation not found.",
      });
    }

    res.json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Rename Conversation
========================================== */

export const renameConversation =
  async (req, res) => {
    try {
      const conversation =
        await Conversation.findOneAndUpdate(
          {
            _id: req.params.id,
            user: req.user._id,
          },
          {
            title: req.body.title,
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        conversation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/* ==========================================
   Delete Conversation
========================================== */

export const deleteConversation =
  async (req, res) => {
    try {
      await Conversation.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      res.json({
        success: true,
        message:
          "Conversation deleted successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/* ==========================================
   Clear All Conversations
========================================== */

export const clearHistory = async (
  req,
  res
) => {
  try {
    await Conversation.deleteMany({
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message:
        "All conversations deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Clear History Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};