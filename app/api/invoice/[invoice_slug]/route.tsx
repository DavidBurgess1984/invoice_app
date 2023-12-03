import { InvoiceType } from '@/src/types/INVOICE_TYPE';
import { NextApiRequest, NextApiResponse } from 'next';


const invoices = [
  {
    id: "wer435435",
    bill_from_address: "123 Baker St",
    bill_from_city: "Glasgow",
    bill_from_postcode: "PA4 0LA",
    bill_from_country:"United Kingdom",
    bill_to_name: "David Burgess",
    bill_to_email:"davidburgess1984@gmail.com",
    bill_to_address:"10 Downing Street",
    bill_to_city:"London",
    bill_to_postcode:"ewew qweqw",
    bill_to_country:"UK",
    invoice_date:"2023-10-01",
    payment_terms:10,
    project_description:"Test Description",
    item_list:[
      {
        name:"Do this",
        qty:2,
        price: 10.99
      }
    ],
    status:"paid"
  },
  {
    id: "wer435437",
    bill_from_address: "123 Baker St",
    bill_from_city: "Glasgow",
    bill_from_postcode: "PA4 0LA",
    bill_from_country:"United Kingdom",
    bill_to_name: "David Burgess",
    bill_to_email:"davidburgess1984@gmail.com",
    bill_to_address:"10 Downing Street",
    bill_to_city:"London",
    bill_to_postcode:"ewew qweqw",
    bill_to_country:"UK",
    invoice_date:"2023-10-01",
    payment_terms:10,
    project_description:"Test Description",
    item_list:[
      {
        name:"Do this",
        qty:2,
        price: 10.99
      }
    ],
    status:"draft"
  },
  {
    id: "wer435436",
    bill_from_address: "123 Baker St",
    bill_from_city: "Glasgow",
    bill_from_postcode: "PA4 0LA",
    bill_from_country:"United Kingdom",
    bill_to_name: "David Burgess",
    bill_to_email:"davidburgess1984@gmail.com",
    bill_to_address:"10 Downing Street",
    bill_to_city:"London",
    bill_to_postcode:"ewew qweqw",
    bill_to_country:"UK",
    invoice_date:"2023-10-01",
    payment_terms:10,
    project_description:"Test Description",
    item_list:[
      {
        name:"Do this",
        qty:2,
        price: 10.99
      }
    ],
    status:"pending"
  }
]


export async function GET(request: Request,{ params }: { params: { invoice_slug: string } }) {
  
  const slug = params.invoice_slug

  let invoiceData:InvoiceType | undefined;

  invoices.forEach(invoice => {
    if(invoice.id === slug){
      invoiceData = invoice;
    }
  })

  if(invoiceData){
    return Response.json(invoiceData)
  } else {
    return new Response('Invoice not found', {
      status: 404
    })
  }

  
}