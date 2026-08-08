import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
      minlength: 6,
    },

    googleId: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default: "",
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    subscription: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },

    usage: {
      chats: {
        type: Number,
        default: 0,
      },

      prompts: {
        type: Number,
        default: 0,
      },

      tokens: {
        type: Number,
        default: 0,
      },
    },

    preferences: {
      model: {
        type: String,
        default: "gemini-2.5-flash",
      },

      theme: {
        type: String,
        default: "light",
      },

      markdown: {
        type: Boolean,
        default: true,
      },
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* ==========================================
   Password Hash
========================================== */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/* ==========================================
   Compare Password
========================================== */

userSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;