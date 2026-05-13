import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@store/index'
import { mockTasks } from '@utils/mockData'
import type {
  Task,
  TaskDateRange,
  TaskDraft,
  TaskFilters,
  TaskPriority,
  TaskStatus,
  TasksState,
} from '@type/task'

const initialFilters: TaskFilters = {
  searchText: '',
  status: [],
  priority: null,
  dateRange: {
    from: null,
    to: null,
  },
}

const initialState: TasksState = {
  items: mockTasks,
  filters: initialFilters,
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
}

const normalizeOptionalText = (value?: string) => {
  const trimmedValue = value?.trim()
  return trimmedValue ? trimmedValue : undefined
}

const normalizeTags = (tags?: string[]) => {
  const normalizedTags = tags?.map((tag) => tag.trim()).filter(Boolean)
  return normalizedTags && normalizedTags.length > 0 ? normalizedTags : undefined
}

const normalizeDateRange = (dateRange: TaskDateRange): TaskDateRange => ({
  from: dateRange.from ?? null,
  to: dateRange.to ?? null,
})

const normalizeTaskDraft = (task: TaskDraft): TaskDraft => ({
  title: task.title.trim(),
  description: normalizeOptionalText(task.description),
  status: task.status,
  priority: task.priority,
  assignee: normalizeOptionalText(task.assignee),
  dueDate: task.dueDate || undefined,
  tags: normalizeTags(task.tags),
})

const generateNextTaskId = (tasks: Task[]) => {
  const maxId = tasks.reduce((currentMax, task) => {
    const numericPart = Number(task.id.replace(/\D/g, ''))
    return Number.isNaN(numericPart) ? currentMax : Math.max(currentMax, numericPart)
  }, 0)

  return `t${maxId + 1}`
}

const applySearchFilter = (task: Task, searchText: string) => {
  if (!searchText) {
    return true
  }

  return task.title.toLowerCase().includes(searchText.toLowerCase())
}

const applyStatusFilter = (task: Task, statuses: TaskStatus[]) => {
  if (statuses.length === 0) {
    return true
  }

  return statuses.includes(task.status)
}

const applyPriorityFilter = (task: Task, priority: TaskPriority | null) => {
  if (!priority) {
    return true
  }

  return task.priority === priority
}

const applyDateRangeFilter = (task: Task, dateRange: TaskDateRange) => {
  if (!dateRange.from && !dateRange.to) {
    return true
  }

  if (!task.dueDate) {
    return false
  }

  if (dateRange.from && task.dueDate < dateRange.from) {
    return false
  }

  if (dateRange.to && task.dueDate > dateRange.to) {
    return false
  }

  return true
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      prepare: (task: TaskDraft) => ({
        payload: normalizeTaskDraft(task),
      }),
      reducer: (state, action: PayloadAction<TaskDraft>) => {
        state.items.unshift({
          ...action.payload,
          id: generateNextTaskId(state.items),
          createdAt: new Date().toISOString().slice(0, 10),
        })
      },
    },
    updateTask: {
      prepare: (payload: { id: string; changes: TaskDraft }) => ({
        payload: {
          id: payload.id,
          changes: normalizeTaskDraft(payload.changes),
        },
      }),
      reducer: (state, action: PayloadAction<{ id: string; changes: TaskDraft }>) => {
        const task = state.items.find((item) => item.id === action.payload.id)

        if (!task) {
          return
        }

        Object.assign(task, action.payload.changes)
      },
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
    deleteManyTasks: (state, action: PayloadAction<string[]>) => {
      const idsToDelete = new Set(action.payload)
      state.items = state.items.filter((task) => !idsToDelete.has(task.id))
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.items.find((item) => item.id === action.payload.id)

      if (task) {
        task.status = action.payload.status
      }
    },
    setFilter: (state, action: PayloadAction<Partial<TaskFilters>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
        dateRange: action.payload.dateRange
          ? normalizeDateRange(action.payload.dateRange)
          : state.filters.dateRange,
      }
      state.pagination.currentPage = 1
    },
    resetFilters: (state) => {
      state.filters = initialFilters
      state.pagination.currentPage = 1
    },
    setPage: (state, action: PayloadAction<{ currentPage: number; pageSize?: number }>) => {
      state.pagination.currentPage = action.payload.currentPage

      if (action.payload.pageSize) {
        state.pagination.pageSize = action.payload.pageSize
      }
    },
  },
})

const selectTasksState = (state: RootState) => state.tasks
const selectFilters = (state: RootState) => state.tasks.filters
const selectPagination = (state: RootState) => state.tasks.pagination

export const {
  addTask,
  updateTask,
  deleteTask,
  deleteManyTasks,
  updateTaskStatus,
  setFilter,
  resetFilters,
  setPage,
} = tasksSlice.actions

export const selectAllTasks = createSelector([selectTasksState], (tasksState) => tasksState.items)

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (tasks, filters) =>
    tasks.filter(
      (task) =>
        applySearchFilter(task, filters.searchText) &&
        applyStatusFilter(task, filters.status) &&
        applyPriorityFilter(task, filters.priority) &&
        applyDateRangeFilter(task, filters.dateRange),
    ),
)

export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectPagination],
  (tasks, pagination) => {
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize
    return tasks.slice(startIndex, startIndex + pagination.pageSize)
  },
)

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => ({
  total: tasks.length,
  todo: tasks.filter((task) => task.status === 'todo').length,
  inProgress: tasks.filter((task) => task.status === 'in_progress').length,
  done: tasks.filter((task) => task.status === 'done').length,
}))

export const selectTaskFilters = createSelector([selectFilters], (filters) => filters)

export const selectTasksPagination = createSelector([selectPagination], (pagination) => pagination)

export const selectStatusProgress = createSelector([selectTaskStats], (stats) => [
  {
    key: 'todo',
    label: 'Todo',
    count: stats.todo,
    percent: stats.total === 0 ? 0 : Math.round((stats.todo / stats.total) * 100),
    strokeColor: '#d9d9d9',
  },
  {
    key: 'in_progress',
    label: 'In Progress',
    count: stats.inProgress,
    percent: stats.total === 0 ? 0 : Math.round((stats.inProgress / stats.total) * 100),
    strokeColor: '#1677ff',
  },
  {
    key: 'done',
    label: 'Done',
    count: stats.done,
    percent: stats.total === 0 ? 0 : Math.round((stats.done / stats.total) * 100),
    strokeColor: '#52c41a',
  },
])

export const selectRecentTasks = createSelector([selectAllTasks], (tasks) => {
  return [...tasks]
    .sort((firstTask, secondTask) => {
      const createdAtDiff =
        new Date(secondTask.createdAt).getTime() - new Date(firstTask.createdAt).getTime()

      if (createdAtDiff !== 0) {
        return createdAtDiff
      }

      return Number(secondTask.id.replace('t', '')) - Number(firstTask.id.replace('t', ''))
    })
    .slice(0, 5)
})

export default tasksSlice.reducer
