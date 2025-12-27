import { Pencil } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import InvoiceForm from "../components/InvoiceForm";
import TemplateGrid from "../components/TemplateGrid";
import toast from "react-hot-toast";

const MainPage = () => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const navigate = useNavigate();
  const {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    setSelectedTemplate,
  } = useContext(AppContext);

  const handleTemplateClick = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handlePreviewClick = () => {
    const hasInvalidItems = invoiceData.items.some(
      (item) => !item.name || !item.qty || !item.amount || item.amount<0
    );
    if (hasInvalidItems) {
      toast.error("Enter Valid Item Details");
      return;
    }
    navigate("/preview");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-8 px-20">
      <div className="max-w-7xl mx-auto">
        {/* Title bar */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={invoiceTitle}
                  onChange={(e) => {
                    setInvoiceTitle(e.target.value);
                    setInvoiceData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                  onBlur={() => setIsEditingTitle(false)}
                  className="text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-600 transition-colors"
                  autoFocus
                />
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                    {invoiceTitle}
                  </h1>
                  <button
                    onClick={() => setIsEditingTitle(true)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                  >
                    <Pencil size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Invoice form and template grid */}
        <div className="gap-8 ">
          {/* Invoice form */}
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                Invoice Details
              </h2>
              <InvoiceForm />
            </div>
          </div>

          {/* Template Grid */}
          <div className="bg-white mt-10 shadow-lg rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                Choose Template
              </h2>
              <TemplateGrid
                onTemplateClick={handleTemplateClick}
                onPreviewClick={handlePreviewClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
