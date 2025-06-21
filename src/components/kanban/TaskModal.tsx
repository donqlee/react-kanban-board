'use client';

import { useState, useEffect } from 'react';
import type {
  Task,
  TaskStatus,
  CreateTaskInput,
  UpdateTaskInput,
} from '@/@types';

interface TaskModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit' | 'delete';
  task?: Task; // edit, delete 모드에서 사용
  initialStatus?: TaskStatus; // add 모드에서 사용
  onClose: () => void;
  onSubmit?: (data: CreateTaskInput | UpdateTaskInput) => void;
  onDelete?: (taskId: string) => void;
}

export default function TaskModal({
  isOpen,
  mode,
  task,
  initialStatus = 'to-do',
  onClose,
  onSubmit,
  onDelete,
}: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    assignee: '',
  });

  // 모달이 열릴 때 폼 데이터 초기화
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && task) {
        setFormData({
          title: task.title,
          assignee: task.assignee,
        });
      } else {
        setFormData({
          title: '',
          assignee: '',
        });
      }
    }
  }, [isOpen, mode, task]);

  const handleDelete = () => {
    if (mode === 'delete' && task) {
      onDelete?.(task.id);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.assignee.trim()) return;

    if (mode === 'add') {
      onSubmit?.({
        title: formData.title.trim(),
        assignee: formData.assignee.trim(),
        status: initialStatus,
      } as CreateTaskInput);
    } else if (mode === 'edit' && task) {
      onSubmit?.({
        title: formData.title.trim(),
        assignee: formData.assignee.trim(),
      } as UpdateTaskInput);
    }

    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      assignee: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  // 삭제 확인 모달
  if (mode === 'delete') {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              작업 삭제
            </h2>
            <p className="text-gray-600 mb-6">
              <strong>{task?.id}</strong>을(를) 정말로 삭제하시겠습니까?
              <br />이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 추가/수정 모달
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* 모달 헤더 */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === 'add' ? '항목 추가' : '항목 수정'}
          </h2>
        </div>

        {/* 모달 내용 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 이슈 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이슈 제목
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="이슈 제목을 입력해주세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
              required
            />
          </div>

          {/* 담당자 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              담당자 id
            </label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) =>
                setFormData({ ...formData, assignee: e.target.value })
              }
              placeholder="담당자 id를 입력해주세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* 버튼들 */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              {mode === 'add' ? '추가' : '수정'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
