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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Title bar */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap">
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
                  className="text-2xl sm:text-3xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-600 transition-colors w-full sm:w-auto"
                  autoFocus
                />
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer break-words">
                    {invoiceTitle}
                  </h1>
                  <button
                    onClick={() => setIsEditingTitle(true)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 shrink-0"
                  >
                    <Pencil size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Invoice form and template grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Invoice form */}
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden lg:flex-1">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                Invoice Details
              </h2>
              <InvoiceForm />
            </div>
          </div>

          {/* Template Grid */}
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden lg:flex-1">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
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
