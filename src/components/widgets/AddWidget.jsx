export function AddWidget({ onAdd }) {
  return (
    <div 
      className="border-2 border-dashed border-blue-500 rounded-lg h-64 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors duration-200"
      onClick={onAdd}
    >
      <span className="text-blue-600 font-medium">+ Add Widget</span>
    </div>
  );
}