import { useEffect, useRef } from "react";

export default function InteractiveSprout({ size = 40 }) {
  const svgRef = useRef(null);
  const plantRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const state = useRef({
    mx: 0,
    my: 0,
    hasMouse: false,
    left: -35, // current angles (deg)
    right: 35,
    lean: 0,
    pop: 0, // click impulse
    popV: 0,
  });

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const s = state.current;
    let raf;

    const onMove = (e) => {
      const p = e.touches ? e.touches[0] : e;
      s.mx = p.clientX;
      s.my = p.clientY;
      s.hasMouse = true;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    const tick = (t) => {
      const svg = svgRef.current;
      if (svg) {
        const r = svg.getBoundingClientRect();
        // joint where leaves meet the stem (viewBox 0..48, joint ~ (24, 26))
        const jx = r.left + (24 / 48) * r.width;
        const jy = r.top + (26 / 48) * r.height;

        let targetL = -35;
        let targetR = 35;
        let targetLean = 0;

        if (s.hasMouse && !reduce) {
          const dx = s.mx - jx;
          const dy = s.my - jy;
          // angle from "up" in degrees, clamped so leaves never flip over
          const ang = (Math.atan2(dx, -dy) * 180) / Math.PI;
          const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
          const dist = Math.min(1, Math.hypot(dx, dy) / 400);
          const a = clamp(ang, -80, 80);
          // both leaves aim toward cursor, offset so they stay a pair
          targetL = clamp(a - 30 + (1 - dist) * 10, -95, 60);
          targetR = clamp(a + 30 - (1 - dist) * 10, -60, 95);
          targetLean = clamp(ang, -60, 60) * 0.12;
        } else if (!reduce) {
          // idle breathing
          const w = Math.sin(t / 900) * 4;
          targetL += w;
          targetR -= w;
        }

        // ease
        s.left += (targetL - s.left) * 0.12;
        s.right += (targetR - s.right) * 0.12;
        s.lean += (targetLean - s.lean) * 0.1;

        // click spring
        s.popV += (0 - s.pop) * 0.2;
        s.popV *= 0.78;
        s.pop += s.popV;

        const scale = 1 + s.pop * 0.18;
        const flutter = s.pop * 25;

        plantRef.current?.setAttribute(
          "transform",
          `translate(24 44) rotate(${s.lean}) scale(${scale}) translate(-24 -44)`,
        );
        leftRef.current?.setAttribute(
          "transform",
          `rotate(${s.left - flutter} 24 26)`,
        );
        rightRef.current?.setAttribute(
          "transform",
          `rotate(${s.right + flutter} 24 26)`,
        );
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  const poke = () => {
    state.current.popV = 1.2;
  };

  return (
    <svg
      ref={svgRef}
      onClick={poke}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="A small sprout whose leaves follow your cursor"
      className="inline-block align-middle ml-2 cursor-pointer select-none overflow-visible"
    >
      {/* soil mound (static) */}
      <path d="M10 44 Q24 34 38 44 Z" fill="#8b5e4b" />
      <path d="M15 44 Q24 38 33 44 Z" fill="#a47563" opacity="0.6" />

      <g ref={plantRef}>
        {/* stem */}
        <path
          d="M24 40 C24 34 24 30 24 26"
          stroke="#5aa832"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
        {/* left leaf: pivots at stem joint (24,26), points up-left at rest */}
        <g ref={leftRef}>
          <path
            d="M24 26 C16 26 8 21 6 12 C15 11 23 16 24 26 Z"
            fill="#7ccf3e"
          />
          <path
            d="M24 26 C19 21 14 17 9 13"
            stroke="#4d9a24"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        </g>
        {/* right leaf */}
        <g ref={rightRef}>
          <path
            d="M24 26 C32 26 40 21 42 12 C33 11 25 16 24 26 Z"
            fill="#a6e05a"
          />
          <path
            d="M24 26 C29 21 34 17 39 13"
            stroke="#4d9a24"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        </g>
      </g>
    </svg>
  );
}
