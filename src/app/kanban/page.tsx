'use client';

import { useState } from 'react';
import Column from '@/components/kanban/Column';
import TaskModal from '@/components/kanban/TaskModal';
import { useTasks } from '@/hooks/useTasks';
import type {
  Task,
  TaskStatus,
  CreateTaskInput,
  UpdateTaskInput,
} from '@/@types';

export default function KanbanPage() {
  const { getTasksByStatus, addTask, updateTask, deleteTask, moveTask } =
    useTasks();

  // 모달 상태 관리
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'delete';
    task?: Task;
    initialStatus?: TaskStatus;
  }>({
    isOpen: false,
    mode: 'add',
  });

  // 작업 추가 핸들러
  const handleAddTask = (status: TaskStatus) => {
    setModalState({
      isOpen: true,
      mode: 'add',
      initialStatus: status,
    });
  };

  // 작업 수정 핸들러
  const handleEditTask = (task: Task) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      task,
    });
  };

  // 작업 삭제 핸들러
  const handleDeleteTask = (taskId: string) => {
    const task = [
      ...getTasksByStatus('to-do'),
      ...getTasksByStatus('in-progress'),
      ...getTasksByStatus('done'),
    ].find((t) => t.id === taskId);

    if (task) {
      setModalState({
        isOpen: true,
        mode: 'delete',
        task,
      });
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      mode: 'add',
    });
  };

  // 모달에서 작업 생성/수정
  const handleModalSubmit = (data: CreateTaskInput | UpdateTaskInput) => {
    if (modalState.mode === 'add') {
      addTask(data as CreateTaskInput);
    } else if (modalState.mode === 'edit' && modalState.task) {
      updateTask(modalState.task.id, data as UpdateTaskInput);
    }
  };

  // 모달에서 작업 삭제
  const handleModalDelete = (taskId: string) => {
    deleteTask(taskId);
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
            onMoveTask={moveTask}
          />
          <Column
            status="in-progress"
            title="in progress"
            tasks={getTasksByStatus('in-progress')}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={moveTask}
          />
          <Column
            status="done"
            title="done"
            tasks={getTasksByStatus('done')}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onMoveTask={moveTask}
          />
        </div>

        {/* 범용 작업 모달 */}
        <TaskModal
          isOpen={modalState.isOpen}
          mode={modalState.mode}
          task={modalState.task}
          initialStatus={modalState.initialStatus}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          onDelete={handleModalDelete}
        />
      </div>
    </main>
  );
}
