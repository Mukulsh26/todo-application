import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TaskTable from "@/components/TaskTable";
import Filters from "@/components/Filters";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });
  const [sort, setSort] = useState({ sortBy: "dueDate", sortOrder: "asc" });
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, [filter, pagination.currentPage, sort]);

  const fetchTasks = async () => {
    const query = new URLSearchParams({
      ...filter,
      page: pagination.currentPage,
      limit: pagination.limit,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
    }).toString();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks?${query}`);
    const data = await response.json();
    setTasks(data.tasks);
    setPagination({
      ...pagination,
      totalPages: data.totalPages,
    });
  };

  const handleEdit = (id) => {
    router.push(`/task/${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, { method: "DELETE" });
      fetchTasks();
    }
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const handleSort = (sortBy) => {
    setSort({
      sortBy,
      sortOrder: sort.sortOrder === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="max-w-screen-lg mx-auto px-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">To-Do List</h1>
          <button
            onClick={() => router.push("/task/create")}
            className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
          >
            Add Task
          </button>
        </header>
        <Filters setFilter={setFilter} />
        <TaskTable
          tasks={tasks}
          fetchTasks={fetchTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
          pagination={pagination}
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1}
            className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-200">{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
