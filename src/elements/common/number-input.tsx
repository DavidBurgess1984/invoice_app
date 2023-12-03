import React, { ChangeEvent } from 'react';

interface NumberInputProps {
  labelText: string;
  placeholder: string;
  value: number;
  onInputChange: (value: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ labelText, placeholder, value, onInputChange }) => {
  return (
    <div className="w-full flex flex-col">
      <label className="body text-primary-darker mb-1">{labelText}</label>
      <input
        className="rounded border border-DFE3FA p-2 bg-panel-bg text-heading-font"
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default NumberInput;
