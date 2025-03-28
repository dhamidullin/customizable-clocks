'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import SliderWithNumber from '@/components/SliderWithNumber'
import { MovementOptions, useClockSettings } from '../contexts/ClockSettingsContext'
import { range } from '../utils/number'
import { useThrottledCallback } from '../hooks/useThrottledCallback'
import SettingsGroup from '@/components/SettingsGroup'
import ToggleButton from '@/components/ToggleButton'

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.div`
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`

const StyledSidebarContent = styled.div`
  position: fixed;
  top: 40px;
  transition: all 0.3s;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: calc(100vh - 60px);
  overflow-y: auto;
`

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const context = useClockSettings()

  const sidebarStyle: React.CSSProperties = isOpen
    ? { left: '10px' }
    : { left: '-100%' }

  const handleMinutesHandSizeChange = useThrottledCallback((newValue: number) => {
    const newSize = range(newValue, 0, 100, 0, 1)
    context.minutesHand.setSize(newSize)
  }, 100, [])

  const handleMinutesHandThicknessChange = useThrottledCallback((newValue: number) => {
    const newThickness = range(newValue, 0, 100, 0, 1)
    context.minutesHand.setThickness(newThickness)
  }, 100, [])

  const handleHoursHandSizeChange = useThrottledCallback((newValue: number) => {
    const newSize = range(newValue, 0, 100, 0, 1)
    context.hoursHand.setSize(newSize)
  }, 100, [])

  const handleHoursHandThicknessChange = useThrottledCallback((newValue: number) => {
    const newThickness = range(newValue, 0, 100, 0, 1)
    context.hoursHand.setThickness(newThickness)
  }, 100, [])

  const handleSecondsHandSizeChange = useThrottledCallback((newValue: number) => {
    const newSize = range(newValue, 0, 100, 0, 1)
    context.secondsHand.setSize(newSize)
  }, 100, [])

  const handleSecondsHandThicknessChange = useThrottledCallback((newValue: number) => {
    const newThickness = range(newValue, 0, 100, 0, 1)
    context.secondsHand.setThickness(newThickness)
  }, 100, [])

  return (
    <StyledSidebar>
      <IconWrapper>
        <FontAwesomeIcon icon={faBars} onClick={() => setIsOpen(prev => !prev)} />
      </IconWrapper>

      <StyledSidebarContent style={sidebarStyle}>
        <h3>Settings</h3>

        <ToggleButton
          title="Continious move"
          isOn={context.movementMethod === MovementOptions.CONTINIOUS}
          onChange={(value) => context.setMovementMethod(value ? MovementOptions.CONTINIOUS : MovementOptions.STEPPY)}
        />

        <ToggleButton
          title="Show seconds"
          isOn={context.showSeconds}
          onChange={(value) => context.setShowSeconds(value)}
        />

        <SettingsGroup title="Hours Hand" style={{ marginTop: '6px' }}>
          <SliderWithNumber
            title="Size"
            min={0}
            max={100}
            onSliderChange={handleHoursHandSizeChange}
            onFinalChange={handleHoursHandSizeChange}
          />

          <SliderWithNumber
            title="Thickness"
            min={0}
            max={100}
            onSliderChange={handleHoursHandThicknessChange}
            onFinalChange={handleHoursHandThicknessChange}
          />
        </SettingsGroup>

        <SettingsGroup title="Minutes Hand" style={{ marginTop: '6px' }}>
          <SliderWithNumber
            title="Size"
            min={0}
            max={100}
            onSliderChange={handleMinutesHandSizeChange}
            onFinalChange={handleMinutesHandSizeChange}
          />

          <SliderWithNumber
            title="Thickness"
            min={0}
            max={100}
            onSliderChange={handleMinutesHandThicknessChange}
            onFinalChange={handleMinutesHandThicknessChange}
          />
        </SettingsGroup>

        <SettingsGroup title="Seconds Hand" style={{ marginTop: '6px' }}>
          <SliderWithNumber
            title="Size"
            min={0}
            max={100}
            onSliderChange={handleSecondsHandSizeChange}
            onFinalChange={handleSecondsHandSizeChange}
          />

          <SliderWithNumber
            title="Thickness"
            min={0}
            max={100}
            onSliderChange={handleSecondsHandThicknessChange}
            onFinalChange={handleSecondsHandThicknessChange}
          />
        </SettingsGroup>
      </StyledSidebarContent>
    </StyledSidebar>
  )
}

export default Sidebar
