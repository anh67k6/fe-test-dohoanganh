import { App, type TableProps } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { useEffect, useMemo, useState, type Key } from 'react'
import { priorityRank } from '@component/tasks/taskUi'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  addTask,
  deleteManyTasks,
  deleteTask,
  resetFilters,
  selectFilteredTasks,
  selectPaginatedTasks,
  selectTaskFilters,
  selectTasksPagination,
  setFilter,
  setPage,
  updateTask,
  updateTaskStatus,
} from '@store/tasksSlice'
import type { Task, TaskDraft, TaskPriority, TaskStatus } from '@type/task'

export type SortField = 'title' | 'dueDate' | 'priority'
export type SortOrder = 'ascend' | 'descend'

export type SortState = {
  field?: SortField
  order?: SortOrder
}

const getSortedTasks = (tasks: Task[], sortState: SortState) => {
  if (!sortState.field || !sortState.order) {
    return tasks
  }

  const sortedTasks = [...tasks].sort((firstTask, secondTask) => {
    if (sortState.field === 'title') {
      return firstTask.title.localeCompare(secondTask.title)
    }

    if (sortState.field === 'priority') {
      return priorityRank[firstTask.priority] - priorityRank[secondTask.priority]
    }

    const firstDueDate = firstTask.dueDate
    const secondDueDate = secondTask.dueDate

    if (!firstDueDate && !secondDueDate) {
      return 0
    }

    if (!firstDueDate) {
      return 1
    }

    if (!secondDueDate) {
      return -1
    }

    return firstDueDate.localeCompare(secondDueDate)
  })

  return sortState.order === 'ascend' ? sortedTasks : sortedTasks.reverse()
}

export function useTaskListPage() {
  const { modal } = App.useApp()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectTaskFilters)
  const pagination = useAppSelector(selectTasksPagination)
  const filteredTasks = useAppSelector(selectFilteredTasks)
  const paginatedTasks = useAppSelector(selectPaginatedTasks)

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [sortState, setSortState] = useState<SortState>({})
  const [searchText, setSearchText] = useState(filters.searchText)

  const hasActiveSort = Boolean(sortState.field && sortState.order)

  const sortedTasks = useMemo(
    () => getSortedTasks(filteredTasks, sortState),
    [filteredTasks, sortState],
  )

  const displayedTasks = useMemo(() => {
    if (!hasActiveSort) {
      return paginatedTasks
    }

    const startIndex = (pagination.currentPage - 1) * pagination.pageSize
    return sortedTasks.slice(startIndex, startIndex + pagination.pageSize)
  }, [hasActiveSort, paginatedTasks, pagination.currentPage, pagination.pageSize, sortedTasks])

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredTasks.length / pagination.pageSize))

    if (pagination.currentPage > totalPages) {
      dispatch(
        setPage({
          currentPage: totalPages,
          pageSize: pagination.pageSize,
        }),
      )
    }
  }, [dispatch, filteredTasks.length, pagination.currentPage, pagination.pageSize])

  useEffect(() => {
    if (searchText === filters.searchText) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      dispatch(setFilter({ searchText }))
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [dispatch, filters.searchText, searchText])

  const deadlineRangeValue: [Dayjs | null, Dayjs | null] | null =
    filters.dateRange.from || filters.dateRange.to
      ? [
          filters.dateRange.from ? dayjs(filters.dateRange.from) : null,
          filters.dateRange.to ? dayjs(filters.dateRange.to) : null,
        ]
      : null

  const handleAddClick = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setEditingTask(null)
    setIsModalOpen(false)
  }

  const handleModalSubmit = (taskDraft: TaskDraft) => {
    if (editingTask) {
      dispatch(
        updateTask({
          id: editingTask.id,
          changes: taskDraft,
        }),
      )
    } else {
      dispatch(addTask(taskDraft))
    }

    setEditingTask(null)
    setIsModalOpen(false)
  }

  const handleDeleteTask = (task: Task) => {
    modal.confirm({
      title: 'Delete task?',
      content: `Are you sure you want to delete "${task.title}"?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: { danger: true },
      onOk: () => {
        dispatch(deleteTask(task.id))
      },
    })
  }

  const handleBulkDelete = () => {
    modal.confirm({
      title: 'Delete selected tasks?',
      content: `Are you sure you want to delete ${selectedRowKeys.length} selected tasks?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: { danger: true },
      onOk: () => {
        dispatch(deleteManyTasks(selectedRowKeys as string[]))
        setSelectedRowKeys([])
      },
    })
  }

  const handleTableChange: TableProps<Task>['onChange'] = (nextPagination, _filters, sorter) => {
    dispatch(
      setPage({
        currentPage: nextPagination.current ?? 1,
        pageSize: nextPagination.pageSize ?? pagination.pageSize,
      }),
    )

    if (Array.isArray(sorter)) {
      const activeSorter = sorter[0]

      setSortState({
        field: activeSorter?.field as SortField | undefined,
        order: activeSorter?.order ?? undefined,
      })

      return
    }

    setSortState({
      field: sorter.field as SortField | undefined,
      order: sorter.order ?? undefined,
    })
  }

  const handleResetFilters = () => {
    setSearchText('')
    dispatch(resetFilters())
  }

  const handleSearchChange = (nextSearchText: string) => {
    setSearchText(nextSearchText)
  }

  const handleStatusFilterChange = (status: TaskStatus[]) => {
    dispatch(setFilter({ status }))
  }

  const handlePriorityFilterChange = (priority: TaskPriority | null) => {
    dispatch(setFilter({ priority }))
  }

  const handleDateRangeChange = (dateStrings: [string, string]) => {
    dispatch(
      setFilter({
        dateRange: {
          from: dateStrings[0] || null,
          to: dateStrings[1] || null,
        },
      }),
    )
  }

  const handleStatusChange = (id: string, status: TaskStatus) => {
    dispatch(updateTaskStatus({ id, status }))
  }

  const modalMode: 'add' | 'edit' = editingTask ? 'edit' : 'add'

  const tablePagination: TableProps<Task>['pagination'] = {
    current: pagination.currentPage,
    pageSize: pagination.pageSize,
    total: filteredTasks.length,
    showSizeChanger: false,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
  }

  return {
    displayedTasks,
    deadlineRangeValue,
    editingTask,
    filters,
    isModalOpen,
    modalMode,
    searchText,
    selectedRowKeys,
    sortState,
    tablePagination,
    handleAddClick,
    handleBulkDelete,
    handleDateRangeChange,
    handleDeleteTask,
    handleEditClick,
    handleModalClose,
    handleModalSubmit,
    handlePriorityFilterChange,
    handleResetFilters,
    handleSearchChange,
    handleSelectedRowKeysChange: setSelectedRowKeys,
    handleStatusChange,
    handleStatusFilterChange,
    handleTableChange,
  }
}
