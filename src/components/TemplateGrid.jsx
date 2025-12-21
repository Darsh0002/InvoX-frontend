import React, { useState } from "react";
import { Check, Crown, Eye, X } from "lucide-react";
import toast from "react-hot-toast";

// Import your data
import { templates, proTemplates } from "../assets/assets.js";

const TemplateGrid = ({ onTemplateClick, onPreviewClick }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);

  // Helper to merge lists
  const allTemplates = [
    ...templates.map((t) => ({ ...t, isPro: false })),
    ...proTemplates.map((t) => ({ ...t, isPro: true })),
  ];

  const selectedTemplateData = allTemplates.find(
    (t) => t.id === selectedTemplate
  );

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
                onClick={() => {
                  setSelectedTemplate(id);
                  onTemplateClick(id);
                }}
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
                  <div className="aspect-210/297 overflow-hidden rounded-lg bg-gray-100 relative border border-gray-100">
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
          onClick={() => {
            if (selectedTemplateData?.isPro) {
              toast.error("Upgrade to Pro ✪");
            } else {
              onPreviewClick();
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-all font-medium shadow-md hover:shadow-lg transform active:scale-95"
        >
          <Eye size={16} />
          Preview Selection
        </button>
      </div>
    </div>
  );
};

export default TemplateGrid;
