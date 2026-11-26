
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, ClipboardList } from 'lucide-react'
import { taskSchema } from '../schemas/taskSchema'
import type { Task, TaskFormData } from '../types/task'

interface TaskFormProps {
  onAddTask: (data: TaskFormData) => void
  onClose: () => void
  initialData?: Task | null
}

function TaskForm({
  onAddTask,
  onClose,
  initialData = null,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Todo',
      dueDate: '',
      assignedTo: '',
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        status: initialData.status,
        dueDate: initialData.dueDate,
        assignedTo: initialData.assignedTo,
      })
    } else {
      reset({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Todo',
        dueDate: '',
        assignedTo: '',
      })
    }
  }, [initialData, reset])

  const inputClass =
    'w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'

  const labelClass =
    'mb-2 block text-sm font-medium text-slate-700'

  const onSubmit = (data: TaskFormData) => {
    onAddTask(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
              <ClipboardList size={21} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {initialData ? 'Edit Task' : 'Create New Task'}
              </h2>
              <p className="text-xs text-slate-500">
                {initialData
                  ? 'Update the task details below.'
                  : 'Fill in the details to create a task.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          <div>
            <label className={labelClass}>Task Title *</label>
            <input
              {...register('title')}
              placeholder="e.g. Complete dashboard design"
              className={inputClass}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Describe what needs to be completed..."
              className={inputClass}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Priority</label>
              <select {...register('priority')} className={inputClass}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select {...register('status')} className={inputClass}>
                <option value="Todo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Due Date *</label>
              <input
                type="date"
                {...register('dueDate')}
                className={inputClass}
              />
              {errors.dueDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.dueDate.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Assigned To *</label>
              <input
                {...register('assignedTo')}
                placeholder="Team member name"
                className={inputClass}
              />
              {errors.assignedTo && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.assignedTo.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {initialData ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
