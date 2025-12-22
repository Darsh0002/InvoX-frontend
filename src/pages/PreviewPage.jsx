import React, { useRef, useContext, useState } from "react";
import { templates } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import { Save, Trash2, ArrowLeft, Mail, Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { saveInvoice } from "../service/invoiceService";
import { toPng } from "html-to-image";
import { uploadInvoiceThumbnail } from "../service/cloudinaryService";

const PreviewPage = () => {
  const previewRef = useRef();
  const { selectedTemplate, setSelectedTemplate, invoiceData, baseURL } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      setLoading(true);

      const imageData = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const thumbnailUrl = await uploadInvoiceThumbnail(imageData);

      const payload = {
        ...invoiceData,
        thumbnailUrl,
        template: selectedTemplate,
      };
      const response = await saveInvoice(baseURL, payload);

      if (response.status >= 200 && response.status < 300) {
        toast.success("Invoice saved successfully");
        navigate("/dashboard");
      } else {
        toast.error("Failed to save invoice");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save invoice!!");
    } finally {
      setLoading(false);
    }
  };

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
        <button
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2"
          onClick={handleSave}
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin" size={16} />}
          {loading ? (
            "Saving..."
          ) : (
            <>
              <Save size={16} />
              Save and Exit
            </>
          )}
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
