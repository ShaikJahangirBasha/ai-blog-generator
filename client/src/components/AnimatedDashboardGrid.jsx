import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Sparkles, FileText, Code, Briefcase, Send, ArrowRight } from "lucide-react";

// Sample Prompt Data
const promptCards = [
  {
    id: "blog",
    icon: Sparkles,
    title: "Write a Blog",
    description: "Generate detailed, engaging blogs about Artificial Intelligence.",
    promptText: "Write a detailed, engaging blog post about Artificial Intelligence trends.",
    gradientLight: "from-purple-500/10 to-pink-500/10",
    gradientDark: "dark:from-purple-500/20 dark:to-pink-500/20",
    borderGlow: "hover:border-purple-500/50 dark:hover:border-purple-400/50",
  },
  {
    id: "seo",
    icon: FileText,
    title: "SEO Article",
    description: "Create an optimized, high-ranking article about modern React.",
    promptText: "Create an SEO-optimized article about building scalable React applications with Vite.",
    gradientLight: "from-blue-500/10 to-cyan-500/10",
    gradientDark: "dark:from-blue-500/20 dark:to-cyan-500/20",
    borderGlow: "hover:border-blue-500/50 dark:hover:border-blue-400/50",
  },
  {
    id: "tutorial",
    icon: Code,
    title: "Tutorial",
    description: "Explain complex JavaScript Promises with real-world examples.",
    promptText: "Explain JavaScript Promises and Async/Await with practical real-world code examples.",
    gradientLight: "from-emerald-500/10 to-teal-500/10",
    gradientDark: "dark:from-emerald-500/20 dark:to-teal-500/20",
    borderGlow: "hover:border-emerald-500/50 dark:hover:border-emerald-400/50",
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Business Plan",
    description: "Draft a comprehensive startup business execution plan.",
    promptText: "Draft a comprehensive startup business execution plan for a SaaS platform.",
    gradientLight: "from-amber-500/10 to-orange-500/10",
    gradientDark: "dark:from-amber-500/20 dark:to-orange-500/20",
    borderGlow: "hover:border-amber-500/50 dark:hover:border-amber-400/50",
  },
];

// Interactive Theme-Aware 3D Card
const Card3D = ({ card, onSelect }) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = card.icon;

  return (
    <div className="perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(card.promptText)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative flex flex-col justify-between p-6 h-48 rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${card.borderGlow}`}
      >
        {/* Dynamic Light/Dark Specular Reflection */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${card.gradientLight} ${card.gradientDark} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} 
        />

        {/* Card Content */}
        <div style={{ transform: "translateZ(25px)" }} className="relative z-10 flex flex-col gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center border border-slate-200 dark:border-white/15 backdrop-blur-md shadow-sm">
            <IconComponent className="w-6 h-6 text-slate-800 dark:text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">{card.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{card.description}</p>
          </div>
        </div>

        {/* Hover Cue */}
        <div style={{ transform: "translateZ(15px)" }} className="relative z-10 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          <span>Click to populate</span>
          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </motion.div>
    </div>
  );
};

export default function AnimatedDashboardGrid() {
  const [promptInput, setPromptInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSelectPrompt = (text) => {
    setPromptInput(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    console.log("Submitting prompt:", promptInput);
    setPromptInput("");
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden bg-transparent">
      {/* Subtle Ambient Background Glows that adapt to light/dark themes */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      {/* Main Container */}
      <div className="max-w-4xl w-full z-10 space-y-8 my-auto">
        <header className="text-center space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            AI Blog Generator
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-lg mx-auto"
          >
            Generate professional blogs, articles, and content powered by AI.
          </motion.p>
        </header>

        {/* 3D Prompt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {promptCards.map((card) => (
            <Card3D key={card.id} card={card} onSelect={handleSelectPrompt} />
          ))}
        </div>
      </div>

      {/* Theme-Adaptive Chat Input Bar */}
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`max-w-3xl w-full z-20 relative mt-6 rounded-2xl backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border transition-all duration-300 shadow-xl ${
          isFocused 
            ? "border-purple-500 dark:border-purple-400 ring-4 ring-purple-500/10 dark:ring-purple-400/20" 
            : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
        }`}
      >
        <div className="relative flex items-center p-2 md:p-3">
          <textarea
            ref={inputRef}
            rows={2}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask AI to write anything... or click a starter prompt above"
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm md:text-base px-3 py-1 focus:outline-none resize-none font-medium"
            maxLength={2000}
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-3">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              {promptInput.length}/2000
            </span>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!promptInput.trim()}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                promptInput.trim() 
                  ? "bg-purple-600 dark:bg-gradient-to-r dark:from-purple-500 dark:to-blue-500 text-white shadow-md shadow-purple-500/20 cursor-pointer" 
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}