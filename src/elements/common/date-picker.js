'use client'
import Datepicker from "react-tailwindcss-datepicker"; 
import {  useEffect, useRef, useState } from "react";

// interface DatePickerInputProps {
//   labelText: string;
//   value: number;
//   handleValueChange: (value: number) => void;
// }

const DatePicker  = ({value,onDateChange,labelText}) => {
    
  
        
        // const handleValueChange = (newValue) => {
        // console.log("newValue:", newValue); 
        // setValue(newValue); 
        // } 
        

  return (
    <div className="w-full flex flex-col relative">
        <label className="body text-inv-7E88C3 mb-1">{labelText}</label>
        <Datepicker 
          inputClassName="p-2 rounded border border-DFE3FA heading-s w-full bg-inv-li text-inv-0C0E16" 
          asSingle={true} 
          useRange={false} 
          value={value} 
          displayFormat={"DD MMM YYYY"}
          onChange={onDateChange} 
        /> 
    </div>
  );
}

export default DatePicker
