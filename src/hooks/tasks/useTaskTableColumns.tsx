import { Button, Select, Space, Tag, type TableProps } from 'antd'
import { useMemo } from 'react'
import {
  priorityColors,
  priorityLabels,
  statusColors,
  statusLabels,
  statusOptions,
} from '@component/tasks/taskUi'
import type { SortState } from '@hook/tasks/useTaskListPage'
import type { Task } from '@type/task'

type UseTaskTableColumnsProps = {
  sortState: SortState
  onDelete: (task: Task) => void
  onEdit: (task: Task) => void
  onStatusChange: (id: string, status: Task['status']) => void
}

export function useTaskTableColumns({
  sortState,
  onDelete,
  onEdit,
  onStatusChange,
}: UseTaskTableColumnsProps): TableProps<Task>['columns'] {
  return useMemo(
    () => [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: true,
        sortOrder: sortState.field === 'title' ? sortState.order : null,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_value, task) => (
          <Space size="small" wrap>
            <Tag color={statusColors[task.status]}>{statusLabels[task.status]}</Tag>
            <Select
              size="small"
              value={task.status}
              options={statusOptions}
              onChange={(status: Task['status']) => onStatusChange(task.id, status)}
            />
          </Space>
        ),
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        sorter: true,
        sortOrder: sortState.field === 'priority' ? sortState.order : null,
        render: (priority: Task['priority']) => (
          <Tag color={priorityColors[priority]}>{priorityLabels[priority]}</Tag>
        ),
      },
      {
        title: 'Assignee',
        dataIndex: 'assignee',
        key: 'assignee',
        render: (assignee?: string) => assignee || '—',
      },
      {
        title: 'Deadline',
        dataIndex: 'dueDate',
        key: 'dueDate',
        sorter: true,
        sortOrder: sortState.field === 'dueDate' ? sortState.order : null,
        render: (dueDate?: string) => dueDate || '—',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_value, task) => (
          <Space size="small">
            <Button type="link" onClick={() => onEdit(task)}>
              Edit
            </Button>
            <Button danger type="link" onClick={() => onDelete(task)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [onDelete, onEdit, onStatusChange, sortState.field, sortState.order],
  )
}
