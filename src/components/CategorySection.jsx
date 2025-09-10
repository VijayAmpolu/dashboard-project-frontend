import { CogIcon } from '@heroicons/react/24/outline';
import { Widget } from './widgets/Widget';
import { AddWidget } from './widgets/AddWidget';

export function CategorySection({
  category,
  onRemoveWidget,
  onAddWidget,
  onManageWidgets,
  onConfirm,
  onCancel,
  searchTerm
}) {
  const filteredWidgets = category.widgets.filter(widget =>
    widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    widget.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shouldHighlight = (widget) => {
    return searchTerm && (
      widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-600">{category.name}</h2>
        <button
          onClick={() => onManageWidgets(category.id)}
          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          <CogIcon className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {filteredWidgets.map((widget) => (
          <Widget
            key={widget.id}
            id={widget.id}
            type={widget.type}
            title={widget.title}
            onRemove={(id) => onRemoveWidget(category.id, id)}
            isHighlighted={shouldHighlight(widget)}
          />
        ))}
        <AddWidget onAdd={() => onAddWidget(category.id)} />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          onClick={() => onCancel(category.id)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(category.id)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}