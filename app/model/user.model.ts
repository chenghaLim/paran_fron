export interface UserModel {
  id?: number;
  name: string;
  password: string;
  nickname: string;
}

// 상태 인터페이스 정의
interface UserState {
  currentUser?: UserModel;
  users: UserModel[];
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
export const initialUserState: UserState = {
  currentUser: {} as UserModel,
  users: [],
  isLoading: false,
  error: null
};