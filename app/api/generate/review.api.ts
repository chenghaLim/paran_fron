import { ReviewModel, ReviewUpdateModel } from "@/app/model/room/review.model";
import requests from "@/app/api/requests";
import api from "@/app/api/axios";

export const reviewAPI = {
    insert(reviewModel: ReviewModel) { return api.post<ReviewModel>(requests.fetchRooms + '/reviews', reviewModel); },

    modify(reviewModel: ReviewUpdateModel) { return api.put<ReviewModel>(requests.fetchRooms + '/reviews', reviewModel); },

    drop(id: number) { return api.delete<boolean>(requests.fetchRooms + `/reviews/${id}`); },

    findAll(page: number, size: number) { return api.get<Page<ReviewModel>>(requests.fetchRooms + '/reviews', { params: { page, size } }); },

    findByRoom(roomId: number, page: number, size: number) { return api.get<Page<ReviewModel>>(requests.fetchRooms + `/reviews/room/${roomId}`, { params: { page, size } }); },

    findByUser(nickname: string, page: number, size: number) { return api.get<Page<ReviewModel>>(requests.fetchRooms + `/reviews`, { params: { nickname, page, size } }); },
}