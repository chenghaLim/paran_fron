import { ExceptionResponseModel } from "@/app/model/error.model";
import requests from "@/app/api/requests";
import api from "@/app/api/axios";
import {BookResponseModel, LikeBookModel } from "@/app/model/group/book.model";

export const likeBookAPI = {
    insert(likeBookModel: LikeBookModel) {
        return api.post<BookResponseModel>(requests.fetchGroups + `/like-book`, likeBookModel);
    },
    drop(likeBookModel: LikeBookModel) {
        return api.delete<boolean | ExceptionResponseModel>(requests.fetchGroups + `/like-book`, {
            data: likeBookModel
        });
    },
    findByNickname(nickname: string) {
        return api.get<BookResponseModel[]>(requests.fetchGroups + `/like-book/list/${nickname}`);
    }
}
