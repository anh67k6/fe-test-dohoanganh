import { type Task } from '../types/task';

export const mockTasks: Task[] = [
  { id: 't1', title: 'Khởi tạo dự án Vite', description: 'Setup React 18 + TS strict mode', status: 'done', priority: 'high', assignee: 'Dev A', dueDate: '2026-05-12', createdAt: '2026-05-10', tags: ['setup', 'frontend'] },
  { id: 't2', title: 'Cấu hình Redux Toolkit', description: 'Tạo store, root reducer và tasksSlice', status: 'done', priority: 'high', assignee: 'Dev A', dueDate: '2026-05-12', createdAt: '2026-05-10', tags: ['redux', 'setup'] },
  { id: 't3', title: 'Thiết kế Mock Data', description: 'Tạo 20 task mẫu cho TaskBoard', status: 'done', priority: 'medium', assignee: 'Dev A', createdAt: '2026-05-11', tags: ['data'] },
  { id: 't4', title: 'Tích hợp Ant Design', description: 'Cài đặt antd v5 và thiết lập theme', status: 'done', priority: 'high', assignee: 'Dev B', createdAt: '2026-05-11', tags: ['ui', 'antd'] },
  { id: 't5', title: 'Cấu hình Tailwind CSS', description: 'Setup tailwindcss 3.x, loại bỏ conflict với antd', status: 'in_progress', priority: 'high', assignee: 'Dev B', dueDate: '2026-05-13', createdAt: '2026-05-11', tags: ['css', 'styling'] },
  { id: 't6', title: 'Xây dựng Task List Component', description: 'Dùng Table của antd để hiển thị danh sách', status: 'in_progress', priority: 'high', assignee: 'Dev C', dueDate: '2026-05-14', createdAt: '2026-05-11', tags: ['feature', 'ui'] },
  { id: 't7', title: 'Tạo Filter Component', description: 'Bộ lọc theo status, priority và tags', status: 'todo', priority: 'medium', assignee: 'Dev C', dueDate: '2026-05-15', createdAt: '2026-05-11', tags: ['feature'] },
  { id: 't8', title: 'Thêm Form tạo Task mới', description: 'Sử dụng Form của antd kèm validation', status: 'todo', priority: 'high', assignee: 'Dev A', dueDate: '2026-05-16', createdAt: '2026-05-11', tags: ['feature', 'form'] },
  { id: 't9', title: 'Chức năng Edit Task', description: 'Cập nhật thông tin task trực tiếp trên UI', status: 'todo', priority: 'medium', dueDate: '2026-05-17', createdAt: '2026-05-11', tags: ['feature'] },
  { id: 't10', title: 'Chức năng Delete Task', description: 'Thêm confirm modal trước khi xoá', status: 'todo', priority: 'low', createdAt: '2026-05-11', tags: ['feature'] },
  { id: 't11', title: 'Kanban Board View', description: 'Hiển thị dạng cột kéo thả', status: 'todo', priority: 'low', assignee: 'Dev B', dueDate: '2026-05-20', createdAt: '2026-05-11', tags: ['feature', 'ui'] },
  { id: 't12', title: 'Viết Unit Test cho Reducers', description: 'Sử dụng Vitest để test logic của Slice', status: 'todo', priority: 'medium', assignee: 'QA', dueDate: '2026-05-22', createdAt: '2026-05-11', tags: ['testing'] },
  { id: 't13', title: 'Cấu hình ESLint & Prettier', description: 'Đảm bảo code style đồng nhất', status: 'in_progress', priority: 'low', assignee: 'Dev A', createdAt: '2026-05-11', tags: ['setup', 'tooling'] },
  { id: 't14', title: 'Review Code PR #1', description: 'Review phần setup base architecture', status: 'done', priority: 'high', assignee: 'Tech Lead', dueDate: '2026-05-11', createdAt: '2026-05-10', tags: ['review'] },
  { id: 't15', title: 'Tối ưu hoá bundle size', description: 'Sử dụng vite-plugin-chunk-split', status: 'todo', priority: 'low', createdAt: '2026-05-11', tags: ['performance'] },
  { id: 't16', title: 'Thêm Dark Mode', description: 'Sử dụng ConfigProvider của antd kết hợp tailwind', status: 'todo', priority: 'low', assignee: 'Dev B', createdAt: '2026-05-11', tags: ['ui', 'theme'] },
  { id: 't17', title: 'Tạo Dashboard Component', description: 'Hiển thị thống kê tổng quan (Chart)', status: 'todo', priority: 'medium', dueDate: '2026-05-25', createdAt: '2026-05-11', tags: ['feature', 'dashboard'] },
  { id: 't18', title: 'Xử lý Responsive', description: 'Đảm bảo giao diện hoạt động tốt trên Mobile', status: 'todo', priority: 'high', assignee: 'Dev C', dueDate: '2026-05-26', createdAt: '2026-05-11', tags: ['css', 'responsive'] },
  { id: 't19', title: 'Chuẩn bị tài liệu hướng dẫn', description: 'Viết README.md cho dự án', status: 'todo', priority: 'low', assignee: 'Dev A', createdAt: '2026-05-11', tags: ['docs'] },
  { id: 't20', title: 'Deploy lên Vercel', description: 'Setup CI/CD deployment', status: 'todo', priority: 'high', assignee: 'Dev A', dueDate: '2026-05-30', createdAt: '2026-05-11', tags: ['deploy', 'devops'] },
];