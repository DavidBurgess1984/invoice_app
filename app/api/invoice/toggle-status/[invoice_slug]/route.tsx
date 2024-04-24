
import {getPrismaClient} from '@/src/prisma/prisma';

export async function POST(request: Request,{ params }: { params: { invoice_slug: string } }) {
  const prisma = getPrismaClient();
  const slug = params.invoice_slug

  const invoice =  await prisma.invoice.findFirst({
    where: {
      slug: slug, // Replace with the actual slug you want to search for
    }
  });


  if(invoice == null){
    return new Response("Error", {
      status: 500
    })
  }



  const  invoiceData =await request.json()

  const { status } = invoiceData;

  const updatedInvoice = await prisma.invoice.update({
    where: {
      id: invoice?.id,
    },
    data: {
      status:status,
    }
  });



  return Response.json(true)
 
} 