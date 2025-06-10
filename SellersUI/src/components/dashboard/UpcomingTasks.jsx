// components/UpcomingTasks.js
import { CalendarCheck2, AlarmClock } from 'lucide-react';
import { useState } from 'react';

const initialTasks = [
  { title: 'Review April Sales Report', due: 'Apr 15', urgent: true },
  { title: 'Team Stand-up Meeting', due: 'Apr 16', urgent: false },
  { title: 'Inventory Reconciliation', due: 'Apr 17', urgent: false },
  { title: 'Update Vehicle Listings', due: 'Apr 18', urgent: true },
];

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="rounded-xl shadow-md bg-[var(--bg-secondary)] p-6 w-full lg:w-[30%] h-fit">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[var(--text)]">Upcoming Tasks</h3>
        <button className="text-sm text-[var(--accent)] hover:underline">Manage</button>
      </div>
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-start justify-between bg-[var(--bg)] rounded-lg p-3 border border-[var(--border)]"
          >
            <div>
              <p className="font-medium text-[var(--text)]">{task.title}</p>
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-1">
                <CalendarCheck2 size={14} /> Due: {task.due}
              </span>
            </div>
            {task.urgent && (
              <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                <AlarmClock size={14} /> Urgent
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingTasks;