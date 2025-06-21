import type { Task } from '@/@types';

// 테스트용 더미 데이터
export const mockTasks: Task[] = [
  {
    id: 'ISSUE-104',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '조르디',
    status: 'to-do',
    createdAt: new Date('2021-09-10T18:43:00'),
    updatedAt: new Date('2021-09-10T18:43:00'),
  },
  {
    id: 'ISSUE-105',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '라이언',
    status: 'to-do',
    createdAt: new Date('2021-09-13T09:37:00'),
    updatedAt: new Date('2021-09-13T09:37:00'),
  },
  {
    id: 'ISSUE-101',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '어피치',
    status: 'in-progress',
    createdAt: new Date('2021-09-09T13:45:00'),
    updatedAt: new Date('2021-09-09T13:45:00'),
  },
  {
    id: 'ISSUE-103',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '조르디',
    status: 'in-progress',
    createdAt: new Date('2021-09-09T15:21:00'),
    updatedAt: new Date('2021-09-09T15:21:00'),
  },
  {
    id: 'ISSUE-102',
    title: '이슈 제목을 보여줍니다. 이슈 제목을 보여줍니다.',
    assignee: '어피치',
    status: 'in-progress',
    createdAt: new Date('2021-09-09T17:59:00'),
    updatedAt: new Date('2021-09-09T17:59:00'),
  },
  {
    id: 'ISSUE-100',
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
