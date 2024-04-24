import React, { ChangeEvent } from 'react';

interface TextInputProps {
  id:string,
  labelText: string;
  placeholder: string;
  value: string;
  errors:Record<string, string>,
  onInputChange: (value: string) => void,
  showErrorText:boolean
}

const TextInput: React.FC<TextInputProps> = ({ labelText, placeholder, value, errors, id, onInputChange, showErrorText }) => {
  
  let labelClassName = "body  mb-1 "
  let textClassName = "rounded border border-DFE3FA p-2 bg-panel-bg "
  if(typeof errors[id] !== 'undefined'){
    labelClassName += " text-delete-bg"

    if(typeof showErrorText !== "undefined"){
      textClassName += " text-delete-bg"
    }
  } else {
    labelClassName += " text-primary-darker"
    textClassName += " text-heading-font"
  }
  
  return (
    <div className="w-full flex flex-col ">
      <label className={labelClassName }>{labelText}</label>
      <input
        className={textClassName}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
