'use client'

import Image from "next/image";
import ArrowDown from "../../assets/icon-arrow-down.svg";
import {  useEffect, useRef, useState } from "react";

export default function InvoiceStatusFilter() {

    const [dropdownOpen,toggleDropdownOpen] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: React.RefObject<HTMLInputElement>) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          const handleClickOutside = (event :  MouseEvent ) => {

            let node = event.target as Element
            event.stopPropagation()

            if (ref.current && !ref.current.contains(event.target as Node) && typeof node.className.indexOf == 'function' && node.className.indexOf('invoice-toggle-list') === -1 )  {
                toggleDropdownOpen(false)
            }

          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

      

  return (
    <div className='ml-auto heading-s mr-4 md:mr-16 relative text-inv-0C0E16' ref={wrapperRef}>
      <button onClick={() => toggleDropdownOpen(!dropdownOpen)}>
        Filter <span className="hidden md:inline-block"> by status</span>
        <Image
          className="inline-block w-3 ml-2 mb-1"
          src={ArrowDown}
          alt="arrow-down"
        />
      </button>
       {dropdownOpen && (
      <div className="bg-inv-li drop-shadow-md p-4 absolute invoice-toggle-list z-10" >
        <ul className="text-left list-none">
          <li className="relative py-2 pl-0 pr-8 group">
            <label className="select-none checkbox-container block relative cursor-pointer pl-6">
              Draft
              <input
                className="absolute opacity-0 left-0 top-0 cursor-pointer"
                type="checkbox"
              />
              <span className="h-4 w-4 checkmark absolute top-0 left-0 bg-inv-DFE3FA rounded-sm border  group-hover:border-inv-7C5DFA"></span>
            </label>
          </li>
          <li className="relative py-2 pl-0 pr-8 flex items-center group">
            <label className="select-none checkbox-container block relative cursor-pointer pl-6">
              Pending
              <input
                className="absolute opacity-0 left-0 top-1 cursor-pointer"
                type="checkbox"
              />
              <span className="h-4 w-4 checkmark absolute top-0 left-0 bg-inv-DFE3FA rounded-sm border group-hover:border-inv-7C5DFA"></span>
            </label>
          </li>
          <li className="relative py-2 pl-0 pr-8 group">
            <label className="select-none checkbox-container block relative cursor-pointer pl-6">
              Paid
              <input
                className="absolute opacity-0 left-0 top-0 cursor-pointer"
                type="checkbox"
              />
              <span className="h-4 w-4 checkmark absolute top-0 left-0 bg-inv-DFE3FA rounded-sm border group-hover:border-inv-7C5DFA"></span>
            </label>
          </li>
        </ul>
      </div>
       )}
    </div>
  );
}
