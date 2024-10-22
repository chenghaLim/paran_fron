// 상태 인터페이스 정의
export interface GroupState {
    groups: GroupResponseModel[]
    enableGroups: GroupResponseModel[]
    userGroups: GroupResponseModel[]
    leadergroups: GroupResponseModel[]
    likePosts: GroupPostResponseModel[];
    groupMembers: { groupMembers: any;[groupId: number]: JoiningModel[] }
    groupEnableMembers: { groupEnableMembers: any;[groupId: number]: JoiningModel[] }
    groupPostsNotices: GroupPostResponseModel[]
    groupPostsGenerals: GroupPostResponseModel[]
    currentGroup?: GroupResponseModel
    currentGroupPost: GroupPostResponseModel | null
    isLoading: boolean
    error: string | null
}

// 초기 상태
export const initialGroupState: GroupState = {
    groups: [],
    enableGroups: [],
    userGroups: [],
    leadergroups: [],
    likePosts: [],
    groupMembers: { groupMembers: [] },
    groupEnableMembers: { groupEnableMembers: [] },
    groupPostsNotices: [],
    groupPostsGenerals: [],
    currentGroup: {} as GroupResponseModel,
    currentGroupPost: null,
    isLoading: false,
    error: null,
};

export interface GroupModel {
    name: string
    categoryName: string
    detail: string
    nickname?: string
}

export interface JoiningModel {
    id?: number;
    nickname: string;
    enabled?: boolean;
    groupId: number;
    requestAt?: string;
    responseAt?: string;
}

export interface GroupResponseModel {
    id: number;
    name: string;
    categoryName: string;
    createAt: string;
    enabled: boolean;
    detail: string;
    nickname: string;
    chatRoomId: string;
}

export interface GroupPostModel {
    boardId?: number;
    title: string;
    content: string;
    userGroupId: number;
    postCategory: string;
    nickname: string;
}

export interface GroupPostResponseModel {
    id: number;
    title: string;
    content: string;
    createAt: string;
    modifyAt?: string;
    postCategory: string;
    viewCount: number;
    nickname: string;
    groupId: number;
    groupName?: string;
    bookId?: number;
    bookTitle?: string;
}

export interface LikePostModel {
    id?: number; //게시물 좋아요 ID(선택)
    postId: number; //게시물 ID(필수)
    nickname: string; // 닉네임(필수)
}