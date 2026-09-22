"use client";

/**
 * Single shared pointer-position tracker.
 * Avoids attaching multiple `pointermove` listeners across the cursor and
 * magnetic systems — every consumer reads from the same mutable snapshot.
 */
class PointerTracker {
  x = 0;
  y = 0;
  /** True once a real pointer position has been observed. */
  hasMoved = false;
  private refCount = 0;

  private handleMove = (event: PointerEvent) => {
    this.x = event.clientX;
    this.y = event.clientY;
    this.hasMoved = true;
  };

  /** Ref-counted so multiple consumers can share one listener. */
  acquire() {
    if (typeof window === "undefined") return;
    if (this.refCount === 0) {
      window.addEventListener("pointermove", this.handleMove, {
        passive: true,
      });
    }
    this.refCount += 1;
  }

  release() {
    if (typeof window === "undefined") return;
    this.refCount = Math.max(0, this.refCount - 1);
    if (this.refCount === 0) {
      window.removeEventListener("pointermove", this.handleMove);
    }
  }
}

export const pointerTracker = new PointerTracker();
