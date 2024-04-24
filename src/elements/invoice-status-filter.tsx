'use client'

import Image from "next/image";
import ArrowDown from "../../assets/icon-arrow-down.svg";
import {  useEffect, useRef, useState } from "react";
import { useInvoice } from "../providers/invoice-provider";
import { InvoiceFilters } from "../types/INVOICE_TYPE";


export default function InvoiceStatusFilter() {

    const [dropdownOpen,toggleDropdownOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
      'draft':false,
      'pending':false,
      'paid':false
    })
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const {getInvoices} = useInvoice()

    
    const toggleFilter = (filter: keyof InvoiceFilters) => {
      let newFilters:InvoiceFilters = {...activeFilters}
      newFilters[filter] = !activeFilters[filter]
      let qString = '?'
      let qStringData = []
      for (let index in newFilters) {
        if(newFilters[index as keyof typeof newFilters]){
          qStringData.push("s[]="+index)
        }
        
      }

      qString += qStringData.join("&")

      getInvoices(qString)
      setActiveFilters(newFilters)
    }

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
    <div className='ml-auto heading-s mr-4 md:mr-16 relative text-heading-font' ref={wrapperRef}>
      <button onClick={() => toggleDropdownOpen(!dropdownOpen)}>
        Filter <span className="hidden md:inline-block"> by status</span>
        <Image
          className="inline-block w-3 ml-2 mb-1"
          src={ArrowDown}
          alt="arrow-down"
        />
      </button>
       {dropdownOpen && (
      <div className="bg-panel-bg drop-shadow-md p-4 absolute invoice-toggle-list z-10" >
        <ul className="text-left list-none">
          <li className="relative py-2 pl-0 pr-8 group">
            <label className="select-none checkbox-container block relative cursor-pointer pl-6">
              Draft
              <input
                onChange={(e) => toggleFilter('draft')}
                checked={activeFilters.draft}
                className="absolute opacity-0 left-0 top-0 cursor-pointer"
                type="checkbox"
              />
              <span className="h-4 w-4 checkmark absolute top-0 left-0 bg-table-background rounded-sm border  group-hover:border-primary"></span>
            </label>
          </li>
          <li className="relative py-2 pl-0 pr-8 flex items-center group">
            <label className="select-none checkbox-container block relative cursor-pointer pl-6">
              Pending
              <input
                onChange={(e) => toggleFilter('pending')}
                checked={activeFilters.pending}
                className="absolute opacity-0 left-0 top-1 cursor-pointer"
                type="checkbox"
              />
              <span className="h-4 w-4 checkmark absolute top-0 left-0 bg-table-background rounded-sm border group-hover:border-primary"></span>
            </label>
          </li>
          <li className="relative py-2 pl-0 pr-8 group">
            <label className="select-none checkbox-container block relative cursor-pointer pl-6">
              Paid
              <input
                onChange={(e) => toggleFilter('paid')}
                checked={activeFilters.paid}
                className="absolute opacity-0 left-0 top-0 cursor-pointer"
                type="checkbox"
              />
              <span className="h-4 w-4 checkmark absolute top-0 left-0 bg-table-background rounded-sm border group-hover:border-primary"></span>
            </label>
          </li>
        </ul>
      </div>
       )}
    </div>
  );
}
