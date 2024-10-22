import requests from "@/app/api/requests";
import api from "@/app/api/axios";
import { GroupPostResponseModel, LikePostModel } from "@/app/model/group/group.model";

export const likePostAPI = {
    insert: (likePostModel: LikePostModel) => {
        return api.post<GroupPostResponseModel>(requests.fetchGroups + `/like-post`, likePostModel);
    },
    drop: (likePostModel: LikePostModel) => {
        return api.delete<boolean>(requests.fetchGroups + `/like-post`, {
            data: likePostModel
        });
    },
    findLikePostList: (nickname: string) => {
        return api.get<GroupPostResponseModel[]>(requests.fetchGroups + `/like-post/${nickname}`);
    }
}