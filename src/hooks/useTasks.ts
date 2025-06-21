'use client';

import { useState, useEffect } from 'react';
import type { Task, TaskStatus, CreateTaskInput } from '@/@types';
import { mockTasks } from '@/config/mockData';
import { updateTask as updateTaskHelper } from '@/helpers/utils';
import { ISSUE_PREFIX } from '@/config/constants';

const STORAGE_KEY = 'kanban-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 초기 데이터 로드
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('localStorage 데이터 파싱 오류:', error);
        setTasks(mockTasks);
        saveTasksToStorage(mockTasks);
      }
    } else {
      // 처음 사용 시 더미 데이터로 초기화
      setTasks(mockTasks);
      saveTasksToStorage(mockTasks);
    }
  }, []);

  // localStorage에 저장하는 함수
  const saveTasksToStorage = (tasksToSave: Task[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave));
  };

  // 기존 작업들에서 가장 큰 번호 찾기
  const getNextIssueNumber = (): string => {
    if (tasks.length === 0) return `${ISSUE_PREFIX}001`;

    const maxNumber = tasks.reduce((max, task) => {
      const match = task.id.match(/ISSUE-(\d+)/);
      if (match) {
        const number = parseInt(match[1], 10);
        return Math.max(max, number);
      }
      return max;
    }, 0);

    const nextNumber = maxNumber + 1;
    return `${ISSUE_PREFIX}${nextNumber.toString().padStart(3, '0')}`;
  };

  // 상태별 작업 가져오기
  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter((task) => task.status === status);
  };

  // 작업 추가
  const addTask = (taskInput: CreateTaskInput): Task => {
    const newTask: Task = {
      id: getNextIssueNumber(),
      title: taskInput.title,
      assignee: taskInput.assignee,
      status: taskInput.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);

    return newTask;
  };

  // 작업 수정
  const updateTask = (taskId: string, updates: Partial<Task>): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updateTaskHelper(task, updates) : task
    );

    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  // 작업 삭제
  const deleteTask = (taskId: string): void => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  // 작업 상태 변경 (드래그 앤 드롭용)
  const moveTask = (taskId: string, newStatus: TaskStatus): void => {
    updateTask(taskId, { status: newStatus });
  };

  // 빠른 작업 추가 (제목만으로)
  const addQuickTask = (title: string, status: TaskStatus = 'to-do'): Task => {
    return addTask({
      title,
      status,
    });
  };

  return {
    tasks,
    getTasksByStatus,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addQuickTask,
  };
}
