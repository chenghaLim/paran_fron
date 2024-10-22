
import requests from "@/app/api/requests";
import { } from "@/app/model/user/user.model";
import { FriendModel } from "@/app/model/user/users.model";
import api from "@/app/api/axios";

export const friendAPI = {
    insert: (friendModel: FriendModel) => {
        return api.post<FriendModel>(requests.fetchUsers + `/friends/request`, friendModel);
    },
    drop: (id: number) => {
        return api.delete<boolean>(requests.fetchUsers + `/friends/${id}`);
    },
    findFriendList: (nickname: String) => {
        return api.get<FriendModel[]>(requests.fetchUsers + `/friends/${nickname}`);
    },
    modifyFriend: (friendModel: FriendModel) => {
        return api.post<FriendModel>(requests.fetchUsers + '/friends/state', friendModel, {
            params: { state: true }
        });
    }
}

