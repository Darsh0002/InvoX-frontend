export const formatInvoiceData = (invoiceData) => {
  const {
    title,
    company = {},
    invoice = {},
    account = {},
    billing = {},
    shipping = {},
    tax = 0,
    notes = "",
    items = [],
    logo = "",
  } = invoiceData || {};

  const currencySymbol = "₹";
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (parseFloat(item.amount) || 0) * (parseFloat(item.qty) || 0),
    0
  );
  const taxAmount = (subtotal * (parseFloat(tax) || 0)) / 100;
  const total = subtotal + taxAmount;

  return {
    title,
    companyName: company.name || "",
    companyNumber: company.number || "",
    companyAddress: company.address || "",
    companyLogo: logo || "",

    invoiceNumber: invoice.number || "",
    invoiceDate: invoice.date || "",
    invoiceDueDate: invoice.dueDate || "",

    accountHolderName: account.holderName || "",
    accountNumber: account.number || "",
    bankName: account.bankName || "",

    billingName: billing.name || "",
    billingPhone: billing.phone || "",
    billingAddress: billing.address || "",

    shippingName: shipping.name || "",
    shippingPhone: shipping.phone || "",
    shippingAddress: shipping.address || "",

    taxRate: parseFloat(tax) || 0,
    notes,
    items: items.map((item, index) => ({
      id: index + 1,
      name: item.name || "",
      description: item.description || "",
      qty: parseFloat(item.qty) || 0,
      amount: parseFloat(item.amount) || 0,
      total: (parseFloat(item.amount) || 0) * (parseFloat(item.qty) || 0),
    })),
    subtotal,
    taxAmount,
    total,
    currencySymbol,
  };
};
