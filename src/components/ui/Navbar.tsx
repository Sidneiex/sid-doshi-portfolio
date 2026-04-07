"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { X, Menu, Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/photos", label: "Photos" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
];

/* ─── Dock Item ────────────────────────────────────────────── */
function DockItem({
  href,
  label,
  isActive,
  mouseX,
  index,
}: {
  href: string;
  label: string;
  isActive: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current || val === -1) return 150;
    const bounds = ref.current.getBoundingClientRect();
    const center = bounds.x + bounds.width / 2;
    return Math.abs(val - center);
  });

  const scale = useTransform(distance, [0, 120], [1.25, 1]);
  const springScale = useSpring(scale, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.div style={{ scale: springScale }} className="relative">
      <Link
        ref={ref}
        href={href}
        className={`relative py-2 px-1 transition-colors duration-300 group block ${
          isActive ? "text-accent-500" : "text-muted hover:text-foreground"
        }`}
      >
        <span className="text-xs tracking-[0.15em] uppercase font-semibold whitespace-nowrap">
          {label}
        </span>
        <span
          className={`absolute bottom-0 left-0 h-[2px] bg-accent-500 transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>
    </motion.div>
  );
}

/* ─── Theme Toggle ─────────────────────────────────────────── */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center text-muted hover:text-accent-500 hover:border-accent-500/40 transition-all duration-300"
      aria-label="Toggle theme"
      id="theme-toggle-btn"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}

/* ─── Logo ─────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-1" aria-label="Sid Doshi Home">
      <span className="font-display text-2xl md:text-3xl tracking-[0.15em] uppercase text-foreground leading-none transition-colors duration-300 group-hover:text-accent-500">
        Sid
      </span>
      <span className="font-display text-2xl md:text-3xl tracking-[0.15em] uppercase leading-none text-accent-500 transition-opacity duration-300 group-hover:opacity-80">
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
  const mouseX = useMotionValue(-1);

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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => mouseX.set(e.clientX),
    [mouseX]
  );

  const handleMouseLeave = useCallback(() => mouseX.set(-1), [mouseX]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-foreground/5 shadow-[0_2px_40px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <Logo />

          {/* Desktop — Dock-style nav */}
          <div
            className="hidden md:flex items-center gap-6"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {navLinks.map((link, i) => (
              <DockItem
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
                mouseX={mouseX}
                index={i}
              />
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="border border-accent-500/40 px-5 py-2 text-accent-500 text-xs font-bold tracking-[0.15em] uppercase rounded hover:bg-accent-500 hover:text-background transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,68,51,0.3)]"
              id="nav-cta-btn"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-foreground p-2 hover:text-accent-500 transition-colors"
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm z-[70] bg-surface flex flex-col md:hidden border-l border-foreground/5"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-foreground/5">
                <Logo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-muted hover:text-foreground transition-colors p-2"
                  aria-label="Close menu"
                  id="close-menu-btn"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col px-6 py-10 gap-1 flex-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-4 text-2xl font-display tracking-widest uppercase border-b border-foreground/5 transition-colors duration-200 ${
                          isActive
                            ? "text-accent-500"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex items-center gap-4"
                >
                  <ThemeToggle />
                  <Link
                    href="/contact"
                    className="flex-1 border border-accent-500/40 text-center px-6 py-3 text-accent-500 font-bold tracking-[0.15em] uppercase rounded text-sm hover:bg-accent-500 hover:text-background transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Let&apos;s Talk
                  </Link>
                </motion.div>
              </nav>

              <div className="px-6 py-6 text-xs text-muted/40 border-t border-foreground/5">
                © {new Date().getFullYear()} Sid Doshi
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
