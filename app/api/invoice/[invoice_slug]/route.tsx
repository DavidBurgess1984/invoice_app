import { getPrismaClient } from '@/src/prisma/prisma';
import { InvoiceType,InvoiceItemType, InvoiceItemUpdateType,invoiceItem } from '@/src/types/INVOICE_TYPE';
import { NextApiRequest, NextApiResponse } from 'next';
import Ajv, { ErrorObject,JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import AjvErrors from 'ajv-errors';
import { InvoiceSchema, Errors, ApiResponse, PropertyMap, propertyMap } from '@/src/types/PAYLOAD_TYPE';



export async function GET(request: Request,{ params }: { params: { invoice_slug: string } }) {
  const prisma = getPrismaClient();
  const slug = params.invoice_slug

  const invoice =  await prisma.invoice.findFirst({
    where: {
      slug: slug, // Replace with the actual slug you want to search for
    },
    include: {
      item_list: true,
    },
  });


  const formattedInvoiceList =  invoice?.item_list.map((item:invoiceItem) => ({
      ...item,
      price:item.price ? parseFloat(item.price.toFixed(2)):null
    }))

  const formattedInvoice = {
    ...invoice,
    item_list:formattedInvoiceList
  }



  if(formattedInvoice){
    return Response.json(formattedInvoice)
  } else {
    return new Response('Invoice not found', {
      status: 404
    })
  }

  
}

export async function POST(request: Request,{ params }: { params: { invoice_slug: string } }) {
  const prisma = getPrismaClient();
  const slug = params.invoice_slug

  const invoice =  await prisma.invoice.findFirst({
    where: {
      slug: slug, // Replace with the actual slug you want to search for
    },
    include: {
      item_list: true,
    },
  });

  if(invoice == null){
    return new Response("Error", {
      status: 500
    })
  }



  const  invoiceData =await request.json()
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

  const { item_list, ...mainData } = invoiceData;

  const updatedInvoice = await prisma.invoice.update({
    where: {
      id: invoice?.id,
    },
    data: {
      ...mainData,
    },
    include: {
      item_list: true,
    },
  });

  const updatedItems = await Promise.all(
    item_list.map(async (item:InvoiceItemUpdateType) => {

      if (item.invoiceId) {
        return prisma.invoiceItem.update({
          where: { id: item.id },
          data: {
            ...item,
            qty: item.qty,
            price: item.price,
          },
        });
      }
      return null;
    })
  );

  const createdItems = await prisma.invoiceItem.createMany({
    data: item_list
      .filter((item:InvoiceItemUpdateType) => !item.invoiceId)
      .map((item:InvoiceItemUpdateType) => ({
        ...item,
        qty: item.qty,
        price: item.price,
        invoiceId: updatedInvoice.id,
      })),
  });

  const removedItems = await prisma.invoiceItem.deleteMany({
    where: {
      invoiceId: updatedInvoice.id,
      id: {
        notIn: item_list.map((item:InvoiceItemType) => item.id).filter(Boolean), // Filter out undefined (new items)
      },
    },
  });


    return Response.json(true)
 
} 

export async function DELETE(request: Request,{ params }: { params: { invoice_slug: string } }) {
  const prisma = getPrismaClient();
  const slug = params.invoice_slug

  const invoice =  await prisma.invoice.findFirst({
    where: {
      slug: slug, // Replace with the actual slug you want to search for
    },
    include: {
      item_list: true,
    },
  });

  if(invoice == null){
    return new Response(JSON.stringify('Unfound'), {
      status: 422
    })
  }
  

  const removedItems = await prisma.invoice.deleteMany({
      where: {
        slug: slug,
        
      },
    });


  if(removedItems){
    return Response.json(true)
  } else {
    return new Response('Invoice not found', {
      status: 404
    })
  }

  
}
