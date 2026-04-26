"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", external: false },
  { href: "/about", label: "About", external: false },
  { href: "/videos", label: "Videos", external: false },
  { href: "https://github.com/Sidneiex", label: "Lab", external: true },
  { href: "/contact", label: "Contact", external: false },
];

/* ─── Logo ─────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-1" aria-label="Sid Doshi Home">
      <span className="font-display text-xl md:text-2xl tracking-[0.1em] uppercase text-foreground leading-none transition-colors duration-300 group-hover:text-accent-400">
        Sid
      </span>
      <span className="font-display text-xl md:text-2xl tracking-[0.1em] uppercase leading-none text-accent-400 transition-opacity duration-300 group-hover:opacity-80">
        Doshi
      </span>
    </Link>
  );
}

/* ─── Navbar ───────────────────────────────────────────────── */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-foreground/5 shadow-[0_2px_40px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = !link.external && pathname === link.href;
              const isLab = link.label === "Lab";

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative py-2 transition-colors duration-300 group text-muted hover:text-foreground"
                  >
                    <span className="text-sm tracking-[0.1em] uppercase font-medium font-mono">
                      {"{ Lab }"}
                    </span>
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-cyber-400 transition-all duration-300" />
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 transition-colors duration-300 group ${
                    isActive
                      ? "text-accent-400"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <span className={`text-sm tracking-[0.1em] uppercase font-medium ${
                    isLab ? "font-mono" : ""
                  }`}>
                    {link.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
                      isActive
                        ? "w-full bg-accent-500"
                        : "w-0 group-hover:w-full bg-accent-500"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="border border-accent-500/30 px-5 py-2.5 text-accent-400 text-sm font-semibold tracking-[0.1em] uppercase rounded-lg hover:bg-accent-500 hover:text-background transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,165,116,0.15)]"
              id="nav-cta-btn"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-foreground p-3 hover:text-accent-400 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Open menu"
            id="hamburger-btn"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm z-[70] bg-surface flex flex-col md:hidden border-l border-foreground/5"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/5">
                <Logo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-muted hover:text-foreground transition-colors p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                  id="close-menu-btn"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                {navLinks.map((link, i) => {
                  const isActive = !link.external && pathname === link.href;
                  const isLab = link.label === "Lab";

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                    >
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-4 text-2xl font-mono text-xl tracking-widest uppercase border-b border-foreground/5 transition-colors duration-200 min-h-[52px] flex items-center text-muted hover:text-foreground"
                          onClick={() => setMenuOpen(false)}
                        >
                          {"{ Lab }"}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className={`block py-4 text-2xl font-display tracking-widest uppercase border-b border-foreground/5 transition-colors duration-200 min-h-[52px] flex items-center ${
                            isActive
                              ? "text-accent-400"
                              : "text-muted hover:text-foreground"
                          } ${isLab ? "font-mono text-xl" : ""}`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    className="w-full border border-accent-500/30 text-center px-6 py-4 text-accent-400 font-semibold tracking-[0.1em] uppercase rounded-lg text-sm hover:bg-accent-500 hover:text-background transition-all block min-h-[52px] flex items-center justify-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Let&apos;s Talk
                  </Link>
                </motion.div>
              </nav>

              <div className="px-6 py-6 text-sm text-muted/40 border-t border-foreground/5">
                © {new Date().getFullYear()} Sid Doshi
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
