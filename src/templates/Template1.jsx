import React from "react";
import { Phone, Building, User, CreditCard } from "lucide-react";

const Template1 = ({ data }) => {
  const {
    title = "INVOICE",
    companyName,
    companyNumber,
    companyAddress,
    companyLogo,

    invoiceNumber,
    invoiceDate,
    invoiceDueDate,

    accountHolderName,
    accountNumber,
    bankName,

    billingName,
    billingPhone,
    billingAddress,

    items = [],
    subtotal,
    taxRate,
    taxAmount,
    total,
    currencySymbol = "$",
    notes,
  } = data || {};

  return (
    <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg overflow-hidden font-sans relative flex flex-col justify-between print:shadow-none">
      {/* --- HEADER SECTION --- */}
      <div className="relative">
        {/* Orange Curve Background */}
        <div className="absolute top-0 right-0 w-[80%] h-64 bg-amber-500 rounded-bl-[100%] z-0"></div>

        {/* Dark Blue Curve Background */}
        <div className="absolute top-0 left-0 w-[70%] h-56 bg-slate-900 rounded-br-[100%] z-10 flex items-center pl-12 pt-4">
          <h1 className="text-6xl font-extrabold text-white tracking-widest uppercase">
            {title}
          </h1>
          {/* Decorative Dots */}
          <div className="absolute top-6 left-6 grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === 4 ? "bg-amber-500" : "border border-white"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Decorative Top Right Dots */}
        <div className="absolute top-10 right-10 z-20 grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-amber-200"
            ></div>
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-20 pt-60 px-12 flex justify-between items-start">
          {/* LEFT COLUMN: Invoice Details & Billing Details */}
          <div className="text-slate-800 w-1/2 pr-4">
            <div className="mb-8">
              <p className="font-bold text-sm tracking-wide">
                INVOICE NO.:{" "}
                <span className="font-normal">{invoiceNumber}</span>
              </p>
              <p className="font-bold text-sm tracking-wide mt-1">
                DATE: <span className="font-normal">{invoiceDate}</span>
              </p>
              {invoiceDueDate && (
                <p className="font-bold text-sm tracking-wide mt-1 text-amber-600">
                  DUE DATE:{" "}
                  <span className="font-normal text-slate-800">
                    {invoiceDueDate}
                  </span>
                </p>
              )}
            </div>

            {/* Billing Details (Moved to Left Side) */}
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <p className="font-bold uppercase text-xs text-slate-500 mb-1">
                Bill To:
              </p>
              <p className="font-bold text-lg text-slate-900">{billingName}</p>
              {billingPhone && (
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                  <Phone size={12} /> {billingPhone}
                </div>
              )}
              <p className="text-sm text-slate-600 mt-1 w-full max-w-[250px] break-words leading-relaxed">
                {billingAddress}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Company Info Only */}
          <div className="text-right w-1/2 pl-4 flex flex-col items-end">
            {/* Logo Section */}
            <div className="flex justify-end items-center mb-6">
              {companyLogo && (
                <img
                  src={companyLogo}
                  alt="Logo"
                  className="h-20 object-contain" /* Increased logo height slightly */
                />
              )}
            </div>

            {/* Company Info */}
            <div className="text-right">
              <p className="font-black text-slate-900 text-lg tracking-tight">
                {companyName}
              </p>

              <p className="text-sm text-slate-600 max-w-xs ml-auto wrap-break-word mt-2 leading-snug">
                {companyAddress}
              </p>

              {companyNumber && (
                <p className="text-sm font-semibold text-slate-400 mt-3">
                  Reg No: {companyNumber}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="px-12 mt-10 mb-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-amber-500 text-white">
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider w-[45%] rounded-l-md">
                Item Name
              </th>
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-center">
                Price
              </th>
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-center">
                Qty
              </th>
              <th className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-right rounded-r-md">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-700 text-sm">
            {items.map((item, index) => (
              <tr
                key={item.id || index}
                className="even:bg-gray-100 border-b border-gray-100 last:border-0 hover:bg-amber-50 transition-colors"
              >
                <td className="py-4 px-4 font-medium">
                  <p className="text-slate-900">{item.name}</p>
                  {item.description && (
                    <p className="text-xs text-gray-500 font-normal mt-0.5 max-w-sm">
                      {item.description}
                    </p>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  {currencySymbol}
                  {parseFloat(item.amount || 0).toFixed(2)}
                </td>
                <td className="py-4 px-4 text-center">{item.qty}</td>
                <td className="py-4 px-4 text-right font-bold text-slate-800">
                  {currencySymbol}
                  {item.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- TOTALS SECTION --- */}
        <div className="flex justify-end mt-6">
          <div className="w-1/2 max-w-xs">
            <div className="flex justify-between py-2 text-amber-500 font-bold text-sm">
              <span>SUBTOTAL</span>
              <span className="text-slate-900">
                {currencySymbol}
                {parseFloat(subtotal || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-2 text-amber-500 font-bold text-sm border-b border-gray-100">
              <span>TAX {taxRate ? `(${taxRate}%)` : ""}</span>
              <span className="text-slate-900">
                {currencySymbol}
                {parseFloat(taxAmount || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 mt-2 bg-slate-900 text-white rounded-sm font-bold shadow-md">
              <span>GRAND TOTAL</span>
              <span className="text-xl">
                {currencySymbol}
                {parseFloat(total || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER SECTION --- */}
      <div className="relative mt-12 pb-12">
        <div className="px-12 relative z-20 flex justify-between items-end gap-10">
          <div className="w-full max-w-2xl">
            {/* Notes */}
            {notes && (
              <div className="mb-6 text-sm">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  Notes:
                </h3>
                <p className="text-slate-600 italic border-l-2 border-amber-300 pl-2">
                  {notes}
                </p>
              </div>
            )}

            {/* Bank/Payment Info */}
            {(bankName || accountHolderName || accountNumber) && (
              <div className="text-sm bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm relative z-30 max-w-md">
                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide text-xs">
                  Payment Info
                </h3>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {bankName && (
                    <div className="col-span-2 flex items-center gap-2">
                      <Building size={14} className="text-amber-500" />
                      <span className="font-semibold text-slate-700">
                        {bankName}
                      </span>
                    </div>
                  )}
                  {accountHolderName && (
                    <div className="col-span-2 flex items-center gap-2">
                      <User size={14} className="text-amber-500" />
                      <span className="text-slate-600">Name:</span>
                      <span className="font-medium text-slate-900">
                        {accountHolderName}
                      </span>
                    </div>
                  )}
                  {accountNumber && (
                    <div className="col-span-2 flex items-center gap-2">
                      <CreditCard size={14} className="text-amber-500" />
                      <span className="text-slate-600">Acct No:</span>
                      <span className="font-medium text-slate-900 font-mono tracking-wide">
                        {accountNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Left Dark Curve */}
        <div className="absolute bottom-0 left-0 w-48 h-32 bg-slate-900 rounded-tr-[100%] z-10 flex items-end justify-start p-6">
          {/* Dots in Footer */}
          <div className="grid grid-cols-4 gap-1 mb-2 ml-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Decorative Bottom Right Circles */}
        <div className="absolute bottom-6 right-12 flex gap-4 items-end">
          <div className="w-4 h-4 rounded-full border border-slate-300"></div>
          <div className="w-3 h-3 rounded-full border border-slate-300"></div>
          <div className="w-6 h-6 rounded-full border-4 border-slate-900"></div>
          <div className="w-2 h-2 rounded-full bg-amber-500 mb-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Template1;
