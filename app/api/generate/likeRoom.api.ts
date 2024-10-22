import { LikeRoomModel } from "@/app/model/user/users.model";
import requests from "@/app/api/requests";
import api from "@/app/api/axios";

export const likeRoomAPI = {
    insert: (likeRoomModel: LikeRoomModel) => {
        return api.post<LikeRoomModel>(requests.fetchRooms + `/likerooms`, likeRoomModel);
    },
    drop: (likeRoomModel: LikeRoomModel) => {
        return api.delete<boolean>(requests.fetchRooms + '/likerooms', likeRoomModel);
    },
   
}