export interface UserModel {
  id?: string
  username?: string
  password?: string
  nickname?: string
  role?: string
  tel?: string
  declarationCount?: number
  state?:boolean
  logoutAt?: Date | string
}
// 상태 인터페이스 정의
interface UserState {
  currentUser?: UserModel
  users: UserModel[]
  nickname?: string
  isLoading: boolean
  error: string | null
  successMessage: string | null // 성공 메시지 추가
}

// 초기 상태
export const initialUserState: UserState = {
  currentUser: {} as UserModel,
  users: [],
  nickname: {} as string,
  isLoading: false,
  error: null,
  successMessage: null
};

export interface RegisterModel {
  username: string;
  password: string;
  passwordcheck: string;
  nickname: string;
  name: string;
  tel: string;
}

