'use client';

import type { Task, TaskStatus } from '@/@types';
import TaskCard from './TaskCard';

interface ColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask?: (status: TaskStatus) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
}

export default function Column({
  status,
  title,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: ColumnProps) {
  const handleAddClick = () => {
    onAddTask?.(status);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* 컬럼 헤더 */}
      <div className="p-4 border-b bg-gray-50 rounded-t-lg flex justify-between items-center">
        <h2 className="font-semibold text-gray-700">{title}</h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          항목 추가
        </button>
      </div>

      {/* 컬럼 내용 */}
      <div className="p-4 min-h-96">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-8">
            {getEmptyMessage(status)}
          </p>
        )}
      </div>
    </div>
  );
}

// 빈 상태 메시지 함수
function getEmptyMessage(status: TaskStatus): string {
  switch (status) {
    case 'to-do':
      return 'To-do 항목들이 여기에 표시됩니다';
    case 'in-progress':
      return '진행 중인 항목들이 여기에 표시됩니다';
    case 'done':
      return '완료된 항목들이 여기에 표시됩니다';
    default:
      return '항목들이 여기에 표시됩니다';
  }
}
