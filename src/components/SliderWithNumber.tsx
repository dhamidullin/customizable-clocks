import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { trimNumber } from '@/app/utils/number';

interface SliderWithNumberProps {
  title: string;
  min: number;
  max: number;
  initialValue?: number;
  onSliderChange?: (value: number) => void;
  onFinalChange?: (value: number) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Slider = styled.input`
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  background: #ddd;
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #666;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #444;
    }
  }
`;

const NumberInput = styled.input`
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const SliderWithNumber: React.FC<SliderWithNumberProps> = ({ title, min, max, initialValue = min, onSliderChange, onFinalChange, }) => {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onSliderChange?.(newValue);
  };

  const handleSliderMouseDown = () => {
    setIsDragging(true);
  };

  const handleSliderMouseUp = () => {
    setIsDragging(false);
    onFinalChange?.(value);
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value) || min
    const newValue = trimNumber(parsedValue, min, max)
    setValue(newValue)
    onFinalChange?.(newValue)
  };

  return (
    <Container>
      <Title>{title}</Title>
      <ControlsRow>
        <Slider
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          onMouseDown={handleSliderMouseDown}
          onMouseUp={handleSliderMouseUp}
          onMouseLeave={handleSliderMouseUp}
        />

        <NumberInput
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={handleNumberInputChange}
        />
      </ControlsRow>
    </Container>
  );
};

export default SliderWithNumber;
