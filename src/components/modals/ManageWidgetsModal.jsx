import { useState, useEffect } from 'react';
import { availableWidgetTypes } from '../../data/dashboardData';

export function ManageWidgetsModal({ 
  isOpen, 
  onClose, 
  categoryWidgets, 
  onUpdateWidgets,
  categoryId 
}) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedTypes(categoryWidgets.map(w => w.type));
    }
  }, [isOpen, categoryWidgets]);

  const handleToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleDone = () => {
    onUpdateWidgets(selectedTypes);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Manage Widgets</h2>
        <p className="text-sm text-gray-600 mb-4">
          Select widgets to display in this category
        </p>
        
        <div className="mb-6 space-y-3">
          {availableWidgetTypes.map((type) => (
            <label key={type} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleToggle(type)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleDone}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}