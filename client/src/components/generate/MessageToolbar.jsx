import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  RotateCcw,
  Pencil,
  Trash2,
} from "lucide-react";

function MessageToolbar({
  content = "",
  isUser = false,
  onEdit,
  onDelete,
  onRegenerate,
}) {
  const [copied, setCopied] = useState(false);

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
    <div className="mt-5 flex flex-wrap items-center gap-2">

      {/* Copy */}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          py-2
          text-sm
          transition
          hover:bg-slate-100
        "
      >
        {copied ? (
          <>
            <Check size={16} />
            Copied
          </>
        ) : (
          <>
            <Copy size={16} />
            Copy
          </>
        )}
      </motion.button>

      {/* Edit */}

      {isUser && onEdit && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-sm
            transition
            hover:bg-slate-100
          "
        >
          <Pencil size={16} />
          Edit
        </motion.button>
      )}

      {/* Regenerate */}

      {!isUser && onRegenerate && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRegenerate}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-sm
            transition
            hover:bg-slate-100
          "
        >
          <RotateCcw size={16} />
          Regenerate
        </motion.button>
      )}

      {/* Delete */}

      {onDelete && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-3
            py-2
            text-sm
            text-red-600
            transition
            hover:bg-red-100
          "
        >
          <Trash2 size={16} />
          Delete
        </motion.button>
      )}

    </div>
  );
}

export default MessageToolbar;