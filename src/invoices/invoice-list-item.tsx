import Image from "next/image";
import ArrowRight from "../../assets/icon-arrow-right.svg";
import Link from "next/link";
import React from "react";

import { InvoiceProps } from "../types/INVOICE_TYPE";
import { getInvoiceDueDate,getInvoiceTotal } from "../utilities/invoice-helpers";
import InvoiceStatusButton from "./invoice-status-button";

const InvoiceListItem: React.FC<InvoiceProps> = ({invoice}) => {

  const invoiceTotal = getInvoiceTotal(invoice.item_list);
  const invoiceDueDate = getInvoiceDueDate(invoice.invoice_date,invoice.payment_terms)

  return (
    <Link href={'invoice/'+invoice.id} className="bg-panel-bg rounded relative shadow py-4 px-4 flex flex-col md:flex-row justify-between md:items-center text-panel-font my-4 border border-panel-bg hover:border-primary duration-200">
        <span className="inline-block md:inline mb-[1rem] md:mb-0">
          <span className='text-primary-darker'>#</span><span className="text-heading-font heading-s">{invoice.id}</span>
        </span>
        <span className="inline-block md:inline mb-1 md:mb-0"> Due {invoiceDueDate}</span>
        <span className="absolute right-4 top-4 md:relative md:right-0 md:top-0">{invoice.bill_to_name}</span>
        <span className="text-heading-font heading-s">£{invoiceTotal}</span>
        <span className="absolute right-0 bottom-4 md:relative md:right-0 md:bottom-0">
          <InvoiceStatusButton invoice={invoice} />
          <Image src={ArrowRight} alt="arrow-right" className="hidden md:inline-block" />
        </span>
    </Link>
    
  );
  
}

export default InvoiceListItem;
