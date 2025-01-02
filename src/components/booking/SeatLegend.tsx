export function SeatLegend() {
  const legendItems = [
    { color: 'bg-gray-100', label: 'Available' },
    { color: 'bg-blue-500 text-white', label: 'Your Selection' },
    { color: 'bg-orange-400 text-white', label: 'Selected by Others' },
    { color: 'bg-yellow-400 text-yellow-900', label: 'Your Processing' },
    { color: 'bg-red-400 text-white', label: 'Processing by Others' },
    { color: 'bg-green-500 text-white', label: 'Booked' },
  ];

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {legendItems.map(({ color, label }) => (
        <div key={label} className="flex items-center">
          <div className={`w-8 h-8 ${color} rounded-t-lg mr-2`}></div>
          <span className="text-sm">{label}</span>
        </div>
      ))}
    </div>
  );
}