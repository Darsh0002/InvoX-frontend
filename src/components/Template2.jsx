import React from 'react';
import { Check } from 'lucide-react';

const Template2 = ({ isSelected }) => {
  return (
    <div className={`relative p-4 bg-white border-2 rounded-lg transition-all duration-200 hover:shadow-md ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
    }`}>
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <Check size={14} className="text-white" />
        </div>
      )}
      <div className="text-center mb-3">
        <div className="text-3xl mb-2">🎨</div>
        <h3 className="font-semibold text-gray-800 text-sm">Creative Modern</h3>
      </div>
      <div className="bg-linear-to-r from-purple-50 to-pink-50 p-3 rounded text-xs text-gray-600 space-y-1">
        <div className="flex justify-between">
          <span>Invoice #</span>
          <span>INV-001</span>
        </div>
        <div className="flex justify-between">
          <span>Amount</span>
          <span>$1,250.00</span>
        </div>
        <div className="w-full bg-linear-to-r from-purple-200 to-pink-200 rounded h-1 mt-2">
          <div className="bg-linear-to-r from-purple-500 to-pink-500 h-1 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
};

export default Template2;