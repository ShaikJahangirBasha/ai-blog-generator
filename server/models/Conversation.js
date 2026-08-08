import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    edited: {
      type: Boolean,
      default: false,
    },

    regenerated: {
      type: Boolean,
      default: false,
    },

    copied: {
      type: Number,
      default: 0,
    },

    tokens: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  }
);

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
      default: "New Chat",
    },

    messages: {
      type: [messageSchema],
      default: [],
    },

    model: {
      type: String,
      default: "gemini-2.5-flash",
    },

    totalTokens: {
      type: Number,
      default: 0,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/* =======================================
   Indexes
======================================= */

conversationSchema.index({
  user: 1,
  updatedAt: -1,
});

conversationSchema.index({
  title: "text",
});

/* =======================================
   Auto Update Last Message Time
======================================= */

conversationSchema.pre("save", function (next) {
  this.lastMessageAt = new Date();
  next();
});

const Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);

export default Conversation;