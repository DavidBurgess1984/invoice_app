'use client'
import Image from "next/image";
import PlusIcon from '../../assets/icon-plus.svg'
import BinIcon from '../../assets/icon-delete.svg'
import TextInput from '@/src/elements/common/text-input';
import SelectInput from '@/src/elements/common/select-input';
import DatePicker from '@/src/elements/common/date-picker';
import { Fragment, useEffect, useRef, useState } from "react";
import { DateRangeType,DateValueType } from "react-tailwindcss-datepicker";
import NumberInput from "../elements/common/number-input";
import { useLightbox } from "../providers/lightbox-provider";
import ErrorPanel from "../elements/common/error-panel";
import formInputMap from "./form-input-map";
import { useInvoice } from "../providers/invoice-provider";
import {InvoiceItemType, InvoiceType} from '../types/INVOICE_TYPE'
import { useFlashMessage } from "../providers/flash-message-provider";


export default function InvoiceForm() {

    const {invoice, getInvoice, getInvoices} = useInvoice();
    const {setFlashMessage} = useFlashMessage();
    const [errors, setErrors] = useState({})
    
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
        startDate:null as string | null,
        endDate: null as string | null
    })
    const [billToTerms,setBillToTerms] = useState(30)
    const [billToDescription,setBillToDescription] = useState("")

    const [invoiceItems, setInvoiceItems] = useState<InvoiceItemType[]>([]);
    const [status,setStatus] = useState("")
    const [editBtnText,setEditButtonText] = useState('Save Changes');
    const [draftBtnText,setDraftButtonText] = useState('Save as Draft');
    const [saveSendBtnText,setSaveDraftButtonText] = useState('Save & Send');

    useEffect(() => {

      if(typeof invoice !== "undefined"){
        setBillFromAddress(invoice.bill_from_address)
        setBillFromCity(invoice.bill_from_city)
        setBillFromPostcode(invoice.bill_from_postcode)
        setBillFromCountry(invoice.bill_from_country)
        setBillToAddress(invoice.bill_to_address)
        setBillToCity(invoice.bill_to_city)
        setBillToCountry(invoice.bill_to_country)
        setBillToEmail(invoice.bill_to_email)
        setBillToName(invoice.bill_to_name)
        setBillToPostcode(invoice.bill_to_postcode)
        setBillToTerms(invoice.payment_terms)
        setBillToDescription(invoice.project_description)
        setBillInvoiceDate({startDate:invoice.invoice_date,endDate:invoice.invoice_date})
        setInvoiceItems(invoice.item_list)
        setStatus(invoice.status)
        
      } else {
        setBillFromAddress("")
        setBillFromCity("")
        setBillFromPostcode("")
        setBillFromCountry("")
        setBillToAddress("")
        setBillToCity("")
        setBillToCountry("")
        setBillToEmail("")
        setBillToName("")
        setBillToPostcode("")
        setBillToTerms(30)
        setBillToDescription("")
        setBillInvoiceDate({startDate:null,endDate:null})
        setInvoiceItems([])
      }
    },[invoice])

    const handleInputChange = (id: string, field: string, value: string) => {
      const updatedData = invoiceItems.map((item) => {
        if(item.id === id){
          let newValue = value;

          if(field === "price"){
            // Regular expression to match numbers with up to 2 decimal places
            let newFloatValue = 0.00

            if(newValue.toString().length > 0){
              newFloatValue =  parseFloat(parseFloat(newValue).toFixed(2))
            }
            
            // const newFloatValue= parseFloat(newValue)
            return { ...item, price: newFloatValue }
          }
          if(field === "qty"){
            const newIntValue = parseInt(newValue)
            return { ...item, [field]: newIntValue }
          }
          return { ...item, [field]: newValue }
        }
        return  item
      });
      setInvoiceItems(updatedData);
    };

    const createInvoice = (status:string) => {

      setErrors({})
      const slug = "dev-"+Date.now();
      const invoiceDate = billInvoiceDate.startDate != null ? new Date(billInvoiceDate.startDate  ).toISOString()  :new Date().toISOString()

      const invoiceData:InvoiceType = {
        bill_from_address:billFromAddress,
        bill_from_city:billFromCity,
        bill_from_country:billFromCountry,
        bill_from_postcode:billFromPostcode,
        bill_to_name:billToName,
        bill_to_email:billToEmail,
        bill_to_address:billToAddress,
        bill_to_city:billToCity,
        bill_to_country:billToCountry,
        bill_to_postcode:billToPostcode,
        invoice_date:invoiceDate ,
        payment_terms:billToTerms,
        project_description:billToDescription,
        status:status,
        slug:slug,
        item_list:invoiceItems
      }

      const saveData = async() => {

        if(status == 'draft'){
          setDraftButtonText("Saving...")
        } else {
          setSaveDraftButtonText("Saving...")
        }
        try {
          const response = await fetch('/api/invoice',{
            method:'POST', 
            headers: {
              'Content-Type': 'application/json', // Specify the content type as JSON
            },
            body: JSON.stringify(invoiceData), // Convert the object to JSON
          });
          const result = await response.json();

          if(result.result == "failure"){
            setErrors(result.errors)
          } else {
            toggleInvoiceFormVisible(false)
            if(status == 'draft'){
              setFlashMessage('Draft Invoice has been created')
            } else {
              setFlashMessage('Invoice has been created and sent')
            }
            getInvoices("")
          }

          if(status == 'draft'){
            setDraftButtonText("Save as Draft")
          } else {
            setSaveDraftButtonText("Save & Send")
          }

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      saveData();
      
    }

    const editInvoice = () => {

      setErrors({})
      const slug = invoice?.slug !== undefined ? invoice.slug : "";

      const invoiceData:InvoiceType = {
        bill_from_address:billFromAddress,
        bill_from_city:billFromCity,
        bill_from_country:billFromCountry,
        bill_from_postcode:billFromPostcode,
        bill_to_name:billToName,
        bill_to_email:billToEmail,
        bill_to_address:billToAddress,
        bill_to_city:billToCity,
        bill_to_country:billToCountry,
        bill_to_postcode:billToPostcode,
        invoice_date:new Date(billInvoiceDate.startDate || "").toISOString() ,
        payment_terms:billToTerms,
        project_description:billToDescription,
        status:status,
        slug:slug,
        item_list:invoiceItems
      }

      const saveData = async() => {

        setEditButtonText('Saving...')
        try {
          const response = await fetch('/api/invoice/'+slug,{
            method:'POST', 
            headers: {
              'Content-Type': 'application/json', // Specify the content type as JSON
            },
            body: JSON.stringify(invoiceData), // Convert the object to JSON
          });
          const result = await response.json();

          if(result.result == "failure"){
            setErrors(result.errors)
          } else {
            toggleInvoiceFormVisible(false)
            setFlashMessage('Invoice has been updated')
            getInvoice(slug)
          }
          setEditButtonText('Save Changes')
          

        } catch (error) {
          console.error('Error fetching data:', error);
          setEditButtonText('Save Changes')
        }
      }

      saveData();
    }

    const createInvoiceItem = () => {
      const newInvoiceItem:InvoiceItemType = {
        id:generateRandomString(20),
        name:"",
        price:0.00,
        qty:0,
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

  const errorsToShowInBillFromPanel = [
    "billFromAddress",
    "billFromCity",
    "billFromPostcode",
    "billFromCountry",
  ]

  const errorsToShowInBillToPanel = [
    "billToName",
    "billToEmail",
    "billToAddress",
    "billToCity",
    "billToPostcode",
    "billToCountry",
    "billToTerms",
    "billToDescription"
  ]

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
                    errors={errors}
                    showErrorText={false}
                  />
                </div>
                <div className="col-span-1 row-span-1 ">
                  <TextInput
                    id="billFromCity"
                    labelText="City"
                    placeholder="Glasgow"
                    value={billFromCity}
                    onInputChange={setBillFromCity}
                    errors={errors}
                    showErrorText={false}
                  />
                </div>
                <div className="col-span-1  row-span-1 ">
                  <TextInput
                    id="billFromPostcode"
                    labelText="Postcode"
                    placeholder="PA4 0LA"
                    value={billFromPostcode}
                    onInputChange={setBillFromPostcode}
                    errors={errors}
                    showErrorText={false}
                  />
                </div>
                <div className="col-span-2 lg:col-span-1 row-span-1 ">
                  <TextInput
                    id="billFromCountry"
                    labelText="Country"
                    placeholder="UK"
                    value={billFromCountry}
                    onInputChange={setBillFromCountry}
                    errors={errors}
                    showErrorText={false}
                  />
                </div>
              </div>
              <div className="py-2">
                <ErrorPanel errors={errors} toShow={errorsToShowInBillFromPanel} />
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
                      errors={errors}
                      showErrorText={false}
                    />
                  </div>
                  <div className="row-span-1 col-span-3 my-2">
                    <TextInput
                      id="billToEmail"
                      labelText="Client Email"
                      placeholder="eg example@gmail.com"
                      value={billToEmail}
                      onInputChange={setBillToEmail}
                      errors={errors}
                      showErrorText={false}
                    />
                  </div>

                  <div className="row-span-1 col-span-3 my-2">
                    <TextInput
                      id="billToAddress"
                      labelText="Street Address"
                      placeholder="10 Downing Street"
                      value={billToAddress}
                      onInputChange={setBillToAddress}
                      errors={errors}
                      showErrorText={false}
                    />
                  </div>
                  <div className="col-span-1 row-span-1 ">
                    <TextInput
                      id="billToCity"
                      labelText={formInputMap["billToCity"]["labelText"]}
                      placeholder={formInputMap["billToCity"]["placeholder"]}
                      value={billToCity}
                      onInputChange={setBillToCity}
                      errors={errors}
                      showErrorText={false}
                    />
                  </div>
                  <div className="col-span-1  row-span-1 ">
                    <TextInput
                      id="billToPostcode"
                      labelText="Postcode"
                      placeholder="NW1 1AA"
                      value={billToPostcode}
                      onInputChange={setBillToPostcode}
                      errors={errors}
                      showErrorText={false}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1 row-span-1 ">
                    <TextInput
                      id="billToCountry"
                      labelText="Country"
                      placeholder="UK"
                      value={billToCountry}
                      onInputChange={setBillToCountry}
                      errors={errors}
                      showErrorText={false}
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
                      errors={errors}
                      showErrorText={false}
                    />
                  </div>
                </div>
              </div>
              <div className="py-2">
                <ErrorPanel errors={errors} toShow={errorsToShowInBillToPanel} />
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
                      {  invoiceItems.map((item,i) =>  (
                       <tr className="heading-s" key={"invoice-item-"+i}>
                        <td scope="row" className="pr-2 py-2">
                          <span className="text-heading-font ">
                            <TextInput
                              id={"invoice-item-name-"+i}
                              labelText=""
                              placeholder=""
                              value={item.name}
                              onInputChange={(value) => handleInputChange(item.id,'name',value)}
                              errors={errors}
                              showErrorText={true}
                            />
                          </span>
                        </td>
                        <td className="px-2 py-2 ">
                          <NumberInput
                            labelText=""
                            placeholder=""
                            value={item.qty}
                            onInputChange={(value) => handleInputChange(item.id,'qty',value)}
                            errors={errors}
                            id={"invoice-item-qty-"+i}
                            showErrorText={true}
                          />
                        </td>
                        <td className="px-2 py-2 ">
                          <NumberInput
                            id={"invoice-item-price-"+i}
                            labelText=""
                            placeholder=""
                            value={item.price}
                            onInputChange={(value) => handleInputChange(item.id,'price',value)}
                            errors={errors}
                            showErrorText={true}
                          />
                        </td>
                        <td className="px-2 py-2">
                          <span className="text-heading-font ">{(item.price * item.qty).toFixed(2)}</span>
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
              {typeof invoice !== "undefined" ?

              <Fragment>           

                <button className="btn bg-edit-btn hover:bg-edit-bg-hover text-primary justify-center text-center  ml-auto  mr-2" onClick={(e) => toggleInvoiceFormVisible(!isInvoiceFormVisible)}>
                  Cancel
                </button>
                <button className="btn bg-draft-font text-table-background hover:bg-draft-bg-hover justify-center text-center mr-2" disabled={editBtnText=="Saving" ? true : false} onClick={(e) => editInvoice()}>
                  {editBtnText}
                </button>
              </Fragment>
              :
              <Fragment>
                <button className="btn bg-edit-btn hover:bg-edit-bg-hover text-primary justify-center text-center " onClick={(e) => toggleInvoiceFormVisible(!isInvoiceFormVisible)}>
                  Discard
                </button>

                <button className="btn bg-draft-font text-table-background hover:bg-draft-bg-hover justify-center text-center ml-auto mr-2"  onClick={(e) => createInvoice("draft")}>
                  {draftBtnText}
                </button>

                <button className="btn bg-primary text-white justify-center text-center hover:bg-primary-light duration-200" onClick={(e) => createInvoice("pending")}>
                  {saveSendBtnText}
                </button>
              </Fragment>
              }
            </div>
          </div>
        </div>
      </div>
    );
}