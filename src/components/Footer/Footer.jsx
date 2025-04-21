import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-zinc-800 text-gray-300 px-6 py-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Socials */}
        <div className="flex gap-6 text-2xl justify-center">
          <a
            href="https://github.com/Pardeep404"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/pardeep0793/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Brand */}
        <div className="text-center md:text-left">
          <p className="text-sm mt-1 text-gray-300">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
