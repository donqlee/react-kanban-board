import type { Task } from '@/@types';

// 테스트용 더미 데이터
export const mockTasks: Task[] = [
  {
    id: 'ISSUE-001',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '조르디',
    status: 'to-do',
    createdAt: new Date('2021-09-10T18:43:00'),
    updatedAt: new Date('2021-09-10T18:43:00'),
  },
  {
    id: 'ISSUE-002',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '라이언',
    status: 'to-do',
    createdAt: new Date('2021-09-13T09:37:00'),
    updatedAt: new Date('2021-09-13T09:37:00'),
  },
  {
    id: 'ISSUE-003',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '어피치',
    status: 'in-progress',
    createdAt: new Date('2021-09-09T13:45:00'),
    updatedAt: new Date('2021-09-09T13:45:00'),
  },
  {
    id: 'ISSUE-004',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '조르디',
    status: 'in-progress',
    createdAt: new Date('2021-09-09T15:21:00'),
    updatedAt: new Date('2021-09-09T15:21:00'),
  },
  {
    id: 'ISSUE-005',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '어피치',
    status: 'in-progress',
    createdAt: new Date('2021-09-09T17:59:00'),
    updatedAt: new Date('2021-09-09T17:59:00'),
  },
  {
    id: 'ISSUE-006',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '조르디',
    status: 'done',
    createdAt: new Date('2021-09-08T10:20:00'),
    updatedAt: new Date('2021-09-08T10:20:00'),
  },
];

// 상태별로 작업들을 그룹화하는 함수
export function getTasksByStatus(status: Task['status']) {
  return mockTasks.filter((task) => task.status === status);
}

// localStorage 초기화 함수 (개발용)
export function resetTasksData() {
  localStorage.removeItem('kanban-tasks');
  console.log('localStorage 데이터가 초기화되었습니다.');
}
