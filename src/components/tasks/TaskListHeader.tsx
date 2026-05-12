import { Button, Space, Typography } from 'antd'

const { Title, Text } = Typography

type TaskListHeaderProps = {
  selectedCount: number
  onAdd: () => void
  onBulkDelete: () => void
  onResetFilters: () => void
}

function TaskListHeader({
  selectedCount,
  onAdd,
  onBulkDelete,
  onResetFilters,
}: TaskListHeaderProps) {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <Title level={2} className="!mb-1">
          Task List
        </Title>
        <Text type="secondary">Manage tasks, filters, and status updates.</Text>
      </div>
      <Space wrap>
        <Button onClick={onResetFilters}>Reset Filters</Button>
        <Button danger onClick={onBulkDelete} disabled={selectedCount === 0}>
          Delete Selected
        </Button>
        <Button type="primary" onClick={onAdd}>
          Add New
        </Button>
      </Space>
    </section>
  )
}

export default TaskListHeader
