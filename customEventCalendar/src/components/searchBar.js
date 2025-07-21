import React from 'react';

const colorOptions = [
  { value: 'all', label: 'All Colors' },
  { value: 'blue', label: 'Blue' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'purple', label: 'Purple' },
  { value: 'yellow', label: 'Yellow' },
];

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  filterColor, 
  setFilterColor 
}) {
  return (
    <div className="p-4 border-b">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search events by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="w-full md:w-48">
          <select
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {colorOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}