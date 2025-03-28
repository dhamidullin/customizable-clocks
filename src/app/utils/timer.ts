/**
 * Creates an interval that starts immediately and continues at the specified interval.
 * Combines setTimeout for immediate execution and setInterval for subsequent calls.
 * 
 * @param callback - Function to be called on each interval
 * @param interval - Time in milliseconds between each call
 * @returns A cleanup function that stops the interval
 */
export function createImmediateInterval(callback: () => void, interval: number): NodeJS.Timeout {
  callback()
  return setInterval(callback, interval)
}
