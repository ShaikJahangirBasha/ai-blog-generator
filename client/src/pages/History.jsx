import { Eye, Trash2, Copy } from "lucide-react";

const blogs = [];

function History() {
  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Blog History
        </h1>

        <p className="text-gray-500 mt-2">
          View all previously generated blogs.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Empty State */}
      {blogs.length === 0 ? (
        <div className="bg-white rounded-xl border shadow-sm p-12 text-center">

          <h2 className="text-xl font-semibold">
            No Blogs Found
          </h2>

          <p className="text-gray-500 mt-2">
            Generate your first AI blog to see it here.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white border rounded-xl p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{blog.title}</h3>

                <p className="text-gray-500 text-sm">
                  {blog.date}
                </p>
              </div>

              <div className="flex gap-3">

                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                  <Eye size={18} />
                </button>

                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                  <Copy size={18} />
                </button>

                <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600">
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default History;