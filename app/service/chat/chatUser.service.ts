import { ChatUserModel } from "@/app/model/chat/chat.model";
import chatUserAPI from "@/app/api/generate/chatUser.api";
import { saveError, saveLoading } from "@/lib/features/chat/chat.slice";
import { AppDispatch } from "@/lib/store";

// 공통 에러 처리 함수
const handleApiError = (error: any, dispatch: AppDispatch, message: string): void => {
    console.error(message, error.response?.data || error.message);
    dispatch(saveError(message));
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

// 유저 채팅방 초대
const insert = async (
    roomId: string,
    nickname: string,
    dispatch: AppDispatch
): Promise<any> => {
    return await handleLoading(dispatch, async () => {
        try {
            const response = await chatUserAPI.insert(roomId, nickname);
            return response.data;
        } catch (error: any) {
            handleApiError(error, dispatch, "방 초대 중 오류 발생했습니다.");
            return false;
        }
    });
};

// 방에 참여 중인 유저 목록 조회
const findList = async ({ roomId, dispatch }: { roomId: string, dispatch: AppDispatch }): Promise<ChatUserModel[]> => {
    return await handleLoading(dispatch, async () => {
        try {
            const response = await chatUserAPI.findList(roomId);
            return Array.isArray(response.data) ? response.data : [];
        } catch (error: any) {
            handleApiError(error, dispatch, "유저 목록을 불러오는 중 오류가 발생했습니다.");
            return [];
        }
    });
};

// 유저 채팅방 나가기
const drop = async ( roomId: string, nickname: string, dispatch: AppDispatch): Promise<any> => {
    return await handleLoading(dispatch, async () => {
        try {
            const response = await chatUserAPI.drop(roomId, nickname);
            return response.data;
        } catch (error: any) {
            handleApiError(error, dispatch, "방 나가는 중 오류 발생했습니다.");
            return false;
        }
    });
};

// 서비스 내보내기
export const chatUserService = {
    insert,
    findList,
    drop
};
