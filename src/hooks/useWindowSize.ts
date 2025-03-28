import { useState, useEffect } from 'react'
import { throttle } from 'lodash'

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 1000 / 30)

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // cleanup event and cancel pending throttled calls (if any)
    return () => {
      window.removeEventListener('resize', handleResize)
      handleResize.cancel()
    }
  }, [])

  return windowSize
} 