import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Sparkles,
  Copy,
  Pencil,
  RotateCcw,
  Trash2,
  Check,
} from "lucide-react";

function ChatMessage({
  role,
  content,
  onEdit,
  onDelete,
  onRegenerate,
}) {
  const [copied, setCopied] = useState(false);

  const isUser = role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`mb-8 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`w-full max-w-4xl rounded-3xl border p-6 shadow-sm transition-all ${
          isUser
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-200 bg-white text-slate-800"
        }`}
      >
        {/* Header */}

        <div className="mb-5 flex items-center gap-3">

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              isUser
                ? "bg-blue-500"
                : "bg-blue-100"
            }`}
          >
            {isUser ? (
              <User size={18} />
            ) : (
              <Sparkles
                size={18}
                className="text-blue-600"
              />
            )}
          </div>

          <h3 className="font-semibold">
            {isUser ? "You" : "AI"}
          </h3>

        </div>

        {/* Message */}

        <div
          className={`whitespace-pre-wrap leading-8 ${
            isUser
              ? "text-blue-50"
              : "text-slate-700"
          }`}
        >
          {content}
        </div>

        {/* Toolbar */}

        <div className="mt-6 flex flex-wrap items-center gap-2">

          {/* Copy */}

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-black/5"
          >
            {copied ? (
              <Check size={16} />
            ) : (
              <Copy size={16} />
            )}

            {copied ? "Copied" : "Copy"}
          </button>

          {/* Edit */}

          {isUser && onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-black/5"
            >
              <Pencil size={16} />
              Edit
            </button>
          )}

          {/* Regenerate */}

          {!isUser && onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-black/5"
            >
              <RotateCcw size={16} />
              Regenerate
            </button>
          )}

          {/* Delete */}

          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-500 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}

        </div>

      </div>
    </motion.div>
  );
}

export default ChatMessage;