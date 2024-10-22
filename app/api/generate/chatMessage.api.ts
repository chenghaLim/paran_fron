import api from "@/app/api/axios";
import requests from "@/app/api/requests";

const chatMessageAPI = {
    insert(nickname: string, roomId: string, message: string) {
        return api.post<boolean>(`${requests.fetchChats}/messages?nickname=${nickname}`, {
            message,
            roomId
        });
    },
    findUnReadTotalCount(nickname: string) {
        return api.get<number>(`${requests.fetchChats}/messages/total-un-read?nickname=${nickname}`)
    }
};

export default chatMessageAPI;