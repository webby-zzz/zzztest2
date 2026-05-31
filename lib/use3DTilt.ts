import { useState, useRef, useEffect } from "react";

/**
 * Custom React hook to calculate 3D tilt transformation where the side hovered dips inwards.
 * @param maxRotation The maximum rotation angle in degrees.
 * @param maxTranslateZ The depth shift (pushed back) in pixels.
 */
export function use3DTilt(maxRotation = 8, maxTranslateZ = -15) {
  const ref = useRef<any>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
    transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    transformStyle: "preserve-3d",
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      // Normalize mouse positions to range -0.5 to 0.5
      const x = mouseX / width;
      const y = mouseY / height;

      // To make the hovered side "dip inwards" (pushed back):
      // - Mouse at top (y < 0) -> top dips in -> rotateX is negative
      // - Mouse at bottom (y > 0) -> bottom dips in -> rotateX is positive
      // - Mouse at right (x > 0) -> right dips in -> rotateY is positive (in standard perspective)
      // - Mouse at left (x < 0) -> left dips in -> rotateY is negative
      const rotateX = y * maxRotation;
      const rotateY = -x * maxRotation;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${maxTranslateZ}px)`,
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
      });
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxRotation, maxTranslateZ]);

  return { ref, style };
}
