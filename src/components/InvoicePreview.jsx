import React, { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import Template1 from "../templates/Template1.jsx";
import { templateComponents } from "../util/invoiceTemplate.js";

const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {
  const formattedData = formatInvoiceData(invoiceData);

  const SelectedTemplate = templateComponents[template] || Template1;

  return (
    <div ref={ref}>
      <SelectedTemplate data={formattedData} />
    </div>
  );
});

export default InvoicePreview;
