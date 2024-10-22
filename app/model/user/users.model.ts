// 상태 인터페이스 정의
interface UserState {
  users: UserModel[];
  likeRooms: LikeRoomModel[];
  friends: FriendModel[];
  alreadyFriends: FriendModel[];
  requestFriends: FriendModel[];
  responseFriends: FriendModel[];
  currentAdminpost: AdminPostModel;
  adminPosts: AdminPostModel[];
  declarationPosts: DeclarationPostModel[];
  declarationPostsByNickname: DeclarationPostModel[];
  currentDeclarationPost: DeclarationPostModel | null,
  checkedNames: CheckedNamesModel[];
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
export const initialUserState: UserState = {
  users: [],
  likeRooms: [],
  friends: [],
  alreadyFriends: [],
  requestFriends: [],
  responseFriends: [],
  currentAdminpost: {} as AdminPostModel,
  currentDeclarationPost: null,
  adminPosts: [],
  declarationPosts: [],
  declarationPostsByNickname: [],
  checkedNames: [],
  isLoading: false,
  error: null
};

export enum CheckType {
  ROOM = "room",
  GROUP = "group"
}

export interface CheckedNamesModel {
  id: number;
  nickname: string;
  type: CheckType;
}

export interface UserModel {
  id?: number;
  name: string;
  password: string;
  nickname: string;
}

export interface AdminPostModel {
  id?: number; // 관리자 게시판 ID (선택사항)
  title: string; // 제목 (필수)
  content: string; // 내용 (필수)
  category: string; //카테고리
  nickname: string; // 글쓴 사람 닉네임(필수)
  createdDate: string; // 글 작성 시간 (필수, "yyyy-MM-dd HH:mm" 형식)
  viewCount: number; //조회수(필수)
  lastModifiedDate: string; // 글 수정 시간 (필수, "yyyy-MM-dd HH:mm" 형식)
}

export interface DeclarationPostModel {
  id?: number; // 신고게시판 ID (선택)
  title: string; // 제목 (필수)
  content: string; // 신고 내용 (필수)
  target: string; // 신고 당한 사람 (필수)
  declarer: string; // 신고자 (필수)
  // createdAt: string;
}

export interface FriendModel {
  id?: number; // 친구 ID(선택)
  responseUser: string; // 친구 요청 수신자
  requestUser: string; // 친구 요청 발신자
  requestAt?: string; // 요청 보낸 시간
  responseAt?: string; // 요청 수락 시간
}

export interface LikeRoomModel {
  id?: number; //공간 좋아요 ID(선택)
  roomId: number; // 공간 ID(필수)
  nickname: string; //닉네임 (필수)
}