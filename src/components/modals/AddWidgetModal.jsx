import { useState } from 'react';
import { availableWidgetTypes } from '../../data/dashboardData';

export function AddWidgetModal({ isOpen, onClose, onAdd, categoryId }) {
  const [selectedType, setSelectedType] = useState('');

  const handleConfirm = () => {
    if (selectedType) {
      onAdd(selectedType);
      setSelectedType('');
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedType('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Add Widget</h2>
        <p className="text-sm text-gray-600 mb-4">
          Personalise your dashboard by adding the following widget
        </p>
        
        <div className="mb-6">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select widget type...</option>
            {availableWidgetTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedType}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}