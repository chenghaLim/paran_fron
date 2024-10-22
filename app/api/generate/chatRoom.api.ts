import api from "@/app/api/axios";
import requests from "@/app/api/requests";
import {ChatRoomModel} from "@/app/model/chat/chat.model";

const chatRoomAPI = {
    findList(nickname: string) {
        return api.get<ChatRoomModel[]>(`${requests.fetchChats}/rooms/list?nickname=${nickname}`);
    },
    insert(roomName: string, nickname: string) {
        return api.post<string | Boolean>(`${requests.fetchChats}/rooms?nickname=${nickname}`,
            {name: roomName}
        );
    },
    modifyName(roomName: string, roomId: string, nickname: string) {
        return api.put<Boolean | String>(`${requests.fetchChats}/rooms/name?nickname=${nickname}`,
            {name: roomName, roomId: roomId}
        );
    },
    modifyPassword(roomId: string, password: string, nickname: string) {
        return api.put<boolean | string>(
            `${requests.fetchChats}/rooms/password?nickname=${nickname}`,
            {password, roomId}
        );
    },
    drop(roomId: string) {
        return api.delete<Boolean>(`${requests.fetchChats}/rooms/${roomId}`);
    },
    insertLastReadMessageTime(roomId: string, nickname: string) {
        return api.post<Boolean>(`${requests.fetchChats}/rooms/last-read-time/${roomId}?nickname=${nickname}`)
    }
};

export default chatRoomAPI;