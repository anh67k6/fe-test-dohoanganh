import { Card, Table, type TableProps } from 'antd'
import type { Key } from 'react'
import type { Task } from '@type/task'

type TasksTableProps = {
  columns: TableProps<Task>['columns']
  dataSource: Task[]
  pagination: TableProps<Task>['pagination']
  selectedRowKeys: Key[]
  onChange: TableProps<Task>['onChange']
  onSelectionChange: (selectedRowKeys: Key[]) => void
}

function TasksTable({
  columns,
  dataSource,
  pagination,
  selectedRowKeys,
  onChange,
  onSelectionChange,
}: TasksTableProps) {
  return (
    <Card>
      <Table<Task>
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectionChange,
        }}
        pagination={pagination}
        onChange={onChange}
      />
    </Card>
  )
}

export default TasksTable
