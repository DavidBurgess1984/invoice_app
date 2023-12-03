import Image from "next/image";
import ArrowRight from "../../assets/icon-arrow-right.svg";
import ArrowDown from "../../../assets/icon-arrow-down.svg";
import Link from "next/link";

interface SelectInputProps {
  labelText: string;
  value: number;
  onInputChange: (value: number) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ labelText,  value, onInputChange }) =>  {
  return (
    <div className="w-full flex flex-col relative">
        <label className="body text-inv-7E88C3 mb-1">{labelText}</label>
        <select onChange={(e) => onInputChange(parseInt(e.target.value))} className="bg-inv-li appearance-none rounded border border-DFE3FA p-2 heading-s text-inv-0C0E16" value={value}  >
          <option value={30}>Next 30 Days</option>
          <option value={14}>Next 14 Days</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2">
          <Image className="fill-current w-3"  src={ArrowDown} alt=''/>
        </div>
    </div>
  );
}

export default SelectInput