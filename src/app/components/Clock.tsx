'use client'

import { useWindowSize } from '@/hooks/useWindowSize'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useClockSettings } from '../contexts/ClockSettingsContext';

interface ClockRootProps {
  size: number;
  background: string;
}

interface ClockContainerProps {
  background: string;
}

interface ClockPivotProps {
  size: number;
}

interface ClockHandProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
}

const ClockContainer = styled.div<ClockContainerProps>`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: ${props => props.background};
`

const ClockRoot = styled.div<ClockRootProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.background};
`

const ClockPivot = styled.div<ClockPivotProps>`
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
`

const ClockHand = styled.div<ClockHandProps>`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%) rotate(var(--rotation));
  width: var(--width);
  height: var(--length);
  background-color: white;
  transform-origin: bottom;
`

const SecondTickRoot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 0px;
  height: 0px;
  transform-origin: center bottom;
`

const SecondTickContainer = styled.div`
  width: 0px;
  transform-origin: center bottom;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`

const SecondTickLine = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`

const SecondTick = ({ angle, size }: { angle: number, size: number }) => {
  return (
    <SecondTickRoot data-testid={`tick-root-${angle}deg`} style={{ transform: `rotate(${angle}deg)` }}>
      <SecondTickContainer style={{ height: `${size * .5 * .95}px` }}>
        <SecondTickLine data-testid={`tick-line-${angle}deg`} />
      </SecondTickContainer>
    </SecondTickRoot>
  )
}

const Face = ({ size }: { size: number }) => {
  const hoursPerDay = 12 /* use 12/24 value from context here */

  const ticks = 120
  const items = Array
    .from({ length: ticks }, (_, i) => i + 1)
    .map(item => {
      const isSecond = item % (ticks / 60) === 0
      const isHour = item % (ticks / hoursPerDay) === 0
      const hour = isHour ? item / (ticks / hoursPerDay) : undefined
      const angle = item * (360 / ticks)

      return {
        isSecond,
        isHour,
        hour,
        angle,
      }
    })
    .map(item => {
      if (item.isSecond) {
        return <SecondTick key={'second-tick-' + item.angle} angle={item.angle} size={size} />
      }

      return null
    })

  return (
    <>
      {items}
    </>
  )
}

const secondsToDegrees = (seconds: number) => seconds * 360 / 60
const minutesToDegrees = (minutes: number) => minutes * 360 / 60
const hoursToDegrees = (hours: number, hoursPerDay: number) => hours * 360 / hoursPerDay

const Clock = () => {
  const [time, setTime] = useState(new Date())
  const { width, height } = useWindowSize()
  const context = useClockSettings()

  const size = Math.min(width, height) * .85

  const background = '#cccccc'
  const clockBackground = '#000000'
  const baseHandSize = size * .5
  const baseHandWidth = size * .01

  const secondsHandSize = baseHandSize * context.secondsHand.size
  const minutesHandSize = baseHandSize * context.minutesHand.size
  const hoursHandSize = baseHandSize * context.hoursHand.size

  const secondsHandWidth = baseHandWidth * context.secondsHand.thinckness
  const minutesHandWidth = baseHandWidth * context.minutesHand.thinckness
  const hoursHandWidth = baseHandWidth * context.hoursHand.thinckness

  const hoursRotation = hoursToDegrees(time.getHours(), 12)
  const minutesRotation = minutesToDegrees(time.getMinutes())
  const secondsRotation = secondsToDegrees(time.getSeconds())

  const hoursHandStyle = { '--rotation': `${hoursRotation}deg`, '--width': `${hoursHandWidth}px`, '--length': `${hoursHandSize}px` } as React.CSSProperties
  const minutesHandStyle = { '--rotation': `${minutesRotation}deg`, '--width': `${minutesHandWidth}px`, '--length': `${minutesHandSize}px` } as React.CSSProperties
  const secondsHandStyle = { '--rotation': `${secondsRotation}deg`, '--width': `${secondsHandWidth}px`, '--length': `${secondsHandSize}px` } as React.CSSProperties

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <ClockContainer background={background}>
      <ClockRoot data-testid="clock-root" size={size} background={clockBackground}>
        <Face size={size} />

        <ClockHand style={hoursHandStyle} />
        <ClockHand style={minutesHandStyle} />
        <ClockHand style={secondsHandStyle} />

        <ClockPivot size={size * .05} />
      </ClockRoot>
    </ClockContainer>
  )
}

export default Clock
