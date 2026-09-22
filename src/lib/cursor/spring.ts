export interface SpringState {
  value: number;
  velocity: number;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Advances a critically-underdamped spring one tick toward `target`.
 * `stiffness` controls pull strength, `damping` controls velocity decay
 * (closer to 1 = less friction = more elastic overshoot).
 */
export function stepSpring(
  state: SpringState,
  target: number,
  stiffness: number,
  damping: number,
) {
  const force = (target - state.value) * stiffness;
  state.velocity = (state.velocity + force) * damping;
  state.value += state.velocity;
  return state.value;
}

/** Whether a spring has settled close enough to stop animating. */
export function springIsSettled(
  state: SpringState,
  target: number,
  epsilon = 0.01,
) {
  return (
    Math.abs(state.value - target) < epsilon &&
    Math.abs(state.velocity) < epsilon
  );
}
