import { Card, List, Progress, Space, Statistic, Tag, Typography } from 'antd'
import {
  formatTaskDate,
  priorityColors,
  priorityLabels,
  statusColors,
  statusLabels,
} from '@component/tasks/taskUi'
import { useAppSelector } from '@store/hooks'
import { selectRecentTasks, selectStatusProgress, selectTaskStats } from '@store/tasksSlice'

const { Title, Text } = Typography

function DashboardPage() {
  const taskStats = useAppSelector(selectTaskStats)
  const statusProgress = useAppSelector(selectStatusProgress)
  const recentTasks = useAppSelector(selectRecentTasks)

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="flex flex-col gap-2">
          <Title level={2} className="!mb-0">
            TaskBoard Dashboard
          </Title>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <Statistic title="Total Tasks" value={taskStats.total} />
          </Card>
          <Card>
            <Statistic title="Todo" value={taskStats.todo} valueStyle={{ color: '#595959' }} />
          </Card>
          <Card>
            <Statistic
              title="In Progress"
              value={taskStats.inProgress}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
          <Card>
            <Statistic title="Done" value={taskStats.done} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1fr]">
          <Card title="Progress by Status">
            <Space direction="vertical" size="large" className="w-full">
              {statusProgress.map((item) => (
                <div key={item.key} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <Text strong>{item.label}</Text>
                    <Text type="secondary">
                      {item.count} task • {item.percent}%
                    </Text>
                  </div>
                  <Progress percent={item.percent} strokeColor={item.strokeColor} showInfo={false} />
                </div>
              ))}
            </Space>
          </Card>

          <Card title="5 Most Recent Tasks">
            <List
              dataSource={recentTasks}
              renderItem={(task) => (
                <List.Item>
                  <div className="flex w-full flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="flex flex-col gap-1">
                      <Text strong>{task.title}</Text>
                      {task.description ? <Text type="secondary">{task.description}</Text> : null}
                      <Space size={[8, 8]} wrap>
                        <Tag color={statusColors[task.status]}>{statusLabels[task.status]}</Tag>
                        <Tag color={priorityColors[task.priority]}>{priorityLabels[task.priority]}</Tag>
                        {task.assignee ? <Tag>{task.assignee}</Tag> : null}
                      </Space>
                    </div>

                    <div className="text-left md:text-right">
                      <Text type="secondary">Created: {formatTaskDate(task.createdAt)}</Text>
                      {task.dueDate ? (
                        <div>
                          <Text type="secondary">Due: {formatTaskDate(task.dueDate)}</Text>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
