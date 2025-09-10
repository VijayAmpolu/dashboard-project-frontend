import { XMarkIcon } from '@heroicons/react/24/outline';
import { CustomPieChart } from '../charts/PieChart';
import { DonutChart } from '../charts/DonutChart';
import { CustomBarChart } from '../charts/BarChart';

export function Widget({ id, type, title, onRemove, isHighlighted = false }) {
  const renderContent = () => {
    switch (type) {
      case 'Cloud Accounts':
        return (
          <CustomPieChart
            data={[
              { name: 'Connected', value: 75, color: '#0d6efd' },
              { name: 'Not Connected', value: 25, color: '#6c757d' }
            ]}
          />
        );
        
      case 'Cloud Account Risk Assessment':
        return (
          <DonutChart
            data={[
              { name: 'Failed', value: 15, color: '#dc3545' },
              { name: 'Warning', value: 20, color: '#ffc107' },
              { name: 'Not Available', value: 10, color: '#6c757d' },
              { name: 'Passed', value: 55, color: '#198754' }
            ]}
            total={100}
          />
        );
        
      case 'Registry Scan':
        return (
          <CustomBarChart
            data={[
              { name: 'Critical', value: 5, color: '#dc3545' },
              { name: 'High', value: 15, color: '#fd7e14' },
              { name: 'Medium', value: 30, color: '#ffc107' },
              { name: 'Low', value: 50, color: '#6c757d' }
            ]}
          />
        );
        
      case 'Image Security Issues':
        return (
          <CustomBarChart
            data={[
              { name: 'Critical', value: 10, color: '#dc3545' },
              { name: 'High', value: 20, color: '#fd7e14' }
            ]}
          />
        );
        
      case 'Top Normative Alerts':
      case 'Workload Alerts':
      default:
        return (
          <div className="flex items-center justify-center h-48">
            <p className="text-gray-500 text-sm">No data available</p>
          </div>
        );
    }
  };

  return (
    <div 
      className={`bg-white border border-gray-300 rounded-lg shadow-sm p-4 h-64 relative ${
        isHighlighted ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-blue-600 font-bold text-sm">{title}</h3>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
      {renderContent()}
    </div>
  );
}