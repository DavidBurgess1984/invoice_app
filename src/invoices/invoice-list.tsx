
import React from 'react'
import InvoiceListItem from './invoice-list-item'
import { InvoiceListProps } from '../types/INVOICE_TYPE'



const InvoiceList: React.FC<InvoiceListProps> = ({invoices}) => {
    return (
        <div >
            {invoices.map((invoice,i) => (
                <InvoiceListItem key={'invoice-'+i} invoice={invoice} />
            ))}
        </div>
    )
}

export default InvoiceList