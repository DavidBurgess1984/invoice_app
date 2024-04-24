import { InvoiceType } from "./INVOICE_TYPE";
import Ajv, { ErrorObject,JSONSchemaType } from 'ajv';


export interface InvoiceCreateType {
    invoice:InvoiceType
  }

  // Define type for invoice data
export interface InvoiceData {
  bill_from_address: string;
  bill_from_city: string;
  bill_from_country: string;
  bill_from_postcode: string;
  bill_to_name: string;
  bill_to_email: string;
  bill_to_address: string;
  bill_to_city: string;
  bill_to_country: string;
  bill_to_postcode: string;
  invoice_date: string;
  payment_terms: number;
  project_description: string;
  status: string;
  slug: string;
  item_list: {
    id: string;
    name: string;
    qty: number;
    price: number;
    invoiceId:string;
  }[];
}



export const InvoiceSchema: JSONSchemaType<InvoiceData> = {
  type: 'object',
  properties: {
    bill_from_address: { type: 'string', minLength: 1 },
    bill_from_city: { type: 'string', minLength: 1 },
    bill_from_country: { type: 'string', minLength: 1 },
    bill_from_postcode: { type: 'string', minLength: 1 },
    bill_to_name: { type: 'string', minLength: 1 },
    bill_to_email: { type: 'string', format: 'email' },
    bill_to_address: { type: 'string', minLength: 1 },
    bill_to_city: { type: 'string', minLength: 1 },
    bill_to_country: { type: 'string', minLength: 1 },
    bill_to_postcode: { type: 'string', minLength: 1 },
    invoice_date: { type: 'string', format: 'date-time' },
    payment_terms: { type: 'integer', minimum: 0 },
    project_description: { type: 'string', minLength: 1 },
    status: { type: 'string' },
    slug: { type: 'string', minLength: 1 },
    item_list: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', minLength: 1 },
          name: { type: 'string', minLength: 1 },
          qty: { type: 'integer', minimum: 1 },
          price: { type: 'number', minimum: 0 },
          invoiceId: { type: 'string', minLength: 1 }
        },
        required: ['id', 'name', 'qty', 'price']
      }
    }
  },
  required: [
    'bill_from_address',
    'bill_from_city',
    'bill_from_country',
    'bill_from_postcode',
    'bill_to_name',
    'bill_to_email',
    'bill_to_address',
    'bill_to_city',
    'bill_to_postcode',
    'invoice_date',
    'payment_terms',
    'project_description',
    'slug'
  ],
  errorMessage: "should be a valid entry",
};

export interface Errors {
  [key: string]: string;
}

export interface ApiResponse{
  "result": string,
  "errors": Errors
}

export interface PropertyMap{
  [key:string]: string
}

export const propertyMap:PropertyMap = {
  "bill_from_address":"billFromAddress",
  "bill_from_city":"billFromCity",
  "bill_from_country":"billFromCountry",
  "bill_from_postcode":"billFromPostcode",
  "bill_to_name":"billToName",
  "bill_to_email":"billToEmail",
  "bill_to_address":"billToAddress",
  "bill_to_city":"billToCity",
  "bill_to_country":"billToCountry",
  "bill_to_postcode":"billToPostcode",
  "invoice_date":"billInvoiceDate",
  "payment_terms":"billToTerms",
  "project_description":"billToDescription",
  "status":"status",
  "slug":"slug",
  "item_list":"invoiceItems"
}