import { FileText, MoreHorizontal } from "lucide-react";
import { NavLink } from "react-router-dom";

function WorkspaceItem({
  id,
  title,
  time,
  active = false,
}) {
  return (
    <NavLink
      to={`/blog/${id}`}
      className={`
        group
        flex
        items-start
        justify-between
        gap-3
        rounded-xl
        px-3
        py-3
        transition-all
        duration-200

        ${
          active
            ? "bg-slate-800"
            : "hover:bg-slate-800/70"
        }
      `}
    >
      <div className="flex gap-3 flex-1 min-w-0">

        <FileText
          size={18}
          className="mt-1 text-slate-400 shrink-0"
        />

        <div className="min-w-0">

          <h4
            className="
              text-sm
              text-white
              font-medium
              truncate
            "
          >
            {title}
          </h4>

          <p
            className="
              text-xs
              text-slate-400
              mt-1
            "
          >
            {time}
          </p>

        </div>

      </div>

      <button
        className="
          opacity-0
          group-hover:opacity-100
          transition
          p-1
          rounded-lg
          hover:bg-slate-700
        "
      >
        <MoreHorizontal
          size={16}
          className="text-slate-400"
        />
      </button>

    </NavLink>
  );
}

export default WorkspaceItem;