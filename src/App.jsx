import { useState, useEffect } from 'react';
import { initialDashboardData } from './data/dashboardData';
import { CategorySection } from './components/CategorySection';
import { AddWidgetModal } from './components/modals/AddWidgetModal';
import { ManageWidgetsModal } from './components/modals/ManageWidgetsModal';

function App() {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeframe, setTimeframe] = useState('Last 2 days');
  const [addWidgetModal, setAddWidgetModal] = useState({
    isOpen: false,
    categoryId: ''
  });
  const [manageWidgetsModal, setManageWidgetsModal] = useState({
    isOpen: false,
    categoryId: ''
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cnapp-dashboard-data');
    if (saved) {
      try {
        setDashboardData(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever dashboardData changes
  useEffect(() => {
    localStorage.setItem('cnapp-dashboard-data', JSON.stringify(dashboardData));
  }, [dashboardData]);

  const handleRemoveWidget = (categoryId, widgetId) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(widget => widget.id !== widgetId)
            }
          : category
      )
    }));
  };

  const handleAddWidget = (categoryId) => {
    setAddWidgetModal({ isOpen: true, categoryId });
  };

  const handleConfirmAddWidget = (type) => {
    const category = dashboardData.categories.find(c => c.id === addWidgetModal.categoryId);
    if (category) {
      const newWidget = {
        id: `${type.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        type,
        title: type,
        category: category.id
      };

      setDashboardData(prev => ({
        ...prev,
        categories: prev.categories.map(cat =>
          cat.id === addWidgetModal.categoryId
            ? { ...cat, widgets: [...cat.widgets, newWidget] }
            : cat
        )
      }));
    }
  };

  const handleManageWidgets = (categoryId) => {
    setManageWidgetsModal({ isOpen: true, categoryId });
  };

  const handleUpdateWidgets = (widgetTypes) => {
    const category = dashboardData.categories.find(c => c.id === manageWidgetsModal.categoryId);
    if (category) {
      const newWidgets = widgetTypes.map((type, index) => ({
        id: `${type.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${index}`,
        type,
        title: type,
        category: category.id
      }));

      setDashboardData(prev => ({
        ...prev,
        categories: prev.categories.map(cat =>
          cat.id === manageWidgetsModal.categoryId
            ? { ...cat, widgets: newWidgets }
            : cat
        )
      }));
    }
  };

  const handleConfirm = (categoryId) => {
    console.log(`Confirmed changes for category: ${categoryId}`);
  };

  const handleCancel = (categoryId) => {
    console.log(`Cancelled changes for category: ${categoryId}`);
  };

  const getCurrentCategory = () => {
    return dashboardData.categories.find(c => c.id === manageWidgetsModal.categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-blue-600">CNAPP Dashboard</h1>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Last 2 days</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>All time</option>
            </select>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
              All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8">
        {dashboardData.categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onRemoveWidget={handleRemoveWidget}
            onAddWidget={handleAddWidget}
            onManageWidgets={handleManageWidgets}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            searchTerm={searchTerm}
          />
        ))}
      </div>

      {/* Modals */}
      <AddWidgetModal
        isOpen={addWidgetModal.isOpen}
        onClose={() => setAddWidgetModal({ isOpen: false, categoryId: '' })}
        onAdd={handleConfirmAddWidget}
        categoryId={addWidgetModal.categoryId}
      />

      <ManageWidgetsModal
        isOpen={manageWidgetsModal.isOpen}
        onClose={() => setManageWidgetsModal({ isOpen: false, categoryId: '' })}
        categoryWidgets={getCurrentCategory()?.widgets || []}
        onUpdateWidgets={handleUpdateWidgets}
        categoryId={manageWidgetsModal.categoryId}
      />
    </div>
  );
}

export default App;