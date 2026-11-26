
import { useEffect, useState } from 'react'
import { Plus, ClipboardList, Clock, CheckCircle2 } from 'lucide-react'

import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

import type {
  Task,
  TaskFormData,
  TaskStatus,
} from '../types/task'

interface TasksProps {
  tasks: Task[]
  onSaveTask: (task: Task) => void
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
  openCreateForm: boolean
  onCreateFormOpened: () => void
}

function Tasks({
  tasks,
  onSaveTask,
  onStatusChange,
  onDelete,
  openCreateForm,
  onCreateFormOpened,
}: TasksProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    if (openCreateForm) {
      setEditingTask(null)
      setFormOpen(true)
      onCreateFormOpened()
    }
  }, [openCreateForm, onCreateFormOpened])

  const handleSaveTask = (data: TaskFormData) => {
    const taskToSave: Task = editingTask
      ? {
          ...editingTask,
          ...data,
        }
      : {
          ...data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }

    onSaveTask(taskToSave)
    setEditingTask(null)
    setFormOpen(false)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingTask(null)
  }

  const completedCount = tasks.filter(
    (task) => task.status === 'Completed'
  ).length

  const inProgressCount = tasks.filter(
    (task) => task.status === 'In Progress'
  ).length

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            My Tasks
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize, track, and manage your team's work.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingTask(null)
            setFormOpen(true)
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Tasks</p>
            <ClipboardList className="text-indigo-500" size={21} />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {tasks.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">In Progress</p>
            <Clock className="text-amber-500" size={21} />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {inProgressCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Completed</p>
            <CheckCircle2 className="text-emerald-500" size={21} />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {completedCount}
          </h2>
        </div>
      </div>

      <TaskList
        tasks={tasks}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onEdit={handleEdit}
      />

      {formOpen && (
        <TaskForm
          onAddTask={handleSaveTask}
          onClose={handleCloseForm}
          initialData={editingTask}
        />
      )}
    </div>
  )
}

export default Tasks
