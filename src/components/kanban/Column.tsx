'use client';

import { useState } from 'react';
import type { Task, TaskStatus } from '@/@types';
import TaskCard from './TaskCard';

interface ColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask?: (status: TaskStatus) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onMoveTaskToPosition?: (
    taskId: string,
    targetStatus: TaskStatus,
    targetIndex?: number
  ) => void;
}

export default function Column({
  status,
  title,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTaskToPosition,
}: ColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleAddClick = () => {
    onAddTask?.(status);
  };

  // 드래그 오버 핸들러 (컬럼 전체)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
    // 컬럼 전체 드래그오버에서는 dragOverIndex 설정하지 않음
  };

  // 드래그 리브 핸들러
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // 컬럼을 완전히 벗어날 때만 초기화
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
      setDragOverIndex(null);
    }
  };

  // 드롭 핸들러 (컬럼 전체) - 파란선 없으면 아무것도 하지 않음
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setDragOverIndex(null);

    // dragOverIndex가 없으면 드롭하지 않음 (원래 자리 유지)
    // 다른 컬럼으로의 이동만 허용
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onMoveTaskToPosition) {
      // 다른 컬럼에서 온 경우에만 맨 끝에 추가
      const draggedTask = tasks.find((t) => t.id === taskId);
      if (!draggedTask || draggedTask.status !== status) {
        onMoveTaskToPosition(taskId, status, tasks.length);
      }
      // 같은 컬럼 내에서는 dragOverIndex가 있을 때만 이동
    }
  };

  // 특정 위치에 드롭 핸들러
  const handleDropAtIndex = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragOverIndex(null);

    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onMoveTaskToPosition) {
      onMoveTaskToPosition(taskId, status, index);
    }
  };

  // 인덱스별 드래그 오버
  const handleDragOverIndex = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(index);
  };

  // 인덱스별 드래그 리브
  const handleDragLeaveIndex = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 짧은 지연 후 dragOverIndex 초기화 (빠른 이동 시 깜빡임 방지)
    setTimeout(() => setDragOverIndex(null), 50);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border transition-colors ${
        isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
          tasks.map((task, index) => (
            <div key={task.id}>
              {/* 카드 위쪽 드롭 존 - 이 카드 앞에 삽입 */}
              <div
                className={`h-6 -mb-3 transition-colors rounded ${
                  dragOverIndex === index
                    ? 'bg-blue-200 border-2 border-blue-400'
                    : 'transparent'
                }`}
                onDragOver={(e) => handleDragOverIndex(e, index)}
                onDragLeave={handleDragLeaveIndex}
                onDrop={(e) => handleDropAtIndex(e, index)}
              />

              {/* 실제 태스크 카드 */}
              <TaskCard
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />

              {/* 마지막 카드인 경우 아래쪽 드롭 존 추가 */}
              {index === tasks.length - 1 && (
                <div
                  className={`h-6 -mt-3 transition-colors rounded ${
                    dragOverIndex === tasks.length
                      ? 'bg-blue-200 border-2 border-blue-400'
                      : 'transparent'
                  }`}
                  onDragOver={(e) => handleDragOverIndex(e, tasks.length)}
                  onDragLeave={handleDragLeaveIndex}
                  onDrop={(e) => handleDropAtIndex(e, tasks.length)}
                />
              )}
            </div>
          ))
        ) : (
          // 빈 컬럼인 경우의 드롭 존
          <div
            className={`h-20 border-2 border-dashed transition-colors rounded-lg flex items-center justify-center ${
              isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDropAtIndex(e, 0)}
          >
            <p className="text-gray-500 text-center">
              {getEmptyMessage(status)}
            </p>
          </div>
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
