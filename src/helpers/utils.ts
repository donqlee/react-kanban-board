import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Task } from '@/@types';
import { ISSUE_PREFIX } from '@/config/constants';

// Tailwind 클래스 병합 유틸리티
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 고유 ID 생성 함수
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// 이슈 번호 생성 함수
export function generateIssueNumber(): string {
  const randomNumber = Math.floor(Math.random() * 900) + 100; // 100-999 범위
  return `${ISSUE_PREFIX}${randomNumber}`;
}

// 날짜 포맷팅 함수 (2021.09.10 18:43 형식)
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 작업 생성 헬퍼 함수
export function createTask(
  title: string,
  assignee?: string,
  description?: string
): Task {
  const now = new Date();

  return {
    id: generateIssueNumber(),
    title,
    description,
    assignee,
    status: 'to-do',
    createdAt: now,
    updatedAt: now,
  };
}

// 작업 업데이트 헬퍼 함수
export function updateTask(task: Task, updates: Partial<Task>): Task {
  return {
    ...task,
    ...updates,
    updatedAt: new Date(),
  };
}
