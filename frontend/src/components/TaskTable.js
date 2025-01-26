export default function TaskTable({ tasks, fetchTasks, onEdit, onDelete, pagination }) {
  const handleSort = (field) => {
    onSort(field);
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md mt-7">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-6 py-5 text-left font-extrabold text-lg uppercase tracking-wider cursor-pointer hover:bg-gray-700">
              S.No
            </th>
            <th className="px-6 py-5 text-left font-extrabold text-lg uppercase tracking-wider cursor-pointer hover:bg-gray-700">
              Title
            </th>
            <th className="px-6 py-5 text-left font-extrabold text-lg uppercase tracking-wider cursor-pointer hover:bg-gray-700">
              Description
            </th>
            <th className="px-6 py-5 text-left font-extrabold text-lg uppercase tracking-wider cursor-pointer hover:bg-gray-700">
              Status
            </th>
            <th className="px-6 py-5 text-left font-extrabold text-lg uppercase tracking-wider cursor-pointer hover:bg-gray-700">
              Due Date
            </th>
            <th className="px-6 py-5 text-left font-extrabold text-lg uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            const serialNumber = (pagination.currentPage - 1) * pagination.limit + (index + 1);
            return (
              <tr key={task._id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-700 dark:text-white">{serialNumber}</td>
                <td className="px-6 py-4 text-gray-700 dark:text-white">{task.title}</td>
                <td className="px-6 py-4 text-gray-700 dark:text-white">{task.description}</td>
                <td className="px-6 py-4 text-gray-700 dark:text-white">{task.status}</td>
                <td className="px-6 py-4 text-gray-700 dark:text-white">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => onEdit(task._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
