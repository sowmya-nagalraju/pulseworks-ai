
import { Search, Trash2, Pencil, CalendarDays } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Task, TaskStatus } from '../types/task'

interface TaskListProps {
  tasks: Task[]
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

function TaskList({
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
}: TaskListProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter

      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, search, statusFilter, priorityFilter])

  const priorityStyle: Record<string, string> = {
    Low: 'bg-slate-100 text-slate-600',
    Medium: 'bg-amber-50 text-amber-700',
    High: 'bg-red-50 text-red-600',
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks or assignees..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="All">All statuses</option>
          <option value="Todo">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="All">All priorities</option>
          <option value="Low">Low priority</option>
          <option value="Medium">Medium priority</option>
          <option value="High">High priority</option>
        </select>
      </div>

      <div className="divide-y divide-slate-100">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-semibold text-slate-700">No tasks found</p>
            <p className="mt-1 text-sm text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900">
                    {task.title}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyle[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </div>

                {task.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {task.description}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span>Assigned to: {task.assignedTo}</span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={13} />
                    {task.dueDate}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={task.status}
                  onChange={(event) =>
                    onStatusChange(task.id, event.target.value as TaskStatus)
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium"
                  aria-label={`Status for ${task.title}`}
                >
                  <option value="Todo">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  title="Edit task"
                  aria-label={`Edit ${task.title}`}
                  className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Pencil size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  title="Delete task"
                  aria-label={`Delete ${task.title}`}
                  className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList
