export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignee?: string
  dueDate?: string
  createdAt: string
  tags?: string[]
}

export interface TaskDateRange {
  from: string | null
  to: string | null
}

export interface TaskFilters {
  searchText: string
  status: TaskStatus[]
  priority: TaskPriority | null
  dateRange: TaskDateRange
}

export interface TasksPagination {
  currentPage: number
  pageSize: number
}

export interface TasksState {
  items: Task[]
  filters: TaskFilters
  pagination: TasksPagination
}

export type TaskDraft = Omit<Task, 'id' | 'createdAt'>
