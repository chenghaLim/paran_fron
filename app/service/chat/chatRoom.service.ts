import { ChatRoomModel } from "@/app/model/chat/chat.model";
import { saveError, saveLoading } from "@/lib/features/chat/chat.slice";
import { AppDispatch } from "@/lib/store";
import chatRoomAPI from "@/app/api/generate/chatRoom.api";

// 공통 에러 처리 함수
const handleApiError = (error: any, dispatch: AppDispatch, message: string) => {
    const errorMessage = (error as Error).message || 'Unknown error';
    dispatch(saveError(message));
    console.error(message, errorMessage);
    return errorMessage;
};

// 공통 로딩 처리 함수
const handleLoading = async (dispatch: AppDispatch, callback: () => Promise<any>): Promise<any> => {
    try {
        dispatch(saveLoading(true));
        return await callback();
    } finally {
        dispatch(saveLoading(false));
    }
};

// 채팅방 생성
const insert = async ({ roomName, nickname, dispatch }: {
    roomName: string,
    nickname: string,
    dispatch: AppDispatch
}): Promise<any> => {
    return await handleLoading(dispatch, async () => {
        try {
            const response = await chatRoomAPI.insert(roomName, nickname);
            return response.data;
        } catch (error) {
            return handleApiError(error, dispatch, "방 생성 중 오류 발생했습니다.");
        }
    });
};

// 채팅방 목록 조회
const findList = async ({ nickname, dispatch }: {
    nickname: string,
    dispatch: AppDispatch
}): Promise<any> => {
    return await handleLoading(dispatch, async () => {
        try {
            const response = await chatRoomAPI.findList(nickname);
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            handleApiError(error, dispatch, "방 목록을 불러오는 중 오류가 발생했습니다.");
            return [];
        }
    });
};

// 채팅방 이름 수정
const modifyName = async ({ roomName, roomId, nickname, dispatch }: {
    roomName: string,
    roomId: string,
    nickname: string,
    dispatch: AppDispatch
}): Promise<any> => {
    return await handleLoading(dispatch, async () => {
        try {
            const response = await chatRoomAPI.modifyName(roomName, roomId, nickname);
            return response.data;
        } catch (error) {
            return handleApiError(error, dispatch, "이름 수정 중 오류 발생했습니다.");
        }
    });
};

// 채팅방 비밀번호 수정
const modifyPassword = async ({ roomId, password, nickname, dispatch }: {
    roomId: string,
    password: string,
    nickname: string,
    dispatch: AppDispatch
}): Promise<any> => {
    return await handleLoading(dispatch, async () => {
        try {
            const response = await chatRoomAPI.modifyPassword(roomId, password, nickname);
            return response.data;
        } catch (error) {
            return handleApiError(error, dispatch, "비밀번호 변경 중 오류 발생했습니다.");
        }
    });
};

// 채팅방 삭제
const drop = async ({ roomId, dispatch }: { roomId: string, dispatch: AppDispatch }): Promise<boolean> => {
    return await handleLoading(dispatch, async () => {
        try {
            const response = await chatRoomAPI.drop(roomId);
            return response.data;
        } catch (error) {
            handleApiError(error, dispatch, "방 삭제 중 오류 발생했습니다.");
            return false;
        }
    });
};

// 마지막 읽은 메시지 시간 저장
const insertLastReadMessageTime = async ({ roomId, nickname, dispatch }: {
    roomId: string,
    nickname: string,
    dispatch: AppDispatch
}): Promise<any> => {
    return await handleLoading(dispatch, async () => {
        try {
            const response = await chatRoomAPI.insertLastReadMessageTime(roomId, nickname);
            return response.data;
        } catch (error) {
            handleApiError(error, dispatch, "마지막 읽은 메시지 시간 저장 중 오류 발생");
            return false;
        }
    });
};

export const chatRoomService = {
    insert,
    findList,
    modifyName,
    modifyPassword,
    drop,
    insertLastReadMessageTime
};
