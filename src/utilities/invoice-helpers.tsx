import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { InvoiceItemType } from "../types/INVOICE_TYPE";

dayjs.extend(advancedFormat);

export const getInvoiceTotal = (item_list: InvoiceItemType[]):number => {
  let total = 0;

  item_list.forEach(item => {
    total += item.price * item.qty
  })

  return total
}

export const getInvoiceDueDate = (inputDate:string,daysToAdd?:number):string => {
  
  let parsedDate = dayjs(inputDate)
  if(typeof daysToAdd !== "undefined"){
    parsedDate = parsedDate.add(daysToAdd, 'day');
  }
  const formattedDate = parsedDate.format('Do MMM YYYY');
  return formattedDate;
}