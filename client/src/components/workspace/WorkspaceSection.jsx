import WorkspaceItem from "./WorkspaceItem";

function WorkspaceSection({
  title,
  items = [],
}) {
  if (!items.length) return null;

  return (
    <section className="mb-6">

      {/* Section Heading */}

      <h3
        className="
          px-3
          mb-2
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-slate-500
        "
      >
        {title}
      </h3>

      {/* Blog Items */}

      <div className="space-y-1">

        {items.map((blog) => (
          <WorkspaceItem
            key={blog.id}
            id={blog.id}
            title={blog.title}
            time={blog.time}
          />
        ))}

      </div>

    </section>
  );
}

export default WorkspaceSection;