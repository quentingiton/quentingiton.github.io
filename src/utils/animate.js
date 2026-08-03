/**
 * Drive a parameter from 0 to 1 over `duration` ms, calling `onStep` once per
 * animation frame with an eased value.
 *
 * This exists instead of a `setTimeout` loop so the steps line up with the
 * browser's repaints. A 20 ms timer drifts against a 16.7 ms frame, which
 * shows up as visible stutter even when the drawing itself is cheap.
 */
export function tween(duration, onStep) {
  return new Promise((resolve) => {
    let start = null;

    function step(now) {
      if (start === null) start = now;
      const t = Math.min((now - start) / duration, 1);
      onStep(t * t * (3 - 2 * t)); // smoothstep
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }

    requestAnimationFrame(step);
  });
}

export function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Coalesce bursts of changes into at most one callback per frame.
 *
 * The flag is cleared *before* the callback runs, so a change arriving while
 * the callback is executing schedules another frame rather than being dropped.
 */
export function frameThrottle(callback) {
  let frame = null;

  const schedule = () => {
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      callback();
    });
  };

  schedule.cancel = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  };

  return schedule;
}
