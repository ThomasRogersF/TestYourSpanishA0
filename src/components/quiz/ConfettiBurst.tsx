import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";

export type ConfettiBurstProps = {
  /**
   * Whether to show the confetti.
   */
  active: boolean;
  /**
   * How long the burst should last (ms). Defaults to 4000.
   */
  duration?: number;
  /**
   * Number of confetti pieces at peak. Defaults to 220 (desktop), 120 (mobile).
   */
  peakPieces?: number;
  /**
   * Optional: override colors.
   */
  colors?: string[];
  /**
   * Optional callback when the burst finishes.
   */
  onDone?: () => void;
};

export function ConfettiBurst({
  active,
  duration = 4000,
  peakPieces,
  colors,
  onDone,
}: ConfettiBurstProps) {
  const [running, setRunning] = useState(active);
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);
  const [height, setHeight] = useState<number>(typeof window !== "undefined" ? window.innerHeight : 0);

  const isMobile = width < 640;

  // Default brand palette
  const palette = useMemo(
    () => colors ?? ["#F36A20", "#3EB489", "#FFEDD5", "#FCE7F3", "#E0F2F1"],
    [colors]
  );

  // Resolve pieces defaults by breakpoint
  const pieces = useMemo(() => {
    if (typeof peakPieces === "number") return peakPieces;
    return isMobile ? 120 : 220;
  }, [peakPieces, isMobile]);

  // Sync active prop with internal state
  useEffect(() => {
    setRunning(active);
  }, [active]);

  // Resize handler to keep full viewport coverage
  useEffect(() => {
    function onResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-stop after duration
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      setRunning(false);
      onDone?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [running, duration, onDone]);

  // Optional: honor reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!running || prefersReducedMotion) return null;

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={pieces}
      recycle={false}
      colors={palette}
      gravity={0.25}
      wind={0.01}
      tweenDuration={120}
      style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: "none" }}
    />
  );
}

export default ConfettiBurst;