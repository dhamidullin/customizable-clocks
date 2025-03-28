'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import SliderWithNumber from '@/components/SliderWithNumber'
import { useClockSettings } from '../contexts/ClockSettingsContext'
import { range } from '../utils/number'
import { useThrottledCallback } from '../hooks/useThrottledCallback'

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
`

const SettingsContainer = styled.div``

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const context = useClockSettings()

  const sidebarStyle: React.CSSProperties = isOpen
    ? { left: '10px' }
    : { left: '-100%' }

  const handleMinutesHandSizeChange = useThrottledCallback((newValue: number) => {
    const newSize = range(newValue, 0, 100, 0, 1)
    context.minutesHand.setSize(newSize)
  }, 1000 / 30, [])

  return (
    <StyledSidebar>
      <IconWrapper>
        <FontAwesomeIcon icon={faBars} onClick={() => setIsOpen(prev => !prev)} />
      </IconWrapper>

      <StyledSidebarContent style={sidebarStyle}>
        <h3>Settings</h3>

        <SettingsContainer>
          <SliderWithNumber
            title="Minutes Hand Size"
            min={0}
            max={100}
            onSliderChange={handleMinutesHandSizeChange}
            onFinalChange={handleMinutesHandSizeChange}
          />
        </SettingsContainer>
      </StyledSidebarContent>
    </StyledSidebar>
  )
}

export default Sidebar
