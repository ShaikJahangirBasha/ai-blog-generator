import { Search } from "lucide-react";

function WorkspaceSearch({ value, onChange }) {
  return (
    <div className="px-3 py-3 border-b border-slate-800">
      <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-3 h-11">
        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search workspace..."
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm
            text-white
            placeholder:text-slate-500
          "
        />
      </div>
    </div>
  );
}

export default WorkspaceSearch;