'use client'
import Image from 'next/image'
import LeftArrow from '../../../assets/icon-arrow-left.svg'
import { Fragment, useEffect, useState } from 'react'
import { useLightbox } from '@/src/providers/lightbox-provider'
import Loading from '@/src/elements/loading'
import { InvoiceType } from '@/src/types/INVOICE_TYPE'
import InvoiceStatusButton from '@/src/invoices/invoice-status-button'
import { getInvoiceDueDate, getInvoiceTotal } from '@/src/utilities/invoice-helpers'
import Link from 'next/link'

export default function Page({params}: { params: { invoice_slug: string } }) {

  const invoiceSlug = params.invoice_slug
  const {toggleInvoiceFormVisible} = useLightbox()
  const [loading,setLoading] = useState(true)
  const [invoice,setInvoice] = useState<InvoiceType | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/invoice/'+invoiceSlug);
        const result = await response.json();
        setInvoice(result);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [invoiceSlug]);

  return (
    <Fragment>
      {loading && 
          <Loading />
        }
        

        {!loading && invoice &&
      <Fragment>
          <div className="pt-6 xl:pb-6 xl:pt-12">
            <div className="flex items-center">
              <Link href='/'>
              <Image
                src={LeftArrow}
                alt="left-arrow"
                className="inline-block w-2 mr-4 mb-1"
              />
              <span className="heading-s text-heading-font  duration-200 hover:text-primary-darker">Go Back</span>
              </Link>
            </div>
          </div>

          <div>
            <div className="bg-panel-bg rounded shadow py-4 px-8 flex  items-center text-secondary-font mt-4 mb-8 ">
              <span className="mr-2 body">Status</span>
              <InvoiceStatusButton invoice={invoice} />

                <div className="hidden md:block mr-2 ml-auto">
                  <button className="btn bg-edit-btn hover:bg-edit-bg-hover text-primary-darker text-center duration-200 " onClick={(e) => toggleInvoiceFormVisible(true)}>
                    Edit
                  </button>
                </div>
                <div className="hidden md:block mr-2">
                  <button className="btn bg-delete-bg text-white hover:bg-delete-bg-hover duration-200">Delete</button>
                </div>
                <div className="hidden md:block">
                  <button className="btn bg-primary text-white hover:bg-primary-light duration-200">
                    Mark as Paid
                  </button>
                </div>

            </div>

            <div className="bg-panel-bg rounded shadow p-8 md:p-16 text-primary-darker my-4 ">
              <div className="flex flex-col md:flex-row justify-between w-full mb-8">
                <div className="mb-4 md:mb-0">
                  #<span className=" text-heading-font heading-s">{invoice.id}</span>
                  <p className="body mt-1">{invoice.project_description}</p>
                </div>
                <div className="md:text-right body">
                  <p>{invoice.bill_from_address}</p>
                  <p>{invoice.bill_from_city}</p>
                  <p>{invoice.bill_from_postcode}</p>
                  <p>{invoice.bill_from_country}</p>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-1 mb-16">
                  {/* First Column (Spans 2 Rows) */}
                  <div className="col-span-1 row-span-1 flex flex-col space-between">
                    <div className='mb-4'>
                      <p className="mb-2">Invoice Date</p>
                      <p className="text-heading-font heading-s mb-1">{getInvoiceDueDate(invoice.invoice_date)}</p>
                    </div>
                    <div>
                      <p className="mb-2">Payment Due</p>
                      <p className="text-heading-font heading-s mb-1">{getInvoiceDueDate(invoice.invoice_date,invoice.payment_terms)}</p>
                    </div>
                  </div>

                  {/* Second Column (Spans 2 Rows) */}
                  <div className="col-span-1 row-span-1 ">
                    <p className="mb-2">Bill To</p>
                    <p className="text-heading-font heading-s mb-1">{invoice.bill_to_name}</p>
                    <p className="text-heading-font">{invoice.bill_to_address}</p>
                    <p className="text-heading-font">{invoice.bill_to_city}</p>
                    <p className="text-heading-font">{invoice.bill_to_postcode}</p>
                    <p className="text-heading-font">{invoice.bill_to_country}</p>
                  </div>

                  {/* Third Column (Spans 2 Rows) */}
                  <div className="mt-4 md:mt-0 col-span-1 row-span-1">
                    <p className="mb-2">Sent To</p>
                    <p className="text-heading-font heading-s mb-1">
                      {invoice.bill_to_email}
                    </p>
                  </div>

                </div>
              </div>
              <div className="bg-table-background p-4 md:p-8 rounded-t-lg">
                <div className="relative overflow-x-auto ">
                  <table className="w-full text-sm text-left ">
                    <thead >
                      <tr className='hidden md:table-row'>
                        <th scope="col" className="px-6 py-4 body">
                          Item name
                        </th>
                        <th scope="col" className="px-6 py-4 body text-right hidden md:table-cell">
                          QTY.
                        </th>
                        <th scope="col" className="px-6 py-4 body text-right hidden md:table-cell">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4 body text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.item_list.map((invoice_item,i) => (
                        <tr className="heading-s">
                          <th scope="row" className="px-6 py-4 ">
                            <span className="text-heading-font ">
                              {invoice_item.name}
                            </span>
                            <span className="heading-s text-primary-darker block md:hidden">{invoice_item.qty} x ${invoice_item.price}</span>
                          </th>
                          <td className="px-6 py-4 text-right hidden md:table-cell ">{invoice_item.qty}</td>
                          <td className="px-6 py-4 text-right hidden md:table-cell ">${invoice_item.price}</td>
                          <td className="px-6 py-4 text-right ">
                            <span className="text-heading-font ">${invoice_item.price * invoice_item.qty}</span>
                          </td>
                        </tr>
                      ))}
                      
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-cost-summary rounded-b-lg text-white p-12 flex justify-between items-center">
                  <div>Amount Due</div>
                  <div className='heading-l'>${getInvoiceTotal(invoice.item_list)}</div>
              </div>

            
            </div>

            <div className='my-8 bg-white rounded shadow p-8 flex justify-between md:hidden '>
                <div >
                  <button className="btn bg-table-background text-primary text-center ">
                    Edit
                  </button>
                </div>
                <div >
                  <button className="btn bg-delete-bg text-white">Delete</button>
                </div>
                <div >
                  <button className="btn bg-primary text-white">
                    Mark as Paid
                  </button>
                </div>
              </div>
          </div>
      </Fragment>
}
    </Fragment>
  );
}