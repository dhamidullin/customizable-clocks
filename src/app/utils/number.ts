export const trimNumber = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const range = (source: number, sourceMin: number, sourceMax: number, resMin: number, resMax: number): number => {
  source -= sourceMin
  sourceMax -= sourceMin

  const percentage = source / sourceMax

  return (resMax - resMin) * percentage + resMin
}
