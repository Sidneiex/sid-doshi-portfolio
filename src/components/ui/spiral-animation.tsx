"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/* ─── Vector helpers ──────────────────────────────────────── */
class Vec2 {
  constructor(public x: number, public y: number) {}
  static rand(min: number, max: number) {
    return min + Math.random() * (max - min);
  }
}

class Vec3 {
  constructor(public x: number, public y: number, public z: number) {}
}

/* ─── Star particle ───────────────────────────────────────── */
class Star {
  dx: number;
  dy: number;
  spiralLoc: number;
  swFactor: number;
  z: number;
  angle: number;
  dist: number;
  rotDir: number;
  expRate: number;
  finalScale: number;

  constructor(camZ: number, camTravel: number) {
    this.angle = Math.random() * Math.PI * 2;
    this.dist = 30 * Math.random() + 15;
    this.rotDir = Math.random() > 0.5 ? 1 : -1;
    this.expRate = 1.2 + Math.random() * 0.8;
    this.finalScale = 0.7 + Math.random() * 0.6;
    this.dx = this.dist * Math.cos(this.angle);
    this.dy = this.dist * Math.sin(this.angle);
    this.spiralLoc = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3;
    this.z = Vec2.rand(0.5 * camZ, camTravel + camZ);
    this.z = lerp(this.z, camTravel / 2, 0.3 * this.spiralLoc);
    this.swFactor = Math.pow(Math.random(), 2.0);
  }
}

function lerp(a: number, b: number, t: number) {
  return a * (1 - t) + b * t;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

function remap(v: number, s1: number, e1: number, s2: number, e2: number) {
  return s2 + (e2 - s2) * ((v - s1) / (e1 - s1));
}

function ease(p: number, g: number) {
  return p < 0.5
    ? 0.5 * Math.pow(2 * p, g)
    : 1 - 0.5 * Math.pow(2 * (1 - p), g);
}

function elasticOut(x: number) {
  const c = (2 * Math.PI) / 4.5;
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c) + 1;
}

/* ─── Animation engine ────────────────────────────────────── */
class SpiralEngine {
  private tl: gsap.core.Timeline;
  private t = 0;
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private stars: Star[] = [];

  private readonly CHANGE = 0.32;
  private readonly CAM_Z = -400;
  private readonly CAM_TRAVEL = 3400;
  private readonly DOT_Y = 28;
  private readonly ZOOM = 100;
  private readonly N_STARS = 5000;
  private readonly TRAIL = 80;

  constructor(
    private canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    private dpr: number,
    size: number
  ) {
    this.ctx = ctx;
    this.size = size;
    this.tl = gsap.timeline({ repeat: -1 });
    this.initStars();
    this.tl.to(this, {
      t: 1,
      duration: 15,
      repeat: -1,
      ease: "none",
      onUpdate: () => this.render(),
    });
  }

  private initStars() {
    for (let i = 0; i < this.N_STARS; i++) {
      this.stars.push(new Star(this.CAM_Z, this.CAM_TRAVEL));
    }
  }

  private spiralPath(p: number): Vec2 {
    p = clamp(1.2 * p, 0, 1);
    p = ease(p, 1.8);
    const turns = 6;
    const theta = 2 * Math.PI * turns * Math.sqrt(p);
    const r = 170 * Math.sqrt(p);
    return new Vec2(r * Math.cos(theta), r * Math.sin(theta) + this.DOT_Y);
  }

  private project(pos: Vec3, sizeFactor: number) {
    const t2 = clamp(remap(this.t, this.CHANGE, 1, 0, 1), 0, 1);
    const newCamZ =
      this.CAM_Z + ease(Math.pow(t2, 1.2), 1.8) * this.CAM_TRAVEL;
    if (pos.z > newCamZ) {
      const depth = pos.z - newCamZ;
      const x = (this.ZOOM * pos.x) / depth;
      const y = (this.ZOOM * pos.y) / depth;
      const sw = (400 * sizeFactor) / depth;
      this.ctx.lineWidth = sw;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private render() {
    const { ctx } = this;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.save();
    ctx.translate(this.size / 2, this.size / 2);

    const t1 = clamp(remap(this.t, 0, this.CHANGE + 0.25, 0, 1), 0, 1);
    const t2 = clamp(remap(this.t, this.CHANGE, 1, 0, 1), 0, 1);
    ctx.rotate(-Math.PI * ease(t2, 2.7));

    // Trail
    for (let i = 0; i < this.TRAIL; i++) {
      const f = remap(i, 0, this.TRAIL, 1.1, 0.1);
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f;
      ctx.fillStyle = "#fff";
      ctx.lineWidth = sw;
      const pt = t1 - 0.00015 * i;
      const pos = this.spiralPath(pt);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, sw / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Stars
    ctx.fillStyle = "#fff";
    for (const star of this.stars) {
      const sp = this.spiralPath(star.spiralLoc);
      const q = t1 - star.spiralLoc;
      if (q > 0) {
        const dp = clamp(4 * q, 0, 1);
        const el = elasticOut(dp);
        let sx: number, sy: number;
        if (dp < 0.3) {
          const e = dp / 0.3;
          sx = lerp(sp.x, sp.x + star.dx * 0.3, e);
          sy = lerp(sp.y, sp.y + star.dy * 0.3, e);
        } else if (dp < 0.7) {
          const mid = (dp - 0.3) / 0.4;
          const curve = Math.sin(mid * Math.PI) * star.rotDir * 1.5;
          const bx = sp.x + star.dx * 0.3;
          const by = sp.y + star.dy * 0.3;
          const tx = sp.x + star.dx * 0.7;
          const ty = sp.y + star.dy * 0.7;
          sx = lerp(bx, tx, mid) + -star.dy * 0.4 * curve * mid;
          sy = lerp(by, ty, mid) + star.dx * 0.4 * curve * mid;
        } else {
          const fp = (dp - 0.7) / 0.3;
          const bx = sp.x + star.dx * 0.7;
          const by = sp.y + star.dy * 0.7;
          const td = star.dist * star.expRate * 1.5;
          const sa = star.angle + 1.2 * star.rotDir * fp * Math.PI;
          const tx = sp.x + td * Math.cos(sa);
          const ty = sp.y + td * Math.sin(sa);
          sx = lerp(bx, tx, fp);
          sy = lerp(by, ty, fp);
        }
        const vx = ((star.z - this.CAM_Z) * sx) / this.ZOOM;
        const vy = ((star.z - this.CAM_Z) * sy) / this.ZOOM;
        let sm = dp < 0.6 ? 1.0 + dp * 0.2 : lerp(1.2, star.finalScale, (dp - 0.6) / 0.4);
        this.project(new Vec3(vx, vy, star.z), 8.5 * star.swFactor * sm);
      }
    }

    // Start dot
    if (this.t > this.CHANGE) {
      const dy = (this.CAM_Z * this.DOT_Y) / this.ZOOM;
      this.project(new Vec3(0, dy, this.CAM_TRAVEL), 2.5);
    }

    ctx.restore();
  }

  destroy() {
    this.tl.kill();
  }
}

/* ─── Component ───────────────────────────────────────────── */
export function SpiralAnimation({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SpiralEngine | null>(null);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const size = Math.max(w, h);

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    engineRef.current = new SpiralEngine(canvas, ctx, dpr, size);

    const timer = setTimeout(() => setReady(true), 1500);

    return () => {
      clearTimeout(timer);
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  const handleEnter = useCallback(() => {
    setEntered(true);
    // Fade out then call onComplete
    setTimeout(() => {
      onComplete?.();
    }, 800);
  }, [onComplete]);

  return (
    <div
      className={`intro-overlay flex items-center justify-center transition-opacity duration-700 ${
        entered ? "opacity-0 exiting" : "opacity-100"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Center content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ${
          ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <button
          onClick={handleEnter}
          className="group cursor-pointer bg-transparent border-none outline-none"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-[0.25em] uppercase text-white mb-3">
            SID <span className="text-accent-gradient">DOSHI</span>
          </h1>
          <p className="font-mono text-sm text-white/40 tracking-[0.3em] uppercase group-hover:text-white/70 transition-colors duration-500 animate-pulse">
            Enter
          </p>
        </button>
      </div>
    </div>
  );
}
