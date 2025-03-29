'use client'

import { useWindowSize } from '@/hooks/useWindowSize'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { MovementOptions, useClockSettings } from '../contexts/ClockSettingsContext';
import moment from 'moment'
import { createImmediateInterval } from '../utils/timer';

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

interface ClockHandProps {
  style?: React.CSSProperties;
  visible: boolean;
}

const ClockHand = styled.div<ClockHandProps>`
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: var(--width);
  height: var(--length);
  background-color: white;
  transform-origin: bottom;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateX(-50%);
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
  width: 5px;
  height: 20px;
  border-radius: 50%;
  background-color: white;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`

const HourTickRoot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`

const HourTickContainer = styled.div`
  width: 1px;
  transform-origin: center bottom;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`

const HourLabel = styled.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
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

interface HourNumberProps {
  label: number
  angle: number
  size: number
}

const HourNumber = ({ label, angle, size }: HourNumberProps) => (
  <HourTickRoot data-testid={`hour-number-${angle}deg`} style={{ transform: `rotate(${angle}deg)` }}>
    <HourTickContainer style={{ height: `${size * .5 * .95}px` }}>
      <HourLabel style={{ transform: `translateX(-50%) translateY(-25%) rotate(${-angle}deg)` }}>
        {label}
      </HourLabel>
    </HourTickContainer>
  </HourTickRoot>
)

const Face = ({ size }: { size: number }) => {
  const context = useClockSettings()
  const hoursPerDay = context.use24HourFormat ? 24 : 12

  const hideSecondIndices = !context.showSecondIndices
  const hideHourNumbers = !context.showHourNumbers

  const hours = useMemo(() => {
    return Array.from({ length: hoursPerDay }, (_, i) => i + 1)
      .map((hour) => ({
        angle: hour * (360 / hoursPerDay),
        label: hour,
      }))
  }, [hoursPerDay])

  const hourElements = useMemo(() => {
    return hideHourNumbers ? null : hours.map(({ angle, label }) => (
      <HourNumber key={'hour-number-' + angle} label={label} angle={angle} size={size} />
    ))
  }, [hours, hideHourNumbers])

  const seconds = hideSecondIndices ? null : Array.from({ length: 60 }, (_, i) => i + 1)
    .map(second => {
      const angle = second * (360 / 60)

      if (context.showHourNumbers && hours.some(hour => hour.angle === angle)) {
        return null
      }

      return (
        <SecondTick key={'second-tick-' + angle} angle={angle} size={size} />
      )
    })

  return (
    <>
      {hourElements}
      {seconds}
    </>
  )
}

const secondsToDegrees = (seconds: number) => seconds * 360 / 60
const minutesToDegrees = (minutes: number) => minutes * 360 / 60
const hoursToDegrees = (hours: number, hoursPerDay: number) => hours * 360 / hoursPerDay

const Clock = () => {
  const startOfDay = useMemo(() => moment().startOf('day').toDate(), [])
  const { width, height } = useWindowSize()
  const context = useClockSettings()

  const secondsElementRef = useRef<HTMLDivElement>(null)
  const minutesElementRef = useRef<HTMLDivElement>(null)
  const hoursElementRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  const isContinious = context.movementMethod === MovementOptions.CONTINIOUS

  // handle seconds hand movement
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    const animate = () => {
      let secondsPassed = isContinious ? moment().diff(startOfDay, 'milliseconds') / 1000 : moment().diff(startOfDay, 'seconds')
      const minutesPassed = secondsPassed / 60
      const hoursPassed = minutesPassed / 60

      const secondsAngle = secondsToDegrees(secondsPassed)
      const minutesAngle = minutesToDegrees(minutesPassed)
      const hoursAngle = hoursToDegrees(hoursPassed, context.use24HourFormat ? 24 : 12)

      if (secondsElementRef.current)
        secondsElementRef.current.style.transform = `translateX(-50%) rotate(${secondsAngle}deg)`

      if (minutesElementRef.current)
        minutesElementRef.current.style.transform = `translateX(-50%) rotate(${minutesAngle}deg)`

      if (hoursElementRef.current)
        hoursElementRef.current.style.transform = `translateX(-50%) rotate(${hoursAngle}deg)`

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isContinious, startOfDay])

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

  const hoursHandStyle = { '--width': `${hoursHandWidth}px`, '--length': `${hoursHandSize}px` } as React.CSSProperties
  const minutesHandStyle = { '--width': `${minutesHandWidth}px`, '--length': `${minutesHandSize}px` } as React.CSSProperties
  const secondsHandStyle = { '--width': `${secondsHandWidth}px`, '--length': `${secondsHandSize}px` } as React.CSSProperties

  const transition = isContinious ? 'none' : 'all .2s ease-in-out'

  return (
    <ClockContainer background={background}>
      <ClockRoot data-testid="clock-root" size={size} background={clockBackground}>
        <Face size={size} />

        <ClockHand
          ref={secondsElementRef}
          data-testid="seconds-hand"
          style={{ ...secondsHandStyle, transition }}
          visible={context.showSeconds}
        />

        <ClockHand
          ref={minutesElementRef}
          data-testid="minutes-hand"
          style={{ ...minutesHandStyle, transition }}
          visible={true}
        />

        <ClockHand
          ref={hoursElementRef}
          data-testid="hours-hand"
          style={{ ...hoursHandStyle, transition }}
          visible={true}
        />

        <ClockPivot size={size * .05} />
      </ClockRoot>
    </ClockContainer>
  )
}

export default Clock
