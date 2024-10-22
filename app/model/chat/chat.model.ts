// chatTypes.ts
export interface ChatRoomModel {
    roomId: string;
    name: string;
    password: string;
    userCount: number;
    unReadMessageCount: number;
}

export interface ChatUserModel {
    nickname: string;
    enterTime: string;
}

export interface ChatMessageModel {
    id: string;
    type: "ENTER" | "TALK" | "EXIT";
    nickname: string;
    message: string;
    time: string;
    roomId: string;
}

export interface LastReadMessageTimeModel {
    lastReadMessageTime: string;
    chatRoom: ChatRoomModel
}

// 상태 인터페이스 정의
export interface ChatState {
    rooms: ChatRoomModel[];
    currentRoom: ChatRoomModel | null;
    users: ChatUserModel[];
    messages: ChatMessageModel[];
    isLoading: boolean;
    error: string | null;
    lastReadMessageTimes: LastReadMessageTimeModel[];
}

// 초기 상태
export const initialChatState: ChatState = {
    rooms: [],
    currentRoom: null,
    users: [],
    messages: [],
    isLoading: false,
    error: null,
    lastReadMessageTimes: []
};