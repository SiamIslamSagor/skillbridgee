"use client";

/**
 * Refcounted singleton tracking the latest pointer position on `window`.
 * Multiple consumers can `acquire()`/`release()` without duplicating listeners.
 */
class PointerTracker {
  x = 0;
  y = 0;
  hasMoved = false;

  private refCount = 0;

  private handlePointerMove = (event: PointerEvent) => {
    this.x = event.clientX;
    this.y = event.clientY;
    this.hasMoved = true;
  };

  acquire() {
    if (typeof window === "undefined") return;
    this.refCount += 1;
    if (this.refCount === 1) {
      window.addEventListener("pointermove", this.handlePointerMove, {
        passive: true,
      });
    }
  }

  release() {
    if (typeof window === "undefined") return;
    this.refCount = Math.max(0, this.refCount - 1);
    if (this.refCount === 0) {
      window.removeEventListener("pointermove", this.handlePointerMove);
    }
  }
}

export const pointerTracker = new PointerTracker();
