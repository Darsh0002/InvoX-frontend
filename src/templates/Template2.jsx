import React from "react";
import { Phone, Building } from "lucide-react";

const Template2 = ({ data }) => {
  const {
    title,
    companyName,
    companyAddress,
    companyLogo, // If omitted, shows "YOUR LOGO" text

    invoiceNumber,
    invoiceDate,

    billingName,
    billingAddress, // Not explicitly shown in top section of target image, but good to have

    items,
    subtotal,
    taxRate,
    taxAmount,
    total,
    currencySymbol,

    // Bottom Left Info Section Data
    contactAddress,
    contactPhone,
    terms,
  } = data || {};

  // Custom colors based on the image
  const colors = {
    teal: "#63B3C0",
    lightTeal: "#A8D4DB",
    purple: "#8854C0",
    textDark: "#333333",
    textGray: "#666666",
  };

  return (
    <div
      className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg overflow-hidden font-sans relative flex flex-col print:shadow-none"
      style={{ color: colors.textDark }}
    >
      {/* --- HEADER SECTION WITH WAVES --- */}
      <div className="relative h-75">
        {/* SVG Waves */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 600 300"
          preserveAspectRatio="none"
        >
          {/* Lighter secondary wave underneath */}
          <path
            d="M0,0 V220 Q150,280 300,200 Q450,120 600,160 V0 Z"
            fill={colors.lightTeal}
            opacity="0.6"
          />
          {/* Main Teal wave */}
          <path
            d="M0,0 V180 Q180,250 350,150 Q480,80 600,100 V0 Z"
            fill={colors.teal}
          />
        </svg>

        <div className="relative z-10 px-12 pt-12 flex justify-between">
          {/* Left Side Title */}
          <div>
            <h1 className="text-7xl font-bold text-white tracking-wide">
              {title || "INVOICE"}
            </h1>
          </div>

          {/* Right Side Company Info & Logo */}
          <div className="text-right flex flex-col items-end">
            <div className="mb-6">
              {companyLogo && (
                <img
                  src={companyLogo}
                  alt="Logo"
                  className="h-16 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- BILLING & INVOICE DETAILS SECTION --- */}
      <div className="px-12 mt-4 flex justify-between items-start">
        {/* Left Side: Billing/Invoice To */}
        <div className="w-1/2">
          <p
            className="font-bold text-lg mb-2"
            style={{ color: colors.purple }}
          >
            Invoice <span className="font-normal text-gray-600">to</span>
          </p>
          <h2 className="text-2xl font-medium mb-2">
            {billingName || "Client"}
          </h2>
          <p className="text-lg text-gray-600 whitespace-pre-line">
            {billingAddress || companyAddress}
            {/* Using billing address, fallback to company address */}
          </p>
        </div>

        {/* Right Side: Invoice Number & Date */}
        <div className="w-1/2 text-right flex flex-col items-end gap-y-2 pt-2">
          <div className="flex gap-8 text-lg">
            <span className="font-bold" style={{ color: colors.purple }}>
              Invoice No.
            </span>
            <span className="font-medium text-gray-700">
              {invoiceNumber || "INV-001"}
            </span>
          </div>
          <div className="flex gap-8 text-lg">
            <span className="font-bold" style={{ color: colors.purple }}>
              Date
            </span>
            <span className="font-medium text-gray-700">
              {invoiceDate || new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="px-12 mt-16 mb-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-white" style={{ backgroundColor: colors.teal }}>
              <th className="py-3 pl-8 pr-4 text-lg font-medium rounded-l-full w-24 text-center">
                Qty.
              </th>
              <th className="py-3 px-4 text-lg font-medium">
                Item Description
              </th>
              <th className="py-3 px-4 text-lg font-medium text-center">
                Price
              </th>
              <th className="py-3 pl-4 pr-8 text-lg font-medium rounded-r-full text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 last:border-0 text-lg"
                >
                  <td className="py-5 px-4 text-center font-bold">
                    {item?.qty || 0}
                  </td>
                  <td className="py-5 px-4 font-bold">
                    {item?.name || "Item"}
                  </td>
                  <td className="py-5 px-4 text-center font-bold">
                    {currencySymbol || "$"}
                    {parseFloat(item?.amount || 0).toFixed(2)}
                  </td>
                  <td className="py-5 px-8 text-right font-bold">
                    {currencySymbol || "$"}
                    {parseFloat(item?.total || 0).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-b border-gray-300 text-lg">
                <td className="py-5 px-4 text-center font-bold">1</td>
                <td className="py-5 px-4 font-bold">Sample Item</td>
                <td className="py-5 px-4 text-center font-bold">
                  {currencySymbol || "$"}0.00
                </td>
                <td className="py-5 px-8 text-right font-bold">
                  {currencySymbol || "$"}0.00
                </td>
              </tr>
            )}
            {/* Add empty row for spacing if needed, mimicking the image's large gap */}
            <tr className="border-b border-gray-300 h-16">
              <td colSpan="4"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- BOTTOM SECTION (Split Info & Totals) --- */}
      <div className="px-12 mt-12 pb-16 flex justify-between items-start">
        {/* LEFT COLUMN: Info, Social, Terms */}
        <div className="w-1/2 pr-10">
          {/* Info block */}
          <div className="mb-8">
            <h3
              className="font-bold text-lg mb-4"
              style={{ color: colors.purple }}
            >
              Info:
            </h3>
            <ul className="text-gray-600 space-y-2 text-lg">
              <li>{contactAddress || "Company Address"}</li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                {contactPhone || "+1 234 567 890"}
              </li>
            </ul>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h3
              className="font-bold text-lg mb-3"
              style={{ color: colors.purple }}
            >
              Terms & Conditions
            </h3>
            <p className="text-gray-600 max-w-sm leading-relaxed text-base">
              {terms ||
                "Payment is due within 30 days. Late payments may incur additional fees."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Totals */}
        <div className="w-1/2 pl-10 flex flex-col items-end">
          <div className="w-full max-w-sm space-y-3">
            <div
              className="flex justify-between py-2 text-lg font-bold"
              style={{ color: colors.teal }}
            >
              <span>Sub Total:</span>
              <span style={{ color: colors.textDark }}>
                {currencySymbol || "$"}
                {parseFloat(subtotal || 0).toFixed(2)}
              </span>
            </div>
            <div
              className="flex justify-between py-2 text-lg font-bold"
              style={{ color: colors.teal }}
            >
              <span>Tax {taxRate > 0 ? `(${taxRate}%)` : ""}:</span>
              <span style={{ color: colors.textDark }}>
                {currencySymbol || "$"}
                {parseFloat(taxAmount || 0).toFixed(2)}
              </span>
            </div>

            <div className="border-t-2 border-gray-300 w-full my-4"></div>

            <div className="flex justify-between items-center py-3">
              <span
                className="text-3xl font-bold"
                style={{ color: colors.teal }}
              >
                Total:
              </span>
              <span
                className="text-3xl font-bold"
                style={{ color: colors.textDark }}
              >
                {currencySymbol || "$"}
                {parseFloat(total || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Thank You Message */}
          <div
            className="mt-16 font-bold text-sm tracking-widest uppercase"
            style={{ color: colors.teal }}
          >
            THANK YOU FOR YOUR BUSINESS!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;
