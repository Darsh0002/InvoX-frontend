import React, { useRef, useContext } from "react";
import { templates } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import { Save, Trash2, ArrowLeft, Mail, Download } from "lucide-react";

const PreviewPage = () => {
  const previewRef = useRef();
  const { selectedTemplate, setSelectedTemplate, invoiceData } =
    useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      {/* ===== Header Section ===== */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Invoice Preview
        </h1>
        <p className="text-sm text-gray-500">
          Choose a template and preview your invoice before downloading
        </p>
      </div>

      {/* ===== Template Selector ===== */}
      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        {templates.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSelectedTemplate(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                selectedTemplate === id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-50"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ===== Action Buttons ===== */}
      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2">
          <Save size={16} />
          Save
        </button>

        <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2">
          <Trash2 size={16} />
          Delete
        </button>

        <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition flex items-center gap-2">
          <Mail size={16} />
          Send via Email
        </button>

        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2">
          <Download size={16} />
          Download PDF
        </button>
      </div>

      {/* ===== Preview Area ===== */}
      <div className="flex justify-center">
        <div
          ref={previewRef}
          className="w-full max-w-4xl bg-white p-6 border border-gray-200 rounded-xl shadow-md"
        >
          <InvoicePreview
            invoiceData={invoiceData}
            template={selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
