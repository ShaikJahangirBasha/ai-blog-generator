import { Navigate } from "react-router-dom";
import { PenSquare, Sparkles, ArrowRight } from "lucide-react";

import useAuth from "../hooks/useAuth";
import GoogleButton from "../components/auth/GoogleButton";

function LandingPage() {
  const { isAuthenticated } = useAuth();

  // If already logged in, go directly to dashboard
  if (isAuthenticated) {
    return <Navigate to="/generate" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* ================= Navbar ================= */}

      <nav className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">

            <PenSquare size={24} />

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              AI Blog Generator
            </h1>

            <p className="text-sm text-slate-400">
              AI Powered Writing Platform
            </p>

          </div>

        </div>

        <div className="hidden md:block">

          <GoogleButton />

        </div>

      </nav>

      {/* ================= Hero ================= */}

      <section className="flex flex-col items-center justify-center text-center px-6 py-20">

        <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-8">

          <Sparkles
            size={42}
            className="text-blue-500"
          />

        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl">

          Create Amazing
          <span className="text-blue-500"> AI Blogs </span>

          in Seconds

        </h1>

        <p className="mt-8 max-w-3xl text-lg text-slate-400 leading-8">

          Generate SEO optimized blogs using Artificial Intelligence.

          Organize them in your personal workspace.

          Edit, export and access them anytime.

        </p>

        {/* Google Login */}

        <div className="mt-12 w-full max-w-sm">

          <GoogleButton />

        </div>

        {/* Features */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-6xl">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-xl font-semibold">

              🚀 AI Powered

            </h3>

            <p className="text-slate-400 mt-3">

              Generate high-quality blogs in seconds.

            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-xl font-semibold">

              📂 Workspace

            </h3>

            <p className="text-slate-400 mt-3">

              ChatGPT-style history with search and organization.

            </p>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-xl font-semibold">

              📄 Export

            </h3>

            <p className="text-slate-400 mt-3">

              Download blogs as PDF or copy with one click.

            </p>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-20">

          <button
            className="
              flex
              items-center
              gap-3
              px-8
              py-4
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              transition
              font-semibold
            "
          >
            Get Started

            <ArrowRight size={20} />

          </button>

        </div>

      </section>

    </div>
  );
}

export default LandingPage;