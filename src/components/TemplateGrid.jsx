import React, { useState } from "react";
import Template1 from "./Template1.jsx";
import Template2 from "./Template2.jsx";
import Template3 from "./Template3.jsx";

const TemplateGrid = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 text-sm">Choose a template that fits your brand</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setSelectedTemplate(1)}
          className={`cursor-pointer transition-all duration-200 ${
            selectedTemplate === 1 ? 'ring-2 ring-blue-500 rounded-lg' : ''
          }`}
        >
          <Template1 isSelected={selectedTemplate === 1} />
        </div>
        <div
          onClick={() => setSelectedTemplate(2)}
          className={`cursor-pointer transition-all duration-200 ${
            selectedTemplate === 2 ? 'ring-2 ring-blue-500 rounded-lg' : ''
          }`}
        >
          <Template2 isSelected={selectedTemplate === 2} />
        </div>
        <div
          onClick={() => setSelectedTemplate(3)}
          className={`cursor-pointer transition-all duration-200 ${
            selectedTemplate === 3 ? 'ring-2 ring-blue-500 rounded-lg' : ''
          }`}
        >
          <Template3 isSelected={selectedTemplate === 3} />
        </div>
      </div>
      <div className="text-center">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
          See Preview
        </button>
      </div>
    </div>
  );
};

export default TemplateGrid;
