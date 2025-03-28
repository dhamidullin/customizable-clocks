import React from 'react';
import styled from 'styled-components';

interface ToggleButtonProps {
  title?: string;
  isOn?: boolean;
  onChange?: (value: boolean) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const ToggleSwitch = styled.label<{ isOn: boolean }>`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
    user-select: none;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #2196F3;
  }

  input:checked + span:before {
    transform: translateX(24px);
  }
`;

const ToggleButton: React.FC<ToggleButtonProps> = ({ title, isOn, onChange }) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}

      <ToggleSwitch isOn={isOn || false}>
        <input
          type="checkbox"
          checked={isOn}
          onChange={(e) => onChange?.(e.target.checked)}
        />

        <span />
      </ToggleSwitch>
    </Container>
  );
};

export default ToggleButton;
