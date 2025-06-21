// 작업 상태 타입
export type TaskStatus = 'to-do' | 'in-progress' | 'done';

// 개별 작업(Task) 타입
export interface Task {
  id: string; // 이슈번호 (예: ISSUE-104)
  title: string; // 이슈 제목
  description?: string; // 상세 설명 (선택사항)
  assignee?: string; // 담당자 (예: 조르디, 어피치)
  status: TaskStatus; // 현재 상태
  createdAt: Date; // 생성일시
  updatedAt: Date; // 최근 변경일시
}

// 칸반 컬럼 타입
export interface Column {
  id: TaskStatus; // 컬럼 ID (상태와 동일)
  title: string; // 컬럼 제목 (예: "to-do", "in progress", "done")
  tasks: Task[]; // 해당 컬럼의 작업들
}

// 전체 칸반 보드 타입
export interface KanbanBoard {
  columns: Column[];
}

// 작업 생성 시 사용할 타입 (ID와 날짜는 자동 생성)
export interface CreateTaskInput {
  title: string;
  description?: string;
  assignee?: string;
  status: TaskStatus;
}

// 작업 수정 시 사용할 타입
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  assignee?: string;
  status?: TaskStatus;
}

// 모달이나 폼에서 사용할 타입
export interface TaskFormData {
  title: string;
  description: string;
  assignee: string;
}
