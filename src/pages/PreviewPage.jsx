import React, { useRef, useContext, useState } from "react";
import { templates } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import {
  Save,
  Trash2,
  ArrowLeft,
  Mail,
  Download,
  Loader2,
  LayoutTemplate,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { saveInvoice, deleteInvoice } from "../service/invoiceService";
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

  const handleDelete = async () => {
    try {
      const res = await deleteInvoice(baseURL, invoiceData.id);
      if (res.status >= 200 && res.status < 300) {
        toast.success("Invoice deleted successfully");
        navigate("/dashboard");
      } else {
        toast.error("Failed to delete invoice");
      }
    } catch (error) {
      toast.error("Failed to delete invoice");
    }
  };

  return (
    // Outer Container: Full screen, no scroll on body
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
      {/* ================= LEFT SIDE: SCROLLABLE PREVIEW ONLY ================= */}
      <main className="flex-1 overflow-y-auto p-8 relative flex flex-col items-center bg-gray-200/50">
        {/* The Capture Area */}
        <div className="my-auto w-full flex justify-center py-1">
          <div
            ref={previewRef}
            className="w-full max-w-198.5 min-h-280.75 bg-white shadow-2xl shadow-gray-300/50 rounded-sm overflow-hidden"
            // Standard A4 ratio width (approx 794px for web display)
          >
            <InvoicePreview
              invoiceData={invoiceData}
              template={selectedTemplate}
            />
          </div>
        </div>
      </main>

      {/* ================= RIGHT SIDE: FIXED SIDEBAR CONTROLS ================= */}
      <aside className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-20">
        {/* Scrollable Content inside Sidebar (if screen is short) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* 1. Template Selector */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
              <LayoutTemplate size={16} className="text-blue-600" />
              <span>Select Template</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {templates.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTemplate(id)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left border flex items-center justify-between
                        ${
                          selectedTemplate === id
                            ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                            : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                >
                  {label}
                  {selectedTemplate === id && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-400" />

          {/* 2. Primary Actions */}
          <div className="space-y-3">
            <button
              className="w-full py-3.5 rounded-xl bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 transition-all flex items-center justify-center gap-2 font-bold tracking-wide"
              onClick={handleSave}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {loading ? (
                "Saving..."
              ) : (
                <>
                  {" "}
                  <Save size={20} /> Save Invoice{" "}
                </>
              )}
            </button>
          </div>

          {/* 3. Secondary Actions */}
          <div className="space-y-3">
            {/* Download PDF - Soft Blue */}
            <button className="w-full py-2.5 px-4 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all flex justify-center items-center gap-3 font-medium text-sm shadow-sm">
              <Download size={18} /> Download PDF
            </button>

            {/* Send Email - Soft Purple */}
            <button className="w-full py-2.5 px-4 rounded-lg bg-purple-50 border border-purple-100 text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition-all flex justify-center items-center gap-3 font-medium text-sm shadow-sm">
              <Mail size={18} /> Send Email
            </button>

            {/* Delete - Soft Red */}
            {invoiceData.id && (
              <button
                onClick={handleDelete}
                className="w-full py-2.5 px-4 rounded-lg bg-red-50 border border-red-100 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all flex justify-center items-center gap-3 font-medium text-sm shadow-sm"
              >
                <Trash2 size={18} /> Delete Invoice
              </button>
            )}

            {/* Back Button - Neutral Gray */}
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition flex items-center justify-center gap-2 font-medium text-sm mt-4"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PreviewPage;
