"use client"
import Image from 'next/image'
import Plus from '../assets/icon-plus.svg'
import InvoiceList from '@/src/invoices/invoice-list'
import InvoiceStatusFilter from '@/src/elements/invoice-status-filter'
import { Fragment, useEffect, useState } from 'react'
import { useLightbox } from '@/src/providers/lightbox-provider'
import Loading from '@/src/elements/loading'

export default function Home() {

  const {toggleInvoiceFormVisible} = useLightbox()
  const [loading,setLoading] = useState(true)
  const [invoices,setInvoices] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/invoice');
        const result = await response.json();
        setInvoices(result);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  


  return (
      <Fragment>
        {loading && 
          <Loading />
        }

        {!loading && 
          <Fragment>
              <div className='mt-8 mb-6 md:my-12 flex justify-between items-center'>
                <div >
                  <h1 className='heading-l text-heading-font pb-1'>Invoices</h1>
                  <p className='body text-primary-darker'><span className="hidden md:inline-block">There are</span> 7 <span className="hidden md:inline-block">total</span> invoices</p>
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

              <InvoiceList invoices={invoices}/>
          </Fragment>
        }
    </Fragment>
  )
}
