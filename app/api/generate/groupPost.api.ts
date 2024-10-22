import {ExceptionResponseModel} from "@/app/model/error.model";
import requests from "@/app/api/requests";
import api from "@/app/api/axios";

import {
    GroupPostModel,
    GroupPostResponseModel,
} from "@/app/model/group/group.model";


export const groupPostAPI = {
    insert(groupPostModel: GroupPostModel){
        return api.post<GroupPostResponseModel>(requests.fetchGroups + '/posts', groupPostModel);
    },
    modify(groupPostModel: GroupPostModel){
        return api.put<GroupPostResponseModel>(requests.fetchGroups + '/posts', groupPostModel);
    },
    drop(boardId: number){
        return api.delete<Boolean>(requests.fetchGroups + `/posts/${boardId}`);
    },
    findByGroupId(groupId: number, page: number, size: number, postCategory: string){
        return api.get<Page<GroupPostResponseModel>>(requests.fetchGroups + `/posts/${groupId}`, {
            params: {page, size, postCategory}
        });
    },
    modifyViewCount(postId: number){
        return api.put<GroupPostResponseModel>(requests.fetchGroups + `/posts/${postId}`);
    }
}
