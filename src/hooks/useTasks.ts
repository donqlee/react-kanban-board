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

  // 작업 순서 변경 (같은 컬럼 내에서)
  const reorderTasks = (
    sourceIndex: number,
    destinationIndex: number,
    status: TaskStatus
  ): void => {
    const columnTasks = getTasksByStatus(status);
    const otherTasks = tasks.filter((task) => task.status !== status);

    // 배열에서 요소 이동
    const [movedTask] = columnTasks.splice(sourceIndex, 1);
    columnTasks.splice(destinationIndex, 0, movedTask);

    // 전체 작업 배열 업데이트
    const updatedTasks = [...otherTasks, ...columnTasks];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const moveTaskToPosition = (
    taskId: string,
    targetStatus: TaskStatus,
    targetIndex?: number
  ): void => {
    const taskToMove = tasks.find((t) => t.id === taskId);
    if (!taskToMove) return;

    // 이동 전 원래 컬럼 작업 배열
    const currentColumnTasks = tasks.filter(
      (t) => t.status === taskToMove.status
    );
    // 이동 전 원래 컬럼 내 인덱스
    const sourceIndex = currentColumnTasks.findIndex((t) => t.id === taskId);

    // 이동할 작업 제외한 모든 작업들
    const filteredTasks = tasks.filter((t) => t.id !== taskId);

    // 타겟 컬럼의 작업들 (이동할 작업은 빠진 상태)
    const targetColumnTasks = filteredTasks.filter(
      (t) => t.status === targetStatus
    );

    // 같은 컬럼이면 보정 필요!
    let insertIndex =
      targetIndex !== undefined ? targetIndex : targetColumnTasks.length;
    if (
      taskToMove.status === targetStatus &&
      sourceIndex !== -1 &&
      insertIndex > sourceIndex
    ) {
      // 뺐을 때 index 하나 감소되므로 -1
      insertIndex -= 1;
    }

    // 상태 및 날짜 갱신
    const updatedTask = {
      ...taskToMove,
      status: targetStatus,
      updatedAt: new Date(),
    };

    // 타겟 컬럼 배열에 insert
    targetColumnTasks.splice(insertIndex, 0, updatedTask);

    // 나머지
    const otherColumnTasks = filteredTasks.filter(
      (t) => t.status !== targetStatus
    );

    // 완성
    const finalTasks = [...otherColumnTasks, ...targetColumnTasks];

    setTasks(finalTasks);
    saveTasksToStorage(finalTasks);
  };

  return {
    tasks,
    getTasksByStatus,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasks,
    moveTaskToPosition,
  };
}
