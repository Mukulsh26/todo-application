import React, { useState } from "react";

const Filters = ({ setFilter }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const handleFilter = () => {
    setFilter({ search, status });
  };

  const handleClearFilters = () => {
    setSearch(""); 
    setStatus(""); 
    setFilter({ search: "", status: "" }); 
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search by Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/2 px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full sm:w-1/4 px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        onClick={handleFilter}
        className="px-6 py-2 text-white bg-purple-600 rounded-lg shadow hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
      >
        Apply Filters
      </button>
      <button
        onClick={handleClearFilters}
        className="px-6 py-2 text-white bg-gray-600 rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
