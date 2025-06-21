'use client';

import Column from '@/components/kanban/Column';
import { useTasks } from '@/hooks/useTasks';
import type { Task, TaskStatus } from '@/@types';

export default function KanbanPage() {
  const { getTasksByStatus, addQuickTask, updateTask, deleteTask } = useTasks();

  // 작업 추가 핸들러
  const handleAddTask = (status: TaskStatus) => {
    const title = prompt('작업 제목을 입력하세요:');
    if (title && title.trim()) {
      addQuickTask(title.trim(), status);
    }
  };

  // 작업 수정 핸들러
  const handleEditTask = (task: Task) => {
    const newTitle = prompt('새로운 제목을 입력하세요:', task.title);
    if (newTitle && newTitle.trim() && newTitle !== task.title) {
      updateTask(task.id, { title: newTitle.trim() });
    }
  };

  // 작업 삭제 핸들러
  const handleDeleteTask = (taskId: string) => {
    const confirmed = confirm('정말로 이 작업을 삭제하시겠습니까?');
    if (confirmed) {
      deleteTask(taskId);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">칸반 보드</h1>

        {/* 칸반 보드 */}
        <div className="grid grid-cols-3 gap-6">
          <Column
            status="to-do"
            title="to-do"
            tasks={getTasksByStatus('to-do')}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
          <Column
            status="in-progress"
            title="in progress"
            tasks={getTasksByStatus('in-progress')}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
          <Column
            status="done"
            title="done"
            tasks={getTasksByStatus('done')}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </main>
  );
}
