import type { TaskPriority, TaskStatus } from '@type/task'

export const statusColors: Record<TaskStatus, 'default' | 'processing' | 'success'> = {
  todo: 'default',
  in_progress: 'processing',
  done: 'success',
}

export const statusLabels: Record<TaskStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

export const priorityColors: Record<TaskPriority, 'green' | 'gold' | 'red'> = {
  low: 'green',
  medium: 'gold',
  high: 'red',
}

export const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

export const priorityOptions: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export const priorityRank: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
}

export const formatTaskDate = (date?: string) => date ?? '—'
