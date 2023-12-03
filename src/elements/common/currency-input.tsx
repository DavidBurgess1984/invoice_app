import React, { ChangeEvent } from 'react';

interface CurrencyInputProps {
  labelText: string;
  placeholder: string;
  value: number;
  onInputChange: (value: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ labelText, placeholder, value, onInputChange }) => {
  return (
    <div className="w-full flex flex-col">
      <label className="body text-inv-7E88C3 mb-1">{labelText}</label>
      <input
        className="rounded border border-DFE3FA p-2"
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default CurrencyInput;
