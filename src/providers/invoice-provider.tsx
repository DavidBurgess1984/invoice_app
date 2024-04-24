import React, { useContext, useState,ReactNode, useEffect } from "react";
import { InvoiceFilters, InvoiceType } from "../types/INVOICE_TYPE";


interface InvoiceContextType {
  invoice: InvoiceType | undefined;
  setInvoice: (invoice: InvoiceType | undefined) => void;
  getInvoice: (invoiceSlug:string) => void;
  invoices: InvoiceType[] 
  setInvoices:(invoices: InvoiceType[] ) => void;
  getInvoices: (qString: string) => void;
  invoiceFormLoading:boolean;
  invoicesLoading:boolean;
}

const InvoiceContext = React.createContext<InvoiceContextType | null>(null);

interface InvoiceProviderProps {
  children: ReactNode;
}

const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoice,setInvoice] = useState<InvoiceType | undefined>(undefined)
  const [invoiceFormLoading,setInvoiceFormLoading] = useState(true)
  const [invoices,setInvoices] = useState<InvoiceType[] >([])
  const [invoicesLoading,setInvoicesLoading] = useState(true)


  const getInvoice = async(invoiceSlug:string) => {

      try {
        setInvoiceFormLoading(true)
        const response = await fetch('/api/invoice/'+invoiceSlug);
        const result = await response.json();
        setInvoice(result);
        setInvoiceFormLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }
  
  const getInvoices = async (qString:string) => {
    try {
      
      setInvoicesLoading(true)
      const response = await fetch(`/api/invoice${qString}`);
      const result = await response.json();
      setInvoices(result);
      setInvoicesLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        setInvoice,
        getInvoice,
        invoiceFormLoading,
        invoices,
        getInvoices,
        setInvoices,
        invoicesLoading
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

const useInvoice = (): InvoiceContextType => {
  const context = useContext(InvoiceContext);
  if (context === null) {
    throw new Error("useInvoice() called outside of a InvoiceProvider?");
  }
  return context;
};

export { InvoiceProvider, useInvoice };
