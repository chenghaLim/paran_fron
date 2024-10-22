import { roomAPI } from "@/app/api/generate/room.api";
import { TimeModel } from "@/app/model/room/room.model";
import { saveLoading } from "@/lib/features/room/room.slice";
import { AppDispatch } from "@/lib/store";

const findByRoom = async (roomId: number, dispatch: AppDispatch): Promise<TimeModel[]> => {
    try {
        dispatch(saveLoading(true));
        const response = await roomAPI.findTime(roomId)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
            throw new Error('서버에서 오류가 발생했습니다.');
        } else if (error.request) {
            console.error('No Response:', error.request);
            throw new Error('서버 응답이 없습니다.');
        } else {
            console.error('Error:', error.message);
            throw new Error('요청 설정 중 오류가 발생했습니다.');
        }
    }
};

export const timeService = {
    findByRoom
}