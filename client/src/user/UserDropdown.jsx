import {
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function UserDropdown({
  open,
  onClose,
}) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div
      className="
        absolute
        right-0
        top-16
        w-72
        rounded-2xl
        bg-white
        border
        border-slate-200
        shadow-2xl
        overflow-hidden
        z-50
        animate-in
        fade-in
        slide-in-from-top-2
        duration-200
      "
    >
      {/* Header */}

      <div className="px-5 py-4 border-b border-slate-200">

        <p className="text-lg font-semibold">
          Account
        </p>

        <p className="text-sm text-slate-500">
          Manage your profile
        </p>

      </div>

      {/* Menu */}

      <button
        onClick={() => {
          navigate("/profile");
          onClose();
        }}
        className="
          w-full
          flex
          items-center
          gap-3
          px-5
          py-4
          hover:bg-slate-100
          transition
        "
      >
        <User size={19} />

        My Profile
      </button>

      <button
        onClick={() => {
          navigate("/settings");
          onClose();
        }}
        className="
          w-full
          flex
          items-center
          gap-3
          px-5
          py-4
          hover:bg-slate-100
          transition
        "
      >
        <Settings size={19} />

        Settings
      </button>

      <div className="border-t border-slate-200" />

      <button
        onClick={handleLogout}
        className="
          w-full
          flex
          items-center
          gap-3
          px-5
          py-4
          text-red-600
          hover:bg-red-50
          transition
        "
      >
        <LogOut size={19} />

        Logout
      </button>

    </div>
  );
}

export default UserDropdown;