import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
} from "lucide-react";

function EditablePrompt({
  initialValue,
  onSave,
  onCancel,
}) {
  const [value, setValue] = useState(initialValue);

  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSave = () => {
    const text = value.trim();

    if (!text) return;

    onSave(text);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 15,
      }}
      className="
        mt-3
        rounded-2xl
        border
        border-blue-200
        bg-white
        p-5
        shadow-lg
      "
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
        rows={5}
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-slate-200
          p-4
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
      />

      <div className="mt-4 flex justify-end gap-3">

        <button
          onClick={onCancel}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            transition
            hover:bg-slate-100
          "
        >
          <X size={16} />
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-2
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Check size={16} />
          Save
        </button>

      </div>
    </motion.div>
  );
}

export default EditablePrompt;