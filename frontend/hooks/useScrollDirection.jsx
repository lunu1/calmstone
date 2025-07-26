import { useEffect, useState } from "react";

/**
 * Returns "up" or "down" whenever the user scrolls more than `threshold` px.
 */
export default function useScrollDirection(threshold = 8) {
  const [dir, setDir] = useState("up"); // "up" | "down"

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < threshold) return;    // ignore micro-scrolls
      setDir(y > lastY ? "down" : "up");
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return dir;
}
