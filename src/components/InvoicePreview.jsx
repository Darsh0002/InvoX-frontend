import React, { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import Template1 from "../templates/Template1.jsx";
import Template2 from "../templates/Template2.jsx";

const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {
    
  const formattedData =   formatInvoiceData(invoiceData);
  
  return <div ref={ref}>
      {/* <Template1 data={formattedData} /> */}
      <Template2 data={formattedData} />
    </div>;
});

export default InvoicePreview;
