"use client"
import Image from 'next/image'
import Plus from '../assets/icon-plus.svg'
import InvoiceList from '@/src/invoices/invoice-list'
import InvoiceStatusFilter from '@/src/elements/invoice-status-filter'
import { Fragment, useEffect, useState } from 'react'
import { useLightbox } from '@/src/providers/lightbox-provider'
import Loading from '@/src/elements/loading'
import { useInvoice } from '@/src/providers/invoice-provider'
import EmptyInvoice from "../assets/empty-invoices.png";

export default function Home() {

  const {toggleInvoiceFormVisible} = useLightbox()

  const {getInvoices, invoicesLoading, invoices} = useInvoice()

  useEffect(() => {
   
    getInvoices("")
  }, []);

  let invoiceDisplay

  if(invoices.length > 0){
    invoiceDisplay =<InvoiceList invoices={invoices}/>
  } else {
    invoiceDisplay =
      <div className='flex mt-[10%]'>
          <Image src={EmptyInvoice} alt="no-invoice" className="block m-auto z-10" />
      </div>
    
  }

  return (
      <Fragment>
          <Fragment>
              <div className='mt-8 mb-6 md:my-12 flex justify-between items-center'>
                <div >
                  <h1 className='heading-l text-heading-font pb-1'>Invoices</h1>
                  <p className='body text-primary-darker'><span className="hidden md:inline-block">There are</span> {invoices.length} <span className="hidden md:inline-block">total</span> invoices</p>
                </div>
                
                <InvoiceStatusFilter />
      
                <div >
                  <button className='h-14 pr-8 btn btn-new  bg-primary text-white hover:bg-primary-light duration-200' onClick={(e) => toggleInvoiceFormVisible(true)}>
                    <span className='h-10 w-10 bg-white inline-block rounded-3xl mr-3 flex items-center justify-center'>
                      <Image src={Plus} alt='plus' className='inline-block '/>
                    </span>
                    New&nbsp;<span className="hidden md:inline-block">Invoice</span>
                  </button>
                </div>
              </div>
              {invoicesLoading ? 
                <Loading />
                :
                invoiceDisplay
              }
              
          </Fragment>
    </Fragment>
  )
}
