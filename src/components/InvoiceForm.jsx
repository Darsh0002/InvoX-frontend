import { Trash2, Plus } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const InvoiceForm = () => {
  const { invoiceData, setInvoiceData } = useContext(AppContext);
  const addItem = () => {
    const newItem = {
      name: "",
      qty: "",
      amount: "",
      description: "",
      total: 0,
    };
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, newItem],
    });
  };

  const deleteItem = (index) => {
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSameAsBilling = (e) => {
    if (e.target.checked) {
      setInvoiceData((prev) => ({
        ...prev,
        shipping: { ...prev.billing },
      }));
    } else {
      setInvoiceData((prev) => ({
        ...prev,
        shipping: { name: "", phone: "", address: "" },
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] = value;
    if (field === "qty" || field === "amount") {
      const qty = parseFloat(items[index].qty) || 0;
      const amount = parseFloat(items[index].amount) || 0;
      items[index].total = qty * amount;
    }
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData((prev) => ({
          ...prev,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + (parseFloat(item.total) || 0),
      0
    );

    const taxRate = parseFloat(invoiceData.tax) || 0;
    const taxAmount = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + taxAmount;

    return { subtotal, taxAmount, grandTotal };
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

  useEffect(() => {
    if (!invoiceData.invoice.number) {
      const randomNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoice: {
          ...prev.invoice,
          number: randomNumber,
        },
      }));
    }
  }, []);

  // --- Reusable Styling Classes ---
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass =
    "w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 placeholder-gray-400 shadow-sm";
  const sectionTitleClass =
    "text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-1";

  return (
    <div className="space-y-6">
      {/* Main Container */}
      <div className="bg-white shadow-xl rounded-lg w-full p-6 border border-gray-200">
        {/* --- Header Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col justify-end">
            <h5 className={sectionTitleClass}>From (Company Info)</h5>
            <div className="space-y-3">
              <input
                className={inputClass}
                onChange={(e) =>
                  handleChange("company", "name", e.target.value)
                }
                value={invoiceData.company.name}
                placeholder="Company Name"
              />
              <input
                className={inputClass}
                placeholder="Company Phone No"
                onChange={(e) =>
                  handleChange("company", "number", e.target.value)
                }
                value={invoiceData.company.number}
              />
              <input
                className={inputClass}
                placeholder="Company Address"
                onChange={(e) =>
                  handleChange("company", "address", e.target.value)
                }
                value={invoiceData.company.address}
              />
            </div>
          </div>
          {/* Company Logo */}
          <div className="flex flex-col">
            <h5 className={sectionTitleClass}>Company Logo</h5>
            <div className="mt-1">
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-blue-400 transition-all"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    src={
                      invoiceData.logo
                        ? invoiceData.logo
                        : "https://cdn-icons-png.flaticon.com/512/126/126477.png"
                    }
                    alt="Upload"
                    className="w-8 h-8 opacity-40 mb-2"
                  />
                  <p className="text-xs text-gray-500">Click to upload</p>
                </div>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 my-6" />

        {/* --- Client & Shipping Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Bill To */}
          <div>
            <h5 className={sectionTitleClass}>Bill To</h5>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Client Name</label>
                <input
                  className={inputClass}
                  placeholder="Client Name"
                  value={invoiceData.billing.name}
                  onChange={(e) =>
                    handleChange("billing", "name", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  className={inputClass}
                  placeholder="Client Phone No"
                  value={invoiceData.billing.phone}
                  onChange={(e) =>
                    handleChange("billing", "phone", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Billing Address</label>
                <textarea
                  className={inputClass}
                  rows="2"
                  placeholder="Client Address"
                  value={invoiceData.billing.address}
                  onChange={(e) =>
                    handleChange("billing", "address", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Ship To */}
          <div>
            <div className="flex justify-between items-center mb-3 border-b pb-1">
              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0 border-none">
                Ship To
              </h5>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sameAsBillTo"
                  onChange={handleSameAsBilling}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="sameAsBillTo"
                  className="ml-2 text-xs text-gray-600 cursor-pointer select-none"
                >
                  Same as Billing
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className={labelClass}>Recipient Name</label>
                <input
                  className={inputClass}
                  placeholder="Name"
                  value={invoiceData.shipping.name}
                  onChange={(e) =>
                    handleChange("shipping", "name", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  className={inputClass}
                  placeholder="Phone No"
                  value={invoiceData.shipping.phone}
                  onChange={(e) =>
                    handleChange("shipping", "phone", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Shipping Address</label>
                <textarea
                  className={inputClass}
                  rows="2"
                  placeholder="Shipping Address"
                  value={invoiceData.shipping.address}
                  onChange={(e) =>
                    handleChange("shipping", "address", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Invoice Info --- */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h5 className="font-semibold text-gray-700 mb-4">Invoice Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Invoice Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">#</span>
                </div>
                <input
                  className={`${inputClass} pl-7 font-mono`}
                  value={invoiceData.invoice.number}
                  onChange={(e) =>
                    handleChange("invoice", "number", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Issued Date</label>
              <input
                type="date"
                className={inputClass}
                value={invoiceData.invoice.date}
                onChange={(e) =>
                  handleChange("invoice", "date", e.target.value)
                }
              />
            </div>
            <div>
              <label className={labelClass}>Due Date</label>
              <input
                type="date"
                className={inputClass}
                value={invoiceData.invoice.dueDate}
                onChange={(e) =>
                  handleChange("invoice", "dueDate", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* --- Item Details --- */}
        <div className="mb-8">
          <h5 className={sectionTitleClass}>Item Details</h5>

          {/* Table Header (Hidden on Mobile) */}
          <div className="hidden md:grid grid-cols-12 gap-4 mb-2 text-xs font-medium text-gray-500 uppercase">
            <div className="col-span-6">Item Description</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Total</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b border-gray-100 pb-4 mb-4">
            {invoiceData.items.map((item, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-12 grid grid-cols-12 gap-4 items-start"
              >
                {/* Item Name & Description */}
                <div className="col-span-1 md:col-span-6 space-y-2">
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                  />
                  <textarea
                    className={`${inputClass} text-xs`}
                    rows="1"
                    placeholder="Item Description (Optional)"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                </div>

                {/* Quantity */}
                <div className="col-span-1 md:col-span-2">
                  <label className="md:hidden text-xs text-gray-500">Qty</label>
                  <input
                    type="number"
                    className={inputClass}
                    placeholder="0"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(index, "qty", e.target.value)
                    }
                  />
                </div>

                {/* Price */}
                <div className="col-span-1 md:col-span-2">
                  <label className="md:hidden text-xs text-gray-500">
                    Amount
                  </label>
                  <input
                    type="number"
                    className={inputClass}
                    placeholder="0.00"
                    value={item.amount}
                    onChange={(e) =>
                      handleItemChange(index, "amount", e.target.value)
                    }
                  />
                </div>

                {/* Total & Delete */}
                <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                  <div className="flex-1">
                    <label className="md:hidden text-xs text-gray-500">
                      Total
                    </label>
                    <input
                      type="number"
                      className={`${inputClass} bg-gray-100 cursor-not-allowed`}
                      placeholder="0.00"
                      value={item.total}
                      readOnly
                    />
                  </div>
                  {invoiceData.items.length > 1 && (
                    <button
                      className="text-red-400 hover:text-red-600 p-2 mt-5 md:mt-0 transition"
                      onClick={() => deleteItem(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
            onClick={addItem}
          >
            <Plus size={16} /> Add New Item
          </button>
        </div>

        {/* --- Bank & Totals Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bank Account Details (Left Side) */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit">
            <h5 className="font-semibold text-gray-700 mb-4">
              Bank Account Details
            </h5>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Account Holder Name</label>
                <input
                  className={inputClass}
                  placeholder="e.g. John Doe"
                  value={invoiceData.account.holderName}
                  onChange={(e) =>
                    handleChange("account", "holderName", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Account Number</label>
                <input
                  className={`${inputClass} font-mono`}
                  placeholder="XXXX XXXX XXXX"
                  value={invoiceData.account.number}
                  onChange={(e) =>
                    handleChange("account", "number", e.target.value)
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Bank Name</label>
                <input
                  className={inputClass}
                  placeholder="e.g. Chase Bank"
                  value={invoiceData.account.bankName}
                  onChange={(e) =>
                    handleChange("account", "bankName", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Totals (Right Side) */}
          <div className="flex flex-col justify-center space-y-3">
            <div className="flex justify-between items-center p-2 border-b border-gray-100">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center p-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Tax Rate</span>
                <div className="relative w-16">
                  <input
                    type="number"
                    className="w-full px-2 py-1 text-xs bg-white border border-gray-300 rounded text-left focus:outline-none focus:border-blue-500"
                    placeholder="0"
                    value={invoiceData.tax}
                    onChange={(e) =>
                      setInvoiceData((prev) => ({
                        ...prev,
                        tax: e.target.value,
                      }))
                    }
                  />
                  <span className="absolute right-6 top-1 text-xs text-gray-400 pointer-events-none">
                    %
                  </span>
                </div>
              </div>
              <span className="font-medium text-gray-900">
                ₹{taxAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-lg font-bold text-blue-900">
                Grand Total
              </span>
              <span className="text-lg font-bold text-blue-900">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* --- Notes --- */}
        <div>
          <h5 className={sectionTitleClass}>Notes & Terms</h5>
          <textarea
            className={inputClass}
            rows="3"
            value={invoiceData.notes}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))
            }
            placeholder="Please include any payment terms, thank you notes, or additional instructions here..."
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
