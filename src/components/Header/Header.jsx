import React, { useState } from "react";
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleNavClick = (slug) => {
    navigate(slug);
    setMenuOpen(false); // Close mobile menu
  };

  return (
    <header className="bg-zinc-800 text-gray-300 shadow-md py-3 sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-wide text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              BLOG
            </span>
            <span className="text-yellow-300">SPHERE</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.slug)}
                      className="px-4 py-2 rounded-full font-medium bg-zinc-800 text-gray-300 transition duration-300 hover:text-zinc-800 hover:bg-gray-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden mt-3 flex flex-col gap-2 bg-zinc-800 text-gray-300 p-4 rounded-lg shadow-lg">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.slug)}
                      className="w-full text-left px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-yellow-400 hover:text-indigo-800 transition duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
