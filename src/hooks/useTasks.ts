'use client';

import { useState } from 'react';
import type { Task, TaskStatus, CreateTaskInput } from '@/@types';
import { mockTasks } from '@/config/mockData';
import {
  createTask,
  updateTask as updateTaskHelper,
  generateIssueNumber,
} from '@/helpers/utils';

export function useTasks() {
  // 초기 데이터로 더미 데이터 사용
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  // 상태별 작업 가져오기
  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter((task) => task.status === status);
  };

  // 작업 추가
  const addTask = (taskInput: CreateTaskInput): Task => {
    const newTask: Task = {
      id: generateIssueNumber(),
      title: taskInput.title,
      description: taskInput.description,
      assignee: taskInput.assignee,
      status: taskInput.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask;
  };

  // 작업 수정
  const updateTask = (taskId: string, updates: Partial<Task>): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? updateTaskHelper(task, updates) : task
      )
    );
  };

  // 작업 삭제
  const deleteTask = (taskId: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
