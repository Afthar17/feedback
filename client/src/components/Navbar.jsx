import { useState } from "react";
import logo from "../assets/logo.png";
import { motion } from "motion/react";
import { MenuIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const Navbar = () => {
  const { user, logOut } = useUserStore();
  const [navOpen, setNavOpen] = useState(false);
  return (
    <header className="bg-[#4C4C4C] text-white">
      {/* centered content */}
      <div className=" mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-6 h-6" />
          <span className="font-bold text-xl md:text-2xl">UNIWELL</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10 font-semibold text-sm">
          {user && <Link to="/">Home</Link>}

          {user ? (
            <button
              className="hover:text-gray-300 transition"
              onClick={() => logOut()}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setNavOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {navOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#011936] flex flex-col items-center justify-center"
        >
          {/* close icon */}
          <button
            className="absolute top-4 right-4"
            onClick={() => setNavOpen(false)}
          >
            <X />
          </button>

          {/* mobile links */}
          <div className="flex flex-col gap-6 text-lg font-semibold text-center">
            {user && (
              <Link
                to="/"
                onClick={() => setNavOpen(false)}
                className="hover:text-gray-300"
              >
                Home
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  logOut();
                  setNavOpen(false);
                }}
                className="hover:text-gray-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setNavOpen(false)}
                className="hover:text-gray-300"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
