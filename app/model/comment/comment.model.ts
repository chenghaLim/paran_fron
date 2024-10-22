// commentTypes.ts
export interface CommentRequestModel {
  content: string;
  postId: number;
  step?: number;
  depth?: number;
  parentId?: number;
}

export interface CommentResponseModel {
  id: number;
  content: string;
  nickname: string;
  postId: number;
  ref: number;
  step: number;
  depth: number;
  createdAt: string;
}

// 상태 인터페이스 정의
export interface CommentState {
  comments: CommentResponseModel[];
  currentComment: CommentResponseModel | null;
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
export const initialCommentState: CommentState = {
  comments: [],
  currentComment: null,
  isLoading: false,
  error: null
};