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
      <label className="body text-inv-7E88C3 mb-1">{labelText}</label>
      <input
        className="rounded border border-DFE3FA p-2 bg-inv-li text-inv-0C0E16"
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default NumberInput;
