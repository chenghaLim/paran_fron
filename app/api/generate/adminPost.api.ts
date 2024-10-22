import api from '../axios';
import requests from "@/app/api/requests";
import {AdminPostModel} from "@/app/model/user/users.model";

export const adminPostAPI = {
    findAdminPost: (page: number, size: number) => {
        return api.get<Page<AdminPostModel>>(`${requests.fetchUsers}/aboard`, {
            params: {
                page,
                size
            }
        });
    },
    findAdminPostByNickname: (page: number, size: number, nickname: string) => {
        return api.get<Page<AdminPostModel>>(`${requests.fetchUsers}/aboard/${nickname}`, {
            params: {
                page,
                size
            }
        });
    },
    findAdminPostDetail:(id:number)=>{
        return api.get<AdminPostModel[]>(requests.fetchUsers + `/aboard/list/${id}`);
    },
    insert: (adminPostModel: AdminPostModel) => {
        return api.post<AdminPostModel>(requests.fetchUsers + '/aboard', adminPostModel);
    },
    modify: (id:number, adminPostModel: AdminPostModel) => {
        return api.put<AdminPostModel>(requests.fetchUsers + `/aboard/${id}`, adminPostModel);
    },
    drop: (id: number) => {
        return api.delete<Boolean>(`${requests.fetchUsers}/aboard/${id}`);
    },
    findAdminPostViewCount:(id:number) => {
        return api.get<number>(requests.fetchUsers + `aboard/viewcount/${id}`);
    }
}