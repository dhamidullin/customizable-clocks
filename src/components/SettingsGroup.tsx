import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface SettingsGroupProps {
  title: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  padding: 4px 0;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`

const Icon = styled(FontAwesomeIcon) <{ isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`

const Content = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`

const SettingsGroup: React.FC<SettingsGroupProps> = ({ title, children, className, style }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Container data-testid="settings-group" className={className} style={style}>
      <TitleContainer onClick={() => setIsOpen(prev => !prev)}>
        <Title>{title}</Title>

        <Icon icon={faChevronDown} isOpen={isOpen} />
      </TitleContainer>

      <Content isOpen={isOpen}>
        {children}
      </Content>
    </Container>
  )
}

export default SettingsGroup
