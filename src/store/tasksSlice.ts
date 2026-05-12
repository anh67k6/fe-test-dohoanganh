import { createSelector, createSlice } from '@reduxjs/toolkit'
import { mockTasks } from '../ultis/mockData'
import type { Task } from '../types/task'
import type { RootState } from './index'

type TasksState = {
  items: Task[]
}

const initialState: TasksState = {
  items: mockTasks,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
})

const selectTasksState = (state: RootState) => state.tasks

export const selectTasks = createSelector([selectTasksState], (tasksState) => tasksState.items)

export const selectTotalTasksCount = createSelector([selectTasks], (tasks) => tasks.length)

export const selectTodoTasksCount = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((task) => task.status === 'todo').length,
)

export const selectInProgressTasksCount = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((task) => task.status === 'in_progress').length,
)

export const selectDoneTasksCount = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((task) => task.status === 'done').length,
)

export const selectStatusProgress = createSelector(
  [selectTotalTasksCount, selectTodoTasksCount, selectInProgressTasksCount, selectDoneTasksCount],
  (total, todo, inProgress, done) => [
    {
      key: 'todo',
      label: 'Todo',
      count: todo,
      percent: total === 0 ? 0 : Math.round((todo / total) * 100),
      strokeColor: '#d9d9d9',
    },
    {
      key: 'in_progress',
      label: 'In Progress',
      count: inProgress,
      percent: total === 0 ? 0 : Math.round((inProgress / total) * 100),
      strokeColor: '#1677ff',
    },
    {
      key: 'done',
      label: 'Done',
      count: done,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
      strokeColor: '#52c41a',
    },
  ],
)

export const selectRecentTasks = createSelector([selectTasks], (tasks) => {
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
