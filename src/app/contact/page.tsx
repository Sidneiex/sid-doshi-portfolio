"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

/* ─── Social links ─────────────────────────────────────────── */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
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

/* ─── Magnetic Submit Button ───────────────────────────────── */
function MagneticSubmit({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.25}px)`;
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <button
      ref={ref}
      type="submit"
      disabled={loading}
      id="contact-submit-btn"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full py-5 rounded font-bold uppercase tracking-[0.2em] text-sm border border-accent-500/40 text-accent-500 flex items-center justify-center gap-3 hover:bg-accent-500 hover:text-background hover:shadow-[0_0_30px_rgba(212,165,116,0.2)] transition-all duration-500 group transform-gpu disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}

/* ─── Floating Label Input ─────────────────────────────────── */
function AccentInput({
  id,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${
          focused || filled
            ? "-top-5 text-[10px] tracking-[0.3em] uppercase text-accent-500 font-mono"
            : "top-2 text-sm text-muted"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={focused ? placeholder : ""}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(e.target.value.length > 0);
        }}
        onChange={(e) => setFilled(e.target.value.length > 0)}
        className="w-full bg-transparent border-b border-foreground/10 outline-none text-foreground pb-3 pt-2 text-sm placeholder:text-muted/30 transition-all duration-300 focus:border-accent-500"
      />
      <span
        className={`absolute bottom-0 left-0 h-px bg-accent-500 transition-all duration-400 ${
          focused ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
}

/* ─── Floating Label Textarea ──────────────────────────────── */
function AccentTextarea({
  id,
  label,
  name,
  placeholder,
}: {
  id: string;
  label: string;
  name: string;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${
          focused || filled
            ? "-top-5 text-[10px] tracking-[0.3em] uppercase text-accent-500 font-mono"
            : "top-2 text-sm text-muted"
        }`}
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={focused ? placeholder : ""}
        rows={4}
        required
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(e.target.value.length > 0);
        }}
        onChange={(e) => setFilled(e.target.value.length > 0)}
        className="w-full bg-transparent border-b border-foreground/10 outline-none text-foreground pb-3 pt-2 text-sm placeholder:text-muted/30 resize-none transition-all duration-300 focus:border-accent-500"
      />
      <span
        className={`absolute bottom-0 left-0 h-px bg-accent-500 transition-all duration-400 ${
          focused ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
}

/* ─── Inquiry Type Selector ────────────────────────────────── */
const inquiryTypes = [
  "Brand Film",
  "Documentary",
  "Website / App",
  "Social Media",
  "Photography",
  "Other",
];

function InquirySelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (val: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-accent-500 mb-3 font-medium font-mono">
        Type of Inquiry
      </p>
      <div className="flex flex-wrap gap-2">
        {inquiryTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onSelect(type)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-300 ${
              selected === type
                ? "border border-accent-500 text-accent-500 shadow-[0_0_16px_rgba(212,165,116,0.1)]"
                : "border border-foreground/10 text-muted hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <input type="hidden" name="inquiry_type" value={selected} />
    </div>
  );
}

/* ─── Main Contact Page ────────────────────────────────────── */
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(formRef.current!);
    formData.append("access_key", "487e1d7e-e6b4-44ea-ace4-2b4d43334a4d");
    formData.append("subject", `New inquiry from ${formData.get("name")} — ${inquiryType || "General"}`);
    formData.append("from_name", "Sid Doshi Portfolio");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        formRef.current?.reset();
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,165,116,0.03)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 container mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-accent-500 tracking-[0.3em] uppercase mb-4 font-mono"
          >
            — Get in Touch —
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl tracking-wide text-foreground mb-4 font-bold"
          >
            Contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted text-base max-w-md mx-auto"
          >
            Have a vision? Let&apos;s talk about how we can bring it to life
            together.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left column: Info cards */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Email card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="p-8 rounded-2xl bg-surface border border-foreground/5 hover:border-accent-500/15 transition-all duration-300 group hover:shadow-[0_0_24px_rgba(212,165,116,0.05)]"
              >
                <div className="w-12 h-12 rounded-xl border border-accent-500/30 flex items-center justify-center mb-6 group-hover:shadow-[0_0_16px_rgba(212,165,116,0.15)] transition-all duration-300">
                  <Mail className="w-5 h-5 text-accent-500" />
                </div>
                <h2 className="font-display text-xl tracking-widest uppercase text-foreground mb-2">
                  Email Address
                </h2>
                <p className="text-muted text-sm mb-4">
                  Drop me a line anytime — I usually respond within 24 hours.
                </p>
                <a
                  href="mailto:sid.doshi.flame@gmail.com"
                  className="text-accent-500 text-sm font-medium hover:text-accent-400 transition-colors"
                >
                  sid.doshi.flame@gmail.com
                </a>
              </motion.div>

              {/* Schedule card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="p-8 rounded-2xl bg-surface border border-foreground/5 hover:border-accent-500/15 transition-all duration-300 group hover:shadow-[0_0_24px_rgba(212,165,116,0.05)]"
              >
                <div className="w-12 h-12 rounded-xl border border-accent-500/30 flex items-center justify-center mb-6 group-hover:shadow-[0_0_16px_rgba(212,165,116,0.15)] transition-all duration-300">
                  <Calendar className="w-5 h-5 text-accent-500" />
                </div>
                <h2 className="font-display text-xl tracking-widest uppercase text-foreground mb-2">
                  Connect with Me
                </h2>
                <p className="text-muted text-sm mb-4">
                  Find me on social media or reach out directly.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/the.sid.doshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center text-muted hover:border-accent-500 hover:text-accent-500 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/siddoshiflame/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center text-muted hover:border-accent-500 hover:text-accent-500 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="lg:col-span-3"
            >
              {!submitted ? (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-10"
                  noValidate
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid sm:grid-cols-2 gap-10">
                    <AccentInput
                      id="contact-name"
                      name="name"
                      label="Your Name"
                      placeholder="Siddharth Doshi"
                      required
                    />
                    <AccentInput
                      id="contact-email"
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="you@company.com"
                      required
                    />
                  </div>

                  <AccentInput
                    id="contact-phone"
                    name="phone"
                    label="Phone Number (optional)"
                    placeholder="+91 98765 43210"
                  />

                  <InquirySelector
                    selected={inquiryType}
                    onSelect={setInquiryType}
                  />

                  <AccentInput
                    id="contact-budget"
                    name="budget"
                    label="Estimated Budget (optional)"
                    placeholder="₹50,000 – ₹2,00,000"
                  />

                  <AccentTextarea
                    id="contact-message"
                    name="message"
                    label="Tell me about your vision"
                    placeholder="Describe your project, goals, timeline, and anything else that's relevant..."
                  />

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <div>
                    <MagneticSubmit loading={loading}>
                      Send Message
                    </MagneticSubmit>
                    <p className="text-xs text-muted/40 text-center mt-4">
                      Your message goes directly to my inbox. No spam. No
                      pressure.
                    </p>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-24 gap-6"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-accent-500 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-accent-500" />
                  </div>
                  <h3 className="font-display text-3xl tracking-widest uppercase text-foreground">
                    Message Sent
                  </h3>
                  <p className="text-muted max-w-sm">
                    Thanks for reaching out! I&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryType("");
                    }}
                    className="text-xs text-muted/50 hover:text-accent-500 transition-colors tracking-widest uppercase mt-4 font-mono"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
