import type { TaskStatus, Column } from '@/@types';

// 칸반 컬럼 설정
export const KANBAN_COLUMNS: Column[] = [
  {
    id: 'to-do',
    title: 'to-do',
    tasks: [],
  },
  {
    id: 'in-progress',
    title: 'in progress',
    tasks: [],
  },
  {
    id: 'done',
    title: 'done',
    tasks: [],
  },
];

// 상태별 색상 매핑
export const STATUS_COLORS: Record<TaskStatus, string> = {
  'to-do': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',
};

// 기본 설정
export const DEFAULT_TASK_TITLE = '새로운 작업';
export const ISSUE_PREFIX = 'ISSUE-';
