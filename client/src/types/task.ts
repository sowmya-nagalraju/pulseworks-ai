export type TaskPriority = 'Low' | 'Medium' | 'High'

export type TaskStatus =
  | 'Todo'
  | 'In Progress'
  | 'Completed'

export interface TaskFormData {
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
  assignedTo: string
}

export interface Task extends TaskFormData {
  id: string
  createdAt: string
}