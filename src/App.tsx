import { Layout, Menu, Typography } from 'antd'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import DashboardPage from '@page/DashboardPage'
import TaskListPage from '@page/TaskListPage'

const { Header, Content } = Layout
const { Text } = Typography

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedKey = location.pathname.startsWith('/tasks') ? '/tasks' : '/'

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between gap-4 px-4 md:px-8">
        <Text className="!text-base !font-semibold !text-white md:!text-lg">TaskBoard</Text>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={[
            { key: '/', label: 'Dashboard' },
            { key: '/tasks', label: 'Tasks' },
          ]}
          onClick={({ key }) => navigate(key)}
          className="min-w-0 flex-1 justify-end border-0 bg-transparent"
        />
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App
