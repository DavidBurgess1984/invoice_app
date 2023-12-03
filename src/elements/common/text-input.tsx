import React, { ChangeEvent } from 'react';

interface TextInputProps {
  id:string,
  labelText: string;
  placeholder: string;
  value: string;
  errors:Record<string, string>,
  onInputChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ labelText, placeholder, value, errors, id, onInputChange }) => {
  
  let labelClassName = "body  mb-1 "

  if(typeof errors[id] !== 'undefined'){
    labelClassName += " text-delete-bg"
  } else {
    labelClassName += " text-primary-darker"
  }
  
  return (
    <div className="w-full flex flex-col ">
      <label className={labelClassName }>{labelText}</label>
      <input
        className="rounded border border-DFE3FA p-2 bg-panel-bg text-heading-font"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
