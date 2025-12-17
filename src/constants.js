export const initialInvoiceData = {
  title: "New Invoice",

  billing: {
    name: "",
    phone: "",
    address: "",
  },

  shipping: {
    name: "",
    phone: "",
    address: "",
  },

  invoice: {
    number: "",
    date: "",
    dueDate: "",
  },

  account: {
    holderName: "",
    number: "",
    bankName: "",
  },

  company: {
    name: "",
    number: "",
    address: "",
  },

  tax: 0,

  notes: "",

  items: [
    {
      name: "",
      qty: "",
      amount: "",
      description: "",
      total: 0,
    },
  ],

  logo: "",
};