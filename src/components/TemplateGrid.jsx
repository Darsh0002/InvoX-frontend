import React, { useState } from "react";
import { Check, Crown, Eye, X } from "lucide-react";

// Import your actual components
import Template1 from "./Template1.jsx";
import Template2 from "./Template2.jsx";
import Template3 from "./Template3.jsx";

// Import your data
import { templates, proTemplates } from "../assets/assets.js";

const TemplateGrid = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Helper to merge lists
  const allTemplates = [
    ...templates.map((t) => ({ ...t, isPro: false })),
    ...proTemplates.map((t) => ({ ...t, isPro: true })),
  ];

  // Function to determine which component to render in the Preview Modal
  const renderTemplateComponent = (id) => {
    switch (id) {
      case 1:
        return <Template1 />;
      case 2:
        return <Template2 />;
      case 3:
        return <Template3 />;
      default:
        return <div className="p-10 text-center">Template Not Found</div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">Select Template</h3>
        <p className="text-gray-500 text-sm mt-1">
          Choose a design that fits your brand identity
        </p>
      </div>

      {/* Grid Container - Constrained width for better sizing */}
      <div className="max-w-5xl mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {allTemplates.map(({ id, label, image, isPro }) => {
            const isSelected = selectedTemplate === id;

            return (
              <div
                key={id}
                onClick={() => setSelectedTemplate(id)}
                // Added 'group' for hover effects on child elements
                // Added change in border color on hover
                className={`relative group cursor-pointer rounded-xl transition-all duration-300 bg-white border ${
                  isSelected
                    ? "ring-[3px] ring-blue-500/30 border-blue-600 shadow-lg scale-[1.02]"
                    : "border-gray-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {/* Pro Badge - made smaller */}
                {isPro && (
                  <div className="absolute top-2 left-2 z-10 bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-sm border border-amber-200">
                    <Crown size={10} fill="currentColor" />
                    PRO
                  </div>
                )}

                {/* Selection Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 bg-blue-600 text-white p-1 rounded-full shadow-md animate-in zoom-in duration-200">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}

                {/* Image Container (A4 Aspect Ratio) - Reduced padding */}
                <div className="p-2">
                  <div className="aspect-[210/297] overflow-hidden rounded-lg bg-gray-100 relative border border-gray-100">
                    {/* Image */}
                    <img
                      src={image}
                      alt={label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-blue-900/5 transition-opacity duration-300 ${
                        isSelected
                          ? "opacity-0"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                </div>

                {/* Label */}
                <div className="px-3 pb-3 text-center">
                  <p
                    className={`text-xs md:text-sm font-medium truncate ${
                      isSelected ? "text-blue-700" : "text-gray-700"
                    }`}
                    title={label}
                  >
                    {label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-all font-medium shadow-md hover:shadow-lg transform active:scale-95"
        >
          <Eye size={16} />
          Preview Selection
        </button>
      </div>

      {/* --- PREVIEW MODAL (Unchanged functional logic) --- */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
              <div>
                <h3 className="font-semibold text-gray-800">
                  Template Preview
                </h3>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto bg-gray-100/50 p-6 flex justify-center">
              {/* This container simulates an A4 paper width on desktop, scaled down slightly for modal viewing */}
              <div className="bg-white shadow-xl min-h-[600px] w-full max-w-[210mm] origin-top transform scale-[0.85] md:scale-100 transition-transform border border-gray-200">
                {renderTemplateComponent(selectedTemplate)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-gray-100 bg-white flex justify-end gap-3">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;
