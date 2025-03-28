import { useCallback, useRef } from 'react'
import { throttle, DebouncedFuncLeading } from 'lodash'

export function useThrottledCallback<T extends (...args: any[]) => any>(callback: T, wait: number, deps: any[]): T {
  const throttledRef = useRef<DebouncedFuncLeading<T> | null>(null)

  return useCallback((...args: Parameters<T>) => {
    if (!throttledRef.current)
      throttledRef.current = throttle(callback, wait)

    return throttledRef.current(...args)
  }, [callback, wait, ...deps]) as T
}
