import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How strongly the element is pulled toward the pointer (0-1). */
  strength?: number;
  /** Distance in px at which attraction begins. */
  radius?: number;
  /** Maximum displacement in px, regardless of pointer distance. */
  maxDisplacement?: number;
};

/**
 * Marks an element as magnetic. All animation is handled globally by the
 * magnetic engine (see src/lib/cursor/magnetic-engine.ts), which auto-detects
 * any `.magnetic` element in the DOM — no per-instance JS runs here.
 */
export function Magnetic({
  children,
  className,
  strength,
  radius,
  maxDisplacement,
}: MagneticProps) {
  return (
    <div
      className={cn("magnetic inline-flex", className)}
      data-magnetic-strength={strength}
      data-magnetic-radius={radius}
      data-magnetic-max={maxDisplacement}
    >
      {children}
    </div>
  );
}
