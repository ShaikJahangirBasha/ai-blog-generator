import {
  LayoutDashboard,
  Plus,
  Search,
  FileText,
  Sparkles,
  X,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { useMemo, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useSidebar } from "../../context/SidebarContext";
import { useBlogs } from "../../context/BlogContext";

import SidebarItem from "./SidebarItem";
import ProfileCard from "./ProfileCard";
import Logo from "./Logo";
import Modal from "../Modal"; // Adjust path based on your folder structure

const menuItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const { collapsed, expandedWidth, collapsedWidth } = useSidebar();

  const {
    blogs,
    loading,
    activeBlogId,
    openBlog,
    createNewChat,
    renameBlog,
    deleteBlog,
  } = useBlogs();

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  /* ==========================================
     Chat Menu State
  ========================================== */
  const [openMenuId, setOpenMenuId] = useState(null);
  const [modalConfig, setModalConfig] = useState({ isOpen: false });
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  /* ==========================================
     Close Menu & Search on Outside Click / Escape
  ========================================== */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Ignore clicks on the trigger button itself to prevent toggle race conditions
      if (event.target.closest("[data-menu-trigger]")) {
        return;
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenMenuId(null);
        if (searchOpen) {
          setSearchOpen(false);
          setSearch("");
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  /* ==========================================
     Close Menu On Scroll
  ========================================== */
  useEffect(() => {
    if (!openMenuId) return;

    const handleScroll = () => setOpenMenuId(null);

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [openMenuId]);

  /* ==========================================
     Filter Chats
  ========================================== */
  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return blogs;

    return blogs.filter((blog) =>
      blog.title?.toLowerCase().includes(query)
    );
  }, [blogs, search]);

  /* ==========================================
     Search Toggle
  ========================================== */
  const handleSearchToggle = () => {
    if (collapsed) return;

    setSearchOpen((prev) => !prev);
    if (searchOpen) setSearch("");
  };

  /* ==========================================
     New Chat
  ========================================== */
  const handleNewChat = () => {
    createNewChat();
    navigate("/generate");
    setOpenMenuId(null);

    if (searchOpen) {
      setSearchOpen(false);
      setSearch("");
    }
  };

  /* ==========================================
     Open Blog
  ========================================== */
  const handleOpenBlog = (id) => {
    setOpenMenuId(null);
    openBlog(id);

    if (searchOpen) {
      setSearchOpen(false);
      setSearch("");
    }
  };

  /* ==========================================
     Open Chat Menu
  ========================================== */
  const handleOpenMenu = (event, blogId) => {
    event.stopPropagation();

    if (openMenuId === blogId) {
      setOpenMenuId(null);
      return;
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const menuWidth = 160;
    const menuHeight = 90;
    const gap = 6;

    let left = rect.right - menuWidth;
    let top = rect.bottom + gap;

    if (left < 8) left = 8;
    if (left + menuWidth > window.innerWidth - 8) {
      left = window.innerWidth - menuWidth - 8;
    }

    if (top + menuHeight > window.innerHeight - 8) {
      top = rect.top - menuHeight - gap;
    }

    setMenuPosition({ top, left });
    setOpenMenuId(blogId);
  };

  /* ==========================================
     Rename & Delete Actions (Using Custom Modal)
  ========================================== */
  const handleRenameBlog = (blog) => {
    setOpenMenuId(null); // Close the small dropdown menu

    setModalConfig({
      isOpen: true,
      type: "prompt",
      title: "Rename Conversation",
      initialValue: blog.title,
      confirmText: "Save Changes",
      isDanger: false,
      onConfirm: async (newTitle) => {
        if (newTitle && newTitle !== blog.title) {
          await renameBlog(blog._id, newTitle);
        }
      },
    });
  };

  const handleDeleteBlog = (blog) => {
    setOpenMenuId(null); // Close the small dropdown menu

    setModalConfig({
      isOpen: true,
      type: "confirm",
      title: "Delete Conversation",
      message: `Are you sure you want to delete "${blog.title}"? This action cannot be undone.`,
      confirmText: "Delete",
      isDanger: true,
      onConfirm: async () => {
        await deleteBlog(blog._id);
      },
    });
  };

  /* ==========================================
     Render Chat Menu (Portal)
  ========================================== */
  const selectedBlog = blogs.find((blog) => blog._id === openMenuId);

  const renderChatMenu = () => {
    return createPortal(
      <AnimatePresence>
        {openMenuId && selectedBlog && (
          <motion.div
            key={openMenuId}
            ref={menuRef}
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="fixed z-[99999] w-40 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-2xl shadow-black/40"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
          >
            {/* Rename Button */}
            <button
              type="button"
              onClick={() => handleRenameBlog(selectedBlog)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              <Pencil size={15} />
              <span>Rename</span>
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleDeleteBlog(selectedBlog)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 size={15} />
              <span>Delete</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <>
      <aside
        className="relative flex h-screen flex-col overflow-hidden border-r border-slate-800 bg-slate-950 transition-all duration-300"
        style={{
          width: collapsed ? collapsedWidth : expandedWidth,
        }}
      >
        {/* Header / Logo */}
        <div className="relative">
          <Logo />

          {!collapsed && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleSearchToggle}
              aria-label={searchOpen ? "Close search" : "Search chats"}
              title={searchOpen ? "Close search" : "Search chats"}
              className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 ${
                searchOpen
                  ? "border-blue-500/40 bg-blue-600/10 text-blue-400"
                  : "border-transparent text-slate-500 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {searchOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Search size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>

        {/* New Chat Button */}
        <div className="px-4 pt-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewChat}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/10 transition duration-200 hover:bg-blue-700 hover:shadow-blue-600/20"
          >
            <Plus size={20} />
            {!collapsed && <span>New Chat</span>}
          </motion.button>
        </div>

        {/* Search Input Bar */}
        {!collapsed && (
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden px-4"
              >
                <div className="pt-4">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 transition focus-within:border-blue-500/50">
                    <Search size={17} className="flex-shrink-0 text-slate-500" />
                    <input
                      autoFocus
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search chats..."
                      className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
                        aria-label="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Navigation & Chat History */}
        <nav className="mt-5 flex-1 overflow-y-auto px-3 pb-5">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <SidebarItem key={item.to} {...item} />
            ))}
          </div>

          {!collapsed && (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-500" />
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Recent Chats
                  </h3>
                </div>

                <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-400">
                  {filteredBlogs.length}
                </span>
              </div>

              {loading ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center text-sm text-slate-500">
                  Loading conversations...
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 p-5 text-center">
                  <FileText size={22} className="mx-auto mb-3 text-slate-600" />
                  <p className="text-sm text-slate-500">
                    {search ? "No conversations found" : "No conversations yet"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredBlogs.map((blog) => (
                    <motion.div
                      key={blog._id}
                      whileHover={{ x: 4 }}
                      className={`group relative w-full rounded-2xl border transition-all duration-300 ${
                        activeBlogId === blog._id
                          ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "border-transparent bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-800"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleOpenBlog(blog._id)}
                        className="w-full rounded-2xl px-4 py-3 pr-12 text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 rounded-lg p-2 ${
                              activeBlogId === blog._id
                                ? "bg-white/20"
                                : "bg-slate-800 group-hover:bg-slate-700"
                            }`}
                          >
                            <FileText size={15} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4
                              className={`truncate text-sm font-semibold ${
                                activeBlogId === blog._id
                                  ? "text-white"
                                  : "text-slate-200"
                              }`}
                            >
                              {blog.title}
                            </h4>

                            <p
                              className={`mt-1 truncate text-xs ${
                                activeBlogId === blog._id
                                  ? "text-blue-100"
                                  : "text-slate-500"
                              }`}
                            >
                              {new Date(
                                blog.updatedAt || blog.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* Added data-menu-trigger attribute to fix outside click bug */}
                      <motion.button
                        data-menu-trigger={blog._id}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        onClick={(event) => handleOpenMenu(event, blog._id)}
                        aria-label="Chat options"
                        className={`absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
                          openMenuId === blog._id
                            ? activeBlogId === blog._id
                              ? "bg-white/20 text-white opacity-100"
                              : "bg-slate-700 text-white opacity-100"
                            : activeBlogId === blog._id
                            ? "text-blue-100 opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:text-white"
                            : "text-slate-500 opacity-0 group-hover:opacity-100 hover:bg-slate-700 hover:text-slate-200"
                        }`}
                      >
                        <MoreVertical size={18} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        <ProfileCard />
      </aside>

      {renderChatMenu()}
      <Modal
        {...modalConfig}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </>
  );
}

export default Sidebar;