import { Globe } from "lucide-react";
import useAuth from "../../hooks/useAuth";

function GoogleButton() {
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="
        w-full
        h-14
        rounded-2xl
        bg-white
        border
        border-slate-300
        hover:bg-slate-100
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-3
        font-semibold
        text-slate-800
      "
    >
      <Globe
        size={22}
        className="text-blue-600"
      />

      Continue with Google
    </button>
  );
}

export default GoogleButton;