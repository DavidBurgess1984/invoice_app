'use client'
import Image from "next/image";
import PlusIcon from '../../assets/icon-plus.svg'
import BinIcon from '../../assets/icon-delete.svg'
import TextInput from '@/src/elements/common/text-input';
import SelectInput from '@/src/elements/common/select-input';
import DatePicker from '@/src/elements/common/date-picker';
import { useEffect, useRef, useState } from "react";
import { DateRangeType,DateValueType } from "react-tailwindcss-datepicker";
import NumberInput from "../elements/common/number-input";
import { useLightbox } from "../providers/lightbox-provider";

interface InvoiceItem {
  id:string,
  name:string,
  qty:number,
  price:string
}

export default function InvoiceForm() {

    const {isInvoiceFormVisible, toggleInvoiceFormVisible} =  useLightbox();
    const [billFromAddress,setBillFromAddress] = useState('')
    const [billFromCity,setBillFromCity] = useState('')
    const [billFromPostcode,setBillFromPostcode] = useState('')
    const [billFromCountry,setBillFromCountry] = useState('')

    const [billToName,setBillToName] = useState('')
    const [billToEmail,setBillToEmail] = useState('')
    const [billToAddress,setBillToAddress] = useState('')
    const [billToCity,setBillToCity] = useState('')
    const [billToPostcode,setBillToPostcode] = useState('')
    const [billToCountry,setBillToCountry] = useState('')

    const [billInvoiceDate,setBillInvoiceDate] = useState({
        startDate:null,
        endDate: null
    })
    const [billToTerms,setBillToTerms] = useState(30)
    const [billToDescription,setBillToDescription] = useState("")

    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

    const handleInputChange = (id: string, field: string, value: string) => {
      const updatedData = invoiceItems.map((item) => {
        if(item.id === id){
          let newValue = value;
          if(field === "price"){
            // Regular expression to match numbers with up to 2 decimal places
            const regex = /^\d*\.?\d{0,2}$/;
            // If the input doesn't match the regex, keep the original item[field] value
            newValue = value.match(regex) ? value : item[field]
          }
          return { ...item, [field]: newValue }
        }
        return  item
      });
      setInvoiceItems(updatedData);
    };

    const createInvoiceItem = () => {
      const newInvoiceItem:InvoiceItem = {
        id:generateRandomString(20),
        name:"",
        price:"0.00",
        qty:0
      }

      // Create a new array with the updated item
      const updatedInvoiceItems = [...invoiceItems, newInvoiceItem];

      // Update the state with the new array
      setInvoiceItems(updatedInvoiceItems);
    }

    const removeInvoiceItem = (index:number) => {
      const copyInvoiceItems = [...invoiceItems]

      if(index >=0 && index < copyInvoiceItems.length){
        copyInvoiceItems.splice(index,1);
      }

      setInvoiceItems(copyInvoiceItems)
    }

    const generateRandomString = (length:number):string => {
      const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
  
      // Generate random alphanumeric string
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
          randomString += alphanumericChars[randomIndex];
      }
  
      // Get current timestamp
      const timestamp = Date.now().toString();
  
      // Concatenate random string with timestamp
      const result = randomString + timestamp;
  
      // Ensure the result is exactly 20 characters long
      if (result.length > 20) {
          return result.slice(0, 20);
      } else if (result.length < 20) {
          const remainingLength = 20 - result.length;
          const additionalChars = generateRandomString(remainingLength);
          return result + additionalChars;
      } else {
          return result;
      }
  }

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
            if (ref.current && !ref.current.contains(event.target as Node) && typeof node.className.indexOf == 'function' && node.className.indexOf('invoice-edit-form') === -1 )  {
                toggleInvoiceFormVisible(false)
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


  let invoiceVisibleClass = '';
  if(!isInvoiceFormVisible){
    invoiceVisibleClass = ' hidden '
  }

    return (
      <div className={"bg-lightbox-bg absolute left-0 h-full " + invoiceVisibleClass + " w-full z-20 transition-all"} >
        <div  className="invoice-edit-form bg-edit-form-bg md:w-[75%] xl:w-[36rem] h-screen flex flex-col lg:rounded-r-lg z-10 relative xl:ml-[6rem] " ref={wrapperRef}>
          <div className="pl-8 pr-4 py-4 flex flex-col h-full">
            <div className="py-8">
              <button className="text-3xl float-right mr-4" onClick={(e) => toggleInvoiceFormVisible(!isInvoiceFormVisible)}>&times;</button>
              <h2 className="heading-m mb-4 text-heading-font">New Invoice</h2>
              
            </div>
            <div className="overflow-y-scroll flex-grow pr-4">
              <p className="text-primary heading-s mb-4">Bill From</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-2">
                <div className="row-span-1 col-span-3 my-2">
                  <TextInput
                    id="billFromAddress"
                    labelText="Street Address"
                    placeholder="123 Baker Street"
                    value={billFromAddress}
                    onInputChange={setBillFromAddress}
                    errors={{}}
                  />
                </div>
                <div className="col-span-1 row-span-1 ">
                  <TextInput
                    id="billFromCity"
                    labelText="City"
                    placeholder="Glasgow"
                    value={billFromCity}
                    onInputChange={setBillFromCity}
                    errors={{}}
                  />
                </div>
                <div className="col-span-1  row-span-1 ">
                  <TextInput
                    id="billFromPostcode"
                    labelText="Postcode"
                    placeholder="PA4 0LA"
                    value={billFromPostcode}
                    onInputChange={setBillFromPostcode}
                    errors={{}}
                  />
                </div>
                <div className="col-span-2 lg:col-span-1 row-span-1 ">
                  <TextInput
                    id="billFromCountry"
                    labelText="Country"
                    placeholder="UK"
                    value={billFromCountry}
                    onInputChange={setBillFromCountry}
                    errors={{}}
                  />
                </div>
              </div>

              <div className=" py-4">
                <p className="text-primary heading-s mb-4">Bill To</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-2">
                  <div className="row-span-1 col-span-3 my-2">
                    <TextInput
                      id="billToName"
                      labelText="Client Name"
                      placeholder=""
                      value={billToName}
                      onInputChange={setBillToName}
                      errors={{}}
                    />
                  </div>
                  <div className="row-span-1 col-span-3 my-2">
                    <TextInput
                      id="billToEmail"
                      labelText="Client Email"
                      placeholder="eg example@gmail.com"
                      value={billToEmail}
                      onInputChange={setBillToEmail}
                      errors={{}}
                    />
                  </div>

                  <div className="row-span-1 col-span-3 my-2">
                    <TextInput
                      id="billToAddress"
                      labelText="Street Address"
                      placeholder="10 Downing Street"
                      value={billToAddress}
                      onInputChange={setBillToAddress}
                      errors={{}}
                    />
                  </div>
                  <div className="col-span-1 row-span-1 ">
                    <TextInput
                      id="billToCity"
                      labelText="City"
                      placeholder="London"
                      value={billToCity}
                      onInputChange={setBillToCity}
                      errors={{"billToCity":"Please enter a value"}}
                    />
                  </div>
                  <div className="col-span-1  row-span-1 ">
                    <TextInput
                      id="billToPostcode"
                      labelText="Postcode"
                      placeholder="NW1 1AA"
                      value={billToPostcode}
                      onInputChange={setBillToPostcode}
                      errors={{}}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1 row-span-1 ">
                    <TextInput
                      id="billToCountry"
                      labelText="Country"
                      placeholder="UK"
                      value={billToCountry}
                      onInputChange={setBillToCountry}
                      errors={{}}
                    />
                  </div>
                </div>
              </div>
              <div className=" py-4">
                <div className="grid grid-cols-4 grid-rows-2 gap-2">
                  <div className="row-span-2 col-span-2 my-2">
                    <DatePicker value={billInvoiceDate} labelText="Invoice Date" onDateChange={setBillInvoiceDate}/>
                  </div>
                  <div className="row-span-2 col-span-2 my-2">
                    <SelectInput value={billToTerms} onInputChange={setBillToTerms} labelText="Payment Terms"/>
                  </div>
                  <div className="row-span-1 col-span-4 my-2">
                    <TextInput
                      id="billToDescription"
                      labelText="Project Description"
                      placeholder=""
                      value={billToDescription}
                      onInputChange={setBillToDescription}
                      errors={{}}
                    />
                  </div>
                </div>
              </div>
              <div className="py-4">
                <p className="text-primary heading-s mb-4">Item List</p>
                <div className="relative w-full ">
                  <table className="text-primary-darker table-fixed w-full text-sm text-left body">
                    <thead className="">
                      <tr>
                        <th scope="col" className="pr-2 py-2 body w-[50%]">
                          Item name
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-2 body text-left w-[20%]"
                        >
                          QTY.
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-2 body text-left  w-[30%]"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-2 body text-left  w-[30%]"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 body text-left  w-[10%]"
                        >
                          &nbsp;
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceItems.map((item,i) => (
                       <tr className="heading-s" key={"invoice-item-"+i}>
                        <td scope="row" className="pr-2 py-2">
                          <span className="text-heading-font ">
                            <TextInput
                              id={"invoice-item-name-"+i}
                              labelText=""
                              placeholder=""
                              value={item.name}
                              onInputChange={(value) => handleInputChange(item.id,'name',value)}
                              errors={{}}
                            />
                          </span>
                        </td>
                        <td className="px-2 py-2 ">
                          <NumberInput
                            labelText=""
                            placeholder=""
                            value={item.qty}
                            onInputChange={(value) => handleInputChange(item.id,'qty',value)}
                          />
                        </td>
                        <td className="px-2 py-2 ">
                          <TextInput
                            id={"invoice-item-price-"+i}
                            labelText=""
                            placeholder=""
                            value={item.price}
                            onInputChange={(value) => handleInputChange(item.id,'price',value)}
                            errors={{}}
                          />
                        </td>
                        <td className="px-2 py-2">
                          <span className="text-heading-font ">{item.price.length > 0 ? (parseFloat(item.price) * item.qty).toFixed(2) : 0 }</span>
                        </td>
                        <td>
                          <button onClick={(e) => removeInvoiceItem(i)}>
                            <Image src={BinIcon} alt="" />
                          </button>
                        </td>
                      </tr>
                      ))}
                      
                    </tbody>
                  </table>
                </div>
                <div className="py-4 mb-4 ">
                  <button className="btn bg-table-background text-primary justify-center text-center w-full " onClick={(e) => createInvoiceItem()}>
                    <Image src={PlusIcon} className="mr-1" alt="" />
                    Add New Item
                  </button>
                </div>
              </div>
            </div>
            <div className="flex pt-8">
              <button className="btn bg-edit-btn hover:bg-edit-bg-hover text-primary justify-center text-center " onClick={(e) => toggleInvoiceFormVisible(!isInvoiceFormVisible)}>
                Discard
              </button>

              <button className="btn bg-draft-font text-table-background hover:bg-draft-bg-hover justify-center text-center ml-auto mr-2">
                Save as Draft
              </button>

              <button className="btn bg-primary text-white justify-center text-center hover:bg-primary-light duration-200">
                Save & Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}