import { RoomModel, RoomUpdateModel, TimeModel } from "@/app/model/room/room.model";
import requests from "@/app/api/requests";
import api from "@/app/api/axios";

export const roomAPI = {
    insert(roomModel: RoomModel) { return api.post<RoomModel>(`${requests.fetchRooms}`, roomModel) },

    modify(roomModel: RoomUpdateModel) { return api.put<RoomModel>(`${requests.fetchRooms}`, roomModel) },

    drop(id: number) { return api.delete<boolean>(requests.fetchRooms + `/${id}`) },

    findEnableByNickname(page: number, size: number, nickname:string) { return api.get<Page<RoomModel>>(`${requests.fetchRooms}/user/enabled/${nickname}`, { params: { page, size } }) },
    findDisableByNickname(page: number, size: number, nickname: string) { return api.get<Page<RoomModel>>(`${requests.fetchRooms}/user/disabled/${nickname}`, { params: { page, size } }) },
    
    findEnable(page: number, size: number) { return api.get<Page<RoomModel>>(`${requests.fetchRooms}/enabled`, { params: { page, size } }) },
    findDisable(page: number, size: number) { return api.get<Page<RoomModel>>(`${requests.fetchRooms}/disabled`, { params: { page, size } }) },

    findAllMap(){return api.get<RoomModel[]>(requests.fetchRooms)},

    findByEnabled(page: number, size: number) { return api.get<Page<RoomModel>>(requests.fetchRooms + '/enabled', { params: { page, size } }) },

    modifyConfirm(id: number) { return api.put<RoomModel>(requests.fetchRooms + `/confirm/${id}`) },

    findTime(roomId: number) { return api.get<TimeModel[]>(requests.fetchRooms + `/times/${roomId}`) },

    findLikeRoomList: (nickname: string) => {
        return api.get<RoomModel[]>(requests.fetchRooms + `/like/${nickname}`);
    },
}