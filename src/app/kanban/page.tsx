'use client';

import Column from '@/components/kanban/Column';
import { getTasksByStatus } from '@/config/mockData';

export default function KanbanPage() {
  // 이벤트 핸들러들 (나중에 상태 관리에서 구현 예정)
  const handleAddTask = (status: string) => {
    console.log(`Add task to ${status}`);
  };

  const handleEditTask = (task: any) => {
    console.log('Edit task:', task);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log('Delete task:', taskId);
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
