export default function ToDoPanel() {
    return (
      <div>
        <h2 className="font-bold text-lg mb-2">To-Do List</h2>
        <ul className="space-y-2">
          <li className="p-2 bg-[var(--card)] rounded-md shadow">Finish ERP dashboard</li>
          <li className="p-2 bg-[var(--card)] rounded-md shadow">Call supplier</li>
          <li className="p-2 bg-[var(--card)] rounded-md shadow">Update inventory</li>
        </ul>
      </div>
    );
  }
  