import api from "@/app/api/axios";
import requests from "@/app/api/requests";
import { ChatUserModel } from "@/app/model/chat/chat.model";

const chatUserAPI = {
    insert(roomId: string, nickname: string) {
        return api.post<Boolean>(`${requests.fetchChats}/users?roomId=${roomId}&nickname=${nickname}`);
    },
    findList(roomId: string) {
        return api.get<Boolean | ChatUserModel>(`${requests.fetchChats}/users/list/${roomId}`);
    },
    drop(roomId: string, nickname: string) {
        return api.delete<Boolean>(`${requests.fetchChats}/users/${roomId}?nickname=${nickname}`)
    },
};

export default chatUserAPI;