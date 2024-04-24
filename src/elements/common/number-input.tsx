import React, { ChangeEvent } from 'react';

interface NumberInputProps {
  labelText: string;
  placeholder: string;
  value: number;
  onInputChange: (value: string) => void;
  errors: Record<string, string>,
  id: string,
  showErrorText:boolean
}

const NumberInput: React.FC<NumberInputProps> = ({ labelText, placeholder, value, onInputChange,errors,id,showErrorText }) => {

  let labelClassName = "body  mb-1 "
  let textClassName = "rounded border border-DFE3FA p-2 bg-panel-bg"
  
  if(typeof errors[id] !== 'undefined'){
    
    labelClassName += " text-delete-bg"
  
    if(typeof showErrorText !== "undefined"){
      textClassName += " text-delete-bg"
    }
  } else {

    textClassName += " text-heading-font"
    labelClassName += " text-primary-darker"
  }

  return (
    <div className="w-full flex flex-col">
      <label className={labelClassName}>{labelText}</label>
      <input
        className={textClassName}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default NumberInput;
