import { Form } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { useEffect } from 'react'
import type { Task, TaskDraft } from '@type/task'

export type TaskFormValues = {
  title: string
  description?: string
  status: Task['status']
  priority: Task['priority']
  assignee?: string
  dueDate?: Dayjs
  tags?: string[]
}

type UseTaskFormModalProps = {
  open: boolean
  task: Task | null
  onCancel: () => void
  onSubmit: (task: TaskDraft) => void
}

const defaultValues: TaskFormValues = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assignee: '',
  tags: [],
}

export function useTaskFormModal({ open, task, onCancel, onSubmit }: UseTaskFormModalProps) {
  const [form] = Form.useForm<TaskFormValues>()

  useEffect(() => {
    if (!open) {
      return
    }

    form.resetFields()

    if (!task) {
      form.setFieldsValue(defaultValues)
      return
    }

    form.setFieldsValue({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate ? dayjs(task.dueDate) : undefined,
      tags: task.tags ?? [],
    })
  }, [form, open, task])

  const handleSubmit = async () => {
    const values = await form.validateFields()

    onSubmit({
      title: values.title,
      description: values.description,
      status: values.status,
      priority: values.priority,
      assignee: values.assignee,
      dueDate: values.dueDate?.format('YYYY-MM-DD'),
      tags: values.tags,
    })

    form.resetFields()
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  return {
    form,
    handleCancel,
    handleSubmit,
  }
}
