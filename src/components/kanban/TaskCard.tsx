'use client';

import type { Task } from '@/@types';
import { formatDate } from '@/helpers/utils';
import { cn } from '@/helpers/utils';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  // 드래그 시작 핸들러
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
    >
      {/* 이슈번호와 버튼들 */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-gray-600">{task.id}</span>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit?.(task)}
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-colors"
          >
            수정
          </button>
          <button
            onClick={() => onDelete?.(task.id)}
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-colors"
          >
            삭제
          </button>
        </div>
      </div>

      {/* 작업 제목 */}
      <h3 className="text-sm text-gray-800 mb-3 leading-relaxed">
        {task.title}
      </h3>

      {/* 담당자와 날짜 */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{task.assignee}</span>
        <span>{formatDate(task.createdAt)}</span>
      </div>
    </div>
  );
}
