import React from 'react'
import styled from 'styled-components'

interface SettingsGroupProps {
  title: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SettingsGroup: React.FC<SettingsGroupProps> = ({ title, children, className, style }) => {
  return (
    <Container className={className} style={style}>
      <Title>{title}</Title>

      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default SettingsGroup 
