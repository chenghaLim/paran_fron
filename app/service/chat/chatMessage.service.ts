import { ChatMessageModel } from "@/app/model/chat/chat.model";
import { AppDispatch } from "@/lib/store";
import { saveError, saveLoading } from "@/lib/features/chat/chat.slice";
import chatMessageAPI from "@/app/api/generate/chatMessage.api";
import { getAccessToken } from "@/app/api/authUtils";
import { EventSourcePolyfill } from "event-source-polyfill";

const findList = async ({ roomId, nickname, onMessage }: {
    roomId: string,
    nickname: string,
    onMessage: (message: ChatMessageModel) => void
}): Promise<() => void> => {
    let eventSource: EventSourcePolyfill | null = null;
    try {

        const token = getAccessToken();
        if (!token) {
            throw new Error('No access token available');
        }
        eventSource = new EventSourcePolyfill(
            process.env.NEXT_PUBLIC_BACK_URL + `/api/chats/messages/${roomId}?nickname=${nickname}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        eventSource.onopen = () => {
            console.log('SSE 연결 성공:', eventSource);
        };

        eventSource.addEventListener('past-message', {
            handleEvent(event: MessageEvent) {
                try {
                    const parsedData: ChatMessageModel = JSON.parse(event.data);
                    console.log('과거 메시지:', parsedData);
                    onMessage(parsedData); // 상태 업데이트 콜백 호출
                } catch (error) {
                    console.error('과거 메시지 파싱 오류:', error);
                }
            }
        });

        eventSource.addEventListener('chat-message', {
            handleEvent(event: MessageEvent) {
                try {
                    const parsedData: ChatMessageModel = JSON.parse(event.data);
                    console.log('실시간 메시지:', parsedData);
                    onMessage(parsedData); // 상태 업데이트 콜백 호출
                } catch (error) {
                    console.error('실시간 메시지 파싱 오류:', error);
                }
            }
        });

        // 오류가 발생했을 때 처리
        eventSource.onerror = (error) => {
            console.error("SSE 연결 오류 발생:", error);
            eventSource?.close();
        };

        // 함수가 호출되면 EventSource 연결을 닫아 구독을 취소하는 unsubscribe 함수 반환
        return () => {
            console.log("SSE 연결 해제");
            eventSource?.close();
        };

    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('SSE 메시지 구독 중 오류 발생:', errorMessage);
        // 에러 발생 시에도 기본적으로 구독 해제하는 함수를 반환
        return () => {
            console.log("SSE 연결 오류로 인해 구독 해제");
        };
    }
};


const insert = async ({ nickname, roomId, message, dispatch }: {
    nickname: string,
    roomId: string,
    message: string,
    dispatch: AppDispatch
}): Promise<any> => {
    try {
        dispatch(saveLoading(true));
        const response = await chatMessageAPI.insert(nickname, roomId, message)
        return response.data;
    } catch (error) {
        dispatch(saveError("채팅 메세지 보내는 중 오류 발생했습니다."));
        console.error('채팅 메세지 보내는 중 오류 발생:', error);
        return false;
    } finally {
        dispatch(saveLoading(false));
    }
}

const findUnReadTotalCount = async ({ nickname, dispatch }: {
    nickname: string,
    dispatch: AppDispatch
}): Promise<any> => {
    try {
        dispatch(saveLoading(true));
        const response = await chatMessageAPI.findUnReadTotalCount(nickname)
        return response.data;
    } catch (error) {
        dispatch(saveError("총 User가 읽지 않은 메세지 갯수 찾는 중 오류가 발생했습니다."));
        console.error('총 User가 읽지 않은 메세지 갯수 찾는 중 오류 발생:', error);
        return 0;
    } finally {
        dispatch(saveLoading(false));
    }
}

export const chatMessageService = {
    findList, insert, findUnReadTotalCount
}