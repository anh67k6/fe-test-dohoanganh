import { DatePicker, Form, Input, Modal, Select } from 'antd'
import { priorityOptions, statusOptions } from '@component/tasks/taskUi'
import { useTaskFormModal } from '@hook/tasks/useTaskFormModal'
import type { Task, TaskDraft } from '@type/task'

type TaskFormModalProps = {
  open: boolean
  mode: 'add' | 'edit'
  task: Task | null
  onCancel: () => void
  onSubmit: (task: TaskDraft) => void
}

function TaskFormModal({ open, mode, task, onCancel, onSubmit }: TaskFormModalProps) {
  const { form, handleCancel, handleSubmit } = useTaskFormModal({
    open,
    task,
    onCancel,
    onSubmit,
  })

  return (
    <Modal
      open={open}
      title={mode === 'add' ? 'Add New Task' : 'Edit Task'}
      okText={mode === 'add' ? 'Create' : 'Save'}
      cancelText="Cancel"
      onOk={handleSubmit}
      onCancel={handleCancel}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" className="pt-4">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title.' }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Enter task description" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select a status.' }]}
        >
          <Select options={statusOptions} placeholder="Select status" />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please select a priority.' }]}
        >
          <Select options={priorityOptions} placeholder="Select priority" />
        </Form.Item>

        <Form.Item name="assignee" label="Assigned Person">
          <Input placeholder="Enter assignee name" />
        </Form.Item>

        <Form.Item name="dueDate" label="Deadline">
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select mode="tags" tokenSeparators={[',']} placeholder="Add tags" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TaskFormModal
