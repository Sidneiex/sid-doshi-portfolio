import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/photos", label: "Photos" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
];

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://www.instagram.com/the.sid.doshi", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.linkedin.com/in/siddoshiflame/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://github.com/Sidneiex", label: "GitHub", Icon: GithubIcon },
];

export function Footer() {
  return (
    <footer className="bg-background-alt pt-20 pb-8 border-t border-foreground/5 px-4 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Top row: logo + social */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-14">
          <Link href="/" className="group flex items-center gap-1">
            <span className="font-display text-4xl tracking-[0.15em] uppercase text-foreground leading-none group-hover:text-accent-500 transition-colors duration-300">
              Sid
            </span>
            <span className="font-display text-4xl tracking-[0.15em] uppercase leading-none text-accent-500 transition-opacity duration-300 group-hover:opacity-80">
              Doshi
            </span>
          </Link>

          <div className="flex items-center gap-5">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-muted hover:border-accent-500 hover:text-accent-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,68,51,0.2)]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-xs tracking-[0.2em] uppercase font-semibold text-muted mb-14">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-accent-500 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="accent-rule mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted/40">
          <p>© {new Date().getFullYear()} Sid Doshi. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-muted/70 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-muted/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
