import React from "react";
import { Phone, MapPin, Globe } from "lucide-react";

const Template3 = ({ data }) => {
  const {
    companyName,
    companyAddress,
    companyLogo,

    invoiceNumber,
    invoiceDate,

    billingName,
    billingAddress,

    bankName,
    accountHolderName,
    accountNumber,

    items = [],
    subtotal,
    taxRate,
    taxAmount,
    total,
    currencySymbol = "$",
    notes,

    // Assuming these might be in the data object based on the footer requirements
    companyPhone = "123-456-7890",
    companyWebsite = "www.yourwebsite.com",
  } = data || {};

  return (
    <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg overflow-hidden font-sans relative flex flex-col justify-between print:shadow-none">
      {/* --- HEADER SECTION --- */}
      <div>
        {/* Top Logo Area */}
        <div className="px-12 pt-10 pb-4">
          <div className="flex items-center gap-3">
            {companyLogo && (
              <img
                src={companyLogo}
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-wide leading-none">
                {companyName || "Brand Name"}
              </h1>
            </div>
          </div>
        </div>

        {/* Yellow Bar & Title Row */}
        <div className="flex items-center mb-12">
          {/* Left Yellow Bar */}
          <div className="h-12 bg-yellow-400 w-7/12"></div>

          {/* Title */}
          <div className="px-8">
            <h2 className="text-5xl font-normal text-slate-700 uppercase tracking-wider">
              INVOICE
            </h2>
          </div>

          {/* Right Yellow Bar */}
          <div className="h-12 bg-yellow-400 grow"></div>
        </div>

        {/* Invoice Info Grid */}
        <div className="px-12 flex justify-between items-start mb-12">
          {/* Left: Bill To */}
          <div className="w-1/2">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Invoice to:
            </h3>
            <p className="text-xl font-bold text-slate-700 mb-1">
              {billingName}
            </p>
            <div className="text-slate-500 font-medium leading-relaxed max-w-xs">
              {billingAddress}
            </div>
          </div>

          {/* Right: Details */}
          <div className="w-1/2 flex flex-col items-end">
            <div className="w-64 grid grid-cols-2 gap-y-2">
              <span className="font-bold text-slate-800 text-lg">Invoice#</span>
              <span className="text-right font-medium text-slate-600">
                {invoiceNumber}
              </span>

              <span className="font-bold text-slate-800 text-lg">Date</span>
              <span className="text-right font-medium text-slate-600">
                {invoiceDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="px-12 mb-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="py-3 px-4 font-medium uppercase text-sm w-16 text-center">
                SL.
              </th>
              <th className="py-3 px-4 font-medium uppercase text-sm">
                Item Description
              </th>
              <th className="py-3 px-4 font-medium uppercase text-sm text-center">
                Price
              </th>
              <th className="py-3 px-4 font-medium uppercase text-sm text-center">
                Qty.
              </th>
              <th className="py-3 px-4 font-medium uppercase text-sm text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 bg-gray-50/50"
              >
                <td className="py-4 px-4 text-center font-bold text-slate-700">
                  {index + 1}
                </td>
                <td className="py-4 px-4 font-bold text-slate-700">
                  {item.name}
                  {item.description && (
                    <p className="text-xs text-slate-500 font-normal mt-1">
                      {item.description}
                    </p>
                  )}
                </td>
                <td className="py-4 px-4 text-center font-bold text-slate-700">
                  {currencySymbol}
                  {parseFloat(item.amount).toFixed(2)}
                </td>
                <td className="py-4 px-4 text-center font-bold text-slate-700">
                  {item.qty}
                </td>
                <td className="py-4 px-4 text-right font-bold text-slate-700">
                  {currencySymbol}
                  {item.total.toFixed(2)}
                </td>
              </tr>
            ))}

            {/* Visual filler rows to match image style if items are few */}
            {items.length < 3 && (
              <tr className="border-b border-gray-200 h-16">
                <td colSpan="5"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- FOOTER BODY --- */}
      <div className="px-12 mt-8">
        <div className="flex justify-between items-start">
          {/* Left Column: Terms & Payment */}
          <div className="w-1/2 pr-10">
            <p className="font-bold text-slate-800 mb-6 text-lg">
              Thank you for your business
            </p>

            <div className="mb-6">
              <h4 className="font-bold text-slate-800 mb-1">
                Terms & Conditions
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {notes ||
                  "Payment is due within 15 days. Late payment may incur fees."}
              </p>
            </div>

            {/* Payment Info */}
            {(bankName || accountNumber) && (
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Payment Info:</h4>
                <div className="text-sm font-medium text-slate-700 grid grid-cols-[80px_1fr] gap-y-1">
                  <span>Account #:</span>
                  <span>{accountNumber}</span>

                  <span>A/C Name:</span>
                  <span>{accountHolderName}</span>

                  <span>Bank Details:</span>
                  <span>{bankName}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Totals */}
          <div className="w-5/12">
            <div className="flex justify-between items-center mb-2 font-bold text-slate-700">
              <span>Sub Total:</span>
              <span>
                {currencySymbol}
                {parseFloat(subtotal || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 font-bold text-slate-700">
              <span>Tax:</span>
              <span>{taxRate}%</span>
            </div>

            {/* Total Box */}
            <div className="bg-yellow-400 py-3 px-4 flex justify-between items-center text-slate-900 shadow-sm">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-xl">
                {currencySymbol}
                {parseFloat(total || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM FOOTER --- */}
      <div className="mt-12">
        {/* Yellow Bottom Line */}
        <div className="h-1 bg-yellow-400 w-full mb-6"></div>

        <div className="px-12 pb-12 flex justify-between items-end">
          {/* Contact Details */}
          <div className="flex gap-8 text-sm font-bold text-slate-700">
            <div className="flex items-center gap-2">
              <span className="uppercase">Phone #</span>
              <span className="font-normal border-l border-slate-400 pl-2">
                {companyPhone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="uppercase">Address</span>
              <span className="font-normal border-l border-slate-400 pl-2 max-w-50 truncate">
                {companyAddress}
              </span>
            </div>
          </div>

          {/* Signature */}
          <div className="text-center">
            <div className="w-40 border-b border-slate-400 mb-2"></div>
            <p className="font-bold text-slate-700 text-sm">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3;
