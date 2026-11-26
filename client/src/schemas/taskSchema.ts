import { z } from 'zod'

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Task title must contain at least 3 characters')
    .max(80, 'Task title cannot exceed 80 characters'),

  description: z
    .string()
    .max(300, 'Description cannot exceed 300 characters'),

  priority: z.enum(['Low', 'Medium', 'High']),

  status: z.enum(['Todo', 'In Progress', 'Completed']),

  dueDate: z
    .string()
    .min(1, 'Please select a due date'),

  assignedTo: z
    .string()
    .trim()
    .min(2, 'Please enter an assignee'),
})