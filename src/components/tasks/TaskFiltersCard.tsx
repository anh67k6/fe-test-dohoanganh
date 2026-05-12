import { Card, DatePicker, Input, Select } from 'antd'
import type { Dayjs } from 'dayjs'
import { priorityOptions, statusOptions } from '@component/tasks/taskUi'
import type { TaskFilters, TaskPriority, TaskStatus } from '@type/task'

const { RangePicker } = DatePicker

type TaskFiltersCardProps = {
  filters: TaskFilters
  deadlineRangeValue: [Dayjs | null, Dayjs | null] | null
  onDateRangeChange: (dateStrings: [string, string]) => void
  onPriorityChange: (priority: TaskPriority | null) => void
  onSearchChange: (searchText: string) => void
  onStatusChange: (status: TaskStatus[]) => void
}

function TaskFiltersCard({
  filters,
  deadlineRangeValue,
  onDateRangeChange,
  onPriorityChange,
  onSearchChange,
  onStatusChange,
}: TaskFiltersCardProps) {
  return (
    <Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Input
          placeholder="Search title, description, assignee, or tags"
          value={filters.searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Select
          mode="multiple"
          placeholder="Filter by status"
          value={filters.status}
          options={statusOptions}
          onChange={(status) => onStatusChange(status as TaskStatus[])}
        />
        <Select
          allowClear
          placeholder="Filter by priority"
          value={filters.priority}
          options={priorityOptions}
          onChange={(priority) => onPriorityChange((priority as TaskPriority | undefined) ?? null)}
        />
        <RangePicker
          className="w-full"
          value={deadlineRangeValue}
          onChange={(_dates, dateStrings) => onDateRangeChange(dateStrings as [string, string])}
        />
      </div>
    </Card>
  )
}

export default TaskFiltersCard
