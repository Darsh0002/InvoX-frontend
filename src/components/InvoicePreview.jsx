import React, { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import Template1 from "../templates/Template1.jsx";

const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {
    
  const formattedData =   formatInvoiceData(invoiceData);
  
  return <div ref={ref}>
      <Template1 data={formattedData} />
    </div>;
});

export default InvoicePreview;
