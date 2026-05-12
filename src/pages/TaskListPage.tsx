import TaskFiltersCard from '@component/tasks/TaskFiltersCard'
import TaskFormModal from '@component/tasks/TaskFormModal'
import TaskListHeader from '@component/tasks/TaskListHeader'
import TasksTable from '@component/tasks/TasksTable'
import { useTaskListPage } from '@hook/tasks/useTaskListPage'
import { useTaskTableColumns } from '@hook/tasks/useTaskTableColumns'

function TaskListPage() {
  const {
    displayedTasks,
    deadlineRangeValue,
    editingTask,
    filters,
    isModalOpen,
    modalMode,
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
    handleSelectedRowKeysChange,
    handleStatusChange,
    handleStatusFilterChange,
    handleTableChange,
  } = useTaskListPage()

  const columns = useTaskTableColumns({
    sortState,
    onDelete: handleDeleteTask,
    onEdit: handleEditClick,
    onStatusChange: handleStatusChange,
  })

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <TaskListHeader
          selectedCount={selectedRowKeys.length}
          onAdd={handleAddClick}
          onBulkDelete={handleBulkDelete}
          onResetFilters={handleResetFilters}
        />

        <TaskFiltersCard
          filters={filters}
          deadlineRangeValue={deadlineRangeValue}
          onDateRangeChange={handleDateRangeChange}
          onPriorityChange={handlePriorityFilterChange}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusFilterChange}
        />

        <TasksTable
          columns={columns}
          dataSource={displayedTasks}
          pagination={tablePagination}
          selectedRowKeys={selectedRowKeys}
          onChange={handleTableChange}
          onSelectionChange={handleSelectedRowKeysChange}
        />
      </div>

      <TaskFormModal
        open={isModalOpen}
        mode={modalMode}
        task={editingTask}
        onCancel={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </main>
  )
}

export default TaskListPage
