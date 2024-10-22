import { AppDispatch } from "@/lib/store";
import { saveError, saveLoading } from "@/lib/features/users/user.slice";
import { LikeRoomModel } from "@/app/model/user/users.model";
import { likeRoomAPI } from "@/app/api/generate/likeRoom.api";
import { addLikedRoom, removeLikedRoom } from "@/lib/features/room/room.slice";
import { RoomModel } from "@/app/model/room/room.model";

const insert = async (likeRoomModel: LikeRoomModel, dispatch: AppDispatch, room: RoomModel): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await likeRoomAPI.insert(likeRoomModel)
        console.log("공간 좋아요: ", response.data)
        if ('id' in response.data && 'nickname' in response.data) {
            dispatch(addLikedRoom(room))
        }
    } catch (error) {
        dispatch(saveError("좋아요 중 오류 발생했습니다."));
        console.error('Error adding likeRoom:', error);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 좋아요 취소
const drop = async (likeRoomModel: LikeRoomModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await likeRoomAPI.drop(likeRoomModel)

        if (likeRoomModel.id !== undefined && response.data) {
            dispatch(removeLikedRoom(likeRoomModel.roomId));
        }
    } catch (error) {
        dispatch(saveError("좋아요 취소 중 오류 발생했습니다."));
        console.error('Error adding likeRoom:', error);
    } finally {
        dispatch(saveLoading(false));
    }
};


export const likeRoomService = {
    insert,
    drop,
};
