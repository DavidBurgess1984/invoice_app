import { InvoiceProps } from "../types/INVOICE_TYPE"

const InvoiceStatusButton: React.FC<InvoiceProps> = ({invoice}) => {
    
    let statusBgClass = "",statusFontClass = "",statusCircleClass="";

    switch(invoice.status){
        case 'paid':
            statusBgClass = "bg-success-bg"
            statusFontClass = "text-success-font"
            statusCircleClass = "bg-success-font"
        break;
        case 'draft':
            statusBgClass = "bg-draft-bg"
            statusFontClass = "text-draft-font"
            statusCircleClass = "bg-draft-font"
        break;
        case 'pending':
            statusBgClass = "bg-pending-bg"
            statusFontClass = "text-pending-font"
            statusCircleClass = "bg-pending-font"
        break;
    }

    return (
        <span className={statusFontClass+" p-2 px-4 "+statusBgClass+" rounded inline-block mr-4 heading-s w-[7rem] text-center"}>
            <span className={"w-2 h-2 rounded-lg "+statusCircleClass+" inline-block mr-4"}></span>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </span>
    )
}

export default InvoiceStatusButton