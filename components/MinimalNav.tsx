"use client";

import { useState, useEffect, useRef } from "react";

const links = [
  { label: "Collection", href: "#collection" },
  { label: "Brands", href: "#brands" },
  { label: "Showroom", href: "#showroom" },
  { label: "Contact", href: "#contact" },
];

export default function MinimalNav() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => {
      const sections = document.querySelectorAll("[data-nav-theme]");
      const navBottom = 64;

      let currentTheme = "light";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navBottom && rect.bottom > navBottom) {
          currentTheme = section.getAttribute("data-nav-theme") || "light";
          break;
        }
      }
      setDark(currentTheme === "dark");
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const textColor = dark ? "text-neutral-900" : "text-white";
  const iconColor = dark ? "#111" : "#fff";

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 bg-transparent transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-md"
      >
        <a
          href="/"
          className={`text-sm font-medium tracking-tight transition-colors duration-300 ${textColor}`}
        >
          Expo Home
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm tracking-tight transition-all duration-300 hover:opacity-60 ${textColor}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-1"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col">
          <div className="h-16 flex items-center justify-between px-6">
            <a
              href="/"
              className="text-sm font-medium tracking-tight text-white"
              onClick={() => setMenuOpen(false)}
            >
              Expo Home
            </a>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl text-white font-light tracking-tight hover:opacity-60 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
