import {ExceptionResponseModel} from "@/app/model/error.model";
import requests from "@/app/api/requests";
import api from "@/app/api/axios";

import {
    GroupModel,
    GroupResponseModel,
    JoiningModel,
} from "@/app/model/group/group.model";

export const groupApi = {
    findList(page: number, size: number) {
        return api.get<Page<GroupResponseModel>>(requests.fetchGroups + '/groups', {params: {page, size}});
    },
    findByNickname(nickname: string) {
        return api.get<GroupResponseModel[]>(requests.fetchGroups + '/groups/my-groups', {
            params: {
                nickname
            }
        });
    },
    insert(groupModel: GroupModel) {
        return api.post<GroupResponseModel>(requests.fetchGroups + '/groups', groupModel);
    },
    able(groupId: number) {
        return api.put<GroupResponseModel>(requests.fetchGroups + `/groups/able?groupId=${groupId}`);
    },
    enable(groupId: number) {
        return api.put<GroupResponseModel>(requests.fetchGroups + `/groups/enable?groupId=${groupId}`);
    },
    enableUser(groupId: number, nickname: string) {
        return api.put<GroupResponseModel | ExceptionResponseModel>(requests.fetchGroups + `/groups/enable-user?groupId=${groupId}&nickname=${nickname}`);
    },
    findUserById(groupId: number) {
        return api.get<JoiningModel[]>(requests.fetchGroups + `/groups/users/${groupId}`);
    },
    modifyChatRoomId(roomId: number, groupId: number) {
        return api.put<GroupResponseModel | ExceptionResponseModel>(requests.fetchGroups + `/groups/chat-room/${groupId}`, {roomId});
    },
    insertUser(joiningModel: JoiningModel) {
        return api.post<JoiningModel | ExceptionResponseModel>(requests.fetchGroups + '/groups/user', joiningModel);
    },
    ableUser(groupId: number, nickname: string) {
        return api.put<JoiningModel | ExceptionResponseModel>(requests.fetchGroups + `/groups/able-user?groupId=${groupId}&nickname=${nickname}`);
    },
    drop(groupId: number) {
        return api.delete<Boolean | ExceptionResponseModel>(requests.fetchGroups + `/groups/${groupId}`);
    },
    enableList(page: number, size: number) {
        return api.get<Page<GroupResponseModel>>(`${requests.fetchGroups}/groups/enable-list`, {
            params: {
                page,
                size
            }
        });
    },
    
    dropUser(nickname: string, groupId: number) {
        return api.delete<Boolean>(`${requests.fetchGroups}/groups/users/${groupId}`, {
            data: { nickname }
        });
    },
    findEnableUser(groupId:number) {
        return api.get<JoiningModel[]>(`${requests.fetchGroups}/groups/users/enable/${groupId}`);
    }

}
