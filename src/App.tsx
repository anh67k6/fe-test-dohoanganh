import { Card, List, Progress, Space, Statistic, Tag, Typography } from 'antd'
import {
  selectDoneTasksCount,
  selectInProgressTasksCount,
  selectRecentTasks,
  selectStatusProgress,
  selectTodoTasksCount,
  selectTotalTasksCount,
} from './store/tasksSlice'
import { useAppSelector } from './store/hooks'

const { Title, Text } = Typography

const statusColors = {
  todo: 'default',
  in_progress: 'processing',
  done: 'success',
} as const

const priorityColors = {
  low: 'green',
  medium: 'gold',
  high: 'red',
} as const

function App() {
  const totalTasks = useAppSelector(selectTotalTasksCount)
  const todoTasks = useAppSelector(selectTodoTasksCount)
  const inProgressTasks = useAppSelector(selectInProgressTasksCount)
  const doneTasks = useAppSelector(selectDoneTasksCount)
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
            <Statistic title="Total Tasks" value={totalTasks} />
          </Card>
          <Card>
            <Statistic title="Todo" value={todoTasks} valueStyle={{ color: '#595959' }} />
          </Card>
          <Card>
            <Statistic
              title="In Progress"
              value={inProgressTasks}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
          <Card>
            <Statistic title="Done" value={doneTasks} valueStyle={{ color: '#52c41a' }} />
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
                        <Tag color={statusColors[task.status]}>{task.status}</Tag>
                        <Tag color={priorityColors[task.priority]}>{task.priority}</Tag>
                        {task.assignee ? <Tag>{task.assignee}</Tag> : null}
                      </Space>
                    </div>

                    <div className="text-left md:text-right">
                      <Text type="secondary">Created: {task.createdAt}</Text>
                      {task.dueDate ? (
                        <div>
                          <Text type="secondary">Due: {task.dueDate}</Text>
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

export default App
