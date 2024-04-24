import { InvoiceType,InvoiceItemType, invoiceItem } from '@/src/types/INVOICE_TYPE';
import { NextApiRequest, NextApiResponse } from 'next';
import {getPrismaClient} from '@/src/prisma/prisma';
import Ajv from 'ajv';
import { InvoiceSchema, Errors, ApiResponse, propertyMap, PropertyMap } from '@/src/types/PAYLOAD_TYPE';
import addFormats from 'ajv-formats';
import AjvErrors from 'ajv-errors';



export async function GET(request: Request) {
  const prisma = getPrismaClient();
  const url = request.url
  // Extracting query string from URL
  const queryString = url.split('?')[1];
  let statuses:string[] = []

  if (queryString) {
      // Parsing query string to get parameters
      const params = new URLSearchParams(queryString);

      if (params.has('s[]')) {
          // 's[]' parameter is set in the query string
          statuses = params.getAll('s[]');
          console.log('Statuses:', statuses);
      } 
  } 
  
  const invoices =  await prisma.invoice.findMany({
    include: {
      item_list: true,
    },
    where: {
      status: {
          // Conditionally add the 'in' filter if statuses array is not empty
          ...(statuses.length > 0 && {
              in: statuses,
          }),
      },
   },
    orderBy: {
      invoice_date: 'desc',
    },
  });

  // @ts-ignore
  const roundedInvoices = invoices.map(invoice => {
    const roundedItems = invoice.item_list.map((item:invoiceItem) => ({
      ...item,
      price:item.price ? parseFloat(item.price.toFixed(2)):null
    }))

    return {
      ...invoice,
      item_list:roundedItems
    }
  })

  return Response.json(roundedInvoices)

}

export async function POST(request: Request) {


  const prisma = getPrismaClient();
  const  invoiceData =await request.json()
  const { item_list, ...mainData } = invoiceData;
  const ajv = new Ajv({allErrors: true})
  
  addFormats(ajv);
  AjvErrors(ajv);
  const validate = ajv.compile(InvoiceSchema);
  const valid = validate(invoiceData);

  if(!valid){
    
    const errors: Errors = {};
    const response: ApiResponse = {"result":"","errors":errors};
    // console.log(validate.errors)

    validate.errors?.forEach(error => {

      error.params.errors.forEach((errorLog:PropertyMap) => {

        let key = errorLog.instancePath ? errorLog.instancePath.substring(1) : ""; // Perform null check

        const value = error.message?.toString() || ""; // Use empty string as fallback

        if(typeof propertyMap[key] !== "undefined"){
          key = propertyMap[key]
        }

        const regex = /item_list\/\d+\/\w+/;
        if (regex.test(key)) {
          key = key.replace(/item_list\/(\d+)\/(.+)/, "invoice-item-$2-$1");
        }

        errors[key] = value;
      });
      
    })

    response["errors"] = errors;
    response["result"] = "failure";

    return new Response(JSON.stringify(response), {
      status: 422
    })
  }
  // Create a new invoice record using Prisma
  const createdInvoice = await prisma.invoice.create({
    data: {
      ...mainData,
      item_list: {
        // Create associated InvoiceItem records
        create: item_list.map((item:InvoiceItemType) => ({
          ...item,
          qty:item.qty,
          price:item.price
        })) ,
      },
    },
    include: {
      // Include related InvoiceItem records in the response
      item_list: true,
    },
  });

  if(createdInvoice){
    return Response.json(createdInvoice)
  } else {
    return new Response('Invoice not created', {
      status: 404
    })
  }
} 