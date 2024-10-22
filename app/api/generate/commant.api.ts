import api from '../axios';
import requests from "@/app/api/requests";
import {ExceptionResponseModel} from "@/app/model/error.model";
import {CommentRequestModel, CommentResponseModel} from "@/app/model/comment/comment.model";

export const commentAPI = {
    insert(model: CommentRequestModel, nickname: string) {
        return api.post<boolean | ExceptionResponseModel>(`${requests.fetchComments}`, model, {
            headers: {
                nickname,
            },
        });
    },
    drop(commentId: number) {
        return api.delete<boolean>(`${requests.fetchComments}/${commentId}`);
    },
    modify(commentId: number, content: string, nickname: string) {
        return api.put<boolean>(`${requests.fetchComments}/${commentId}`, {content}, {
            headers: {
                nickname,
            },
        });
    },
    findByPostId(postId: number, page: number, size: number) {
        return api.get<Page<CommentResponseModel>>(`${requests.fetchComments}/${postId}`, {
            params: {
                page,
                size
            }
        });
    }
};

export default commentAPI;