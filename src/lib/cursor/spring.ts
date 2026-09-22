/** Mutable spring state for a single scalar axis. */
export interface SpringState {
  value: number;
  velocity: number;
}

const VALUE_EPSILON = 0.01;
const VELOCITY_EPSILON = 0.01;

/** Advances a spring one frame toward `target`, mutating `state` in place. */
export function stepSpring(
  state: SpringState,
  target: number,
  stiffness: number,
  damping: number,
) {
  const force = (target - state.value) * stiffness;
  state.velocity = (state.velocity + force) * damping;
  state.value += state.velocity;
}

/** True once the spring has effectively reached `target` and stopped moving. */
export function springIsSettled(state: SpringState, target: number) {
  return (
    Math.abs(target - state.value) < VALUE_EPSILON &&
    Math.abs(state.velocity) < VELOCITY_EPSILON
  );
}
