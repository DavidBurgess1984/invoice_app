export interface InvoiceType {
    id: string;
    bill_from_address: string,
    bill_from_city: string,
    bill_from_postcode: string,
    bill_from_country:string,
    bill_to_name: string,
    bill_to_email:string,
    bill_to_address:string,
    bill_to_city:string,
    bill_to_postcode:string,
    bill_to_country:string,
    invoice_date:string,
    payment_terms:number,
    project_description:string,
    item_list: InvoiceItemType[],
    status:string
  }
  

  export interface InvoiceItemType {
    name: string,
    qty: number,
    price: number
  }

  export interface InvoiceListProps {
    invoices: InvoiceType[];
  }

  export interface InvoiceProps {
    invoice: InvoiceType;
  }