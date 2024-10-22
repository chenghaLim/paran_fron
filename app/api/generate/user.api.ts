import api from "@/app/api/axios";
import requests from "@/app/api/requests";
import { RegisterModel, UserModel } from "@/app/model/user/user.model";
import { ExceptionResponseModel } from "@/app/model/error.model";
//insert, drop, modify, find**
export const userAPI = {

    insert: (registerModel: RegisterModel) => {
        return api.post<Boolean>(`${requests.fetchUsers}`, registerModel);
    },
    findAllUser: (nickname: string) => {
        return api.get(`${requests.fetchUsers}/findAllByNickname?nickname=${nickname}`);
    },
    findDetailUser: (nickname: string) => {
        return api.get(`${requests.fetchUsers}/findByNickname?nickname=${nickname}`);
    },
    modifyPassword: (nickname: string, newPassword: string) => {
        return api.put(`${requests.fetchUsers}/updatePassword?nickname=${nickname}&&newPassword=${newPassword}`);
    },
    modifyRole: (nickname: string, newRole: string) => {
        return api.put(`${requests.fetchUsers}/updateRole?nickname=${nickname}&&newRole=${newRole}`);
    },
    modifyDeclaration: (nickname: string) => {
        return api.put(`${requests.fetchUsers}/updateDeclaration?nickname=${nickname}`);
    },

    drop: (nickname: string | undefined) => {
        const response =  api.put(`${requests.fetchUsers}?nickname=${nickname}`);
        console.log("response DeleteUser", response)
        return response
    },
    modifyLogoutTime: (nickname: string) => {
        return api.put(`${requests.fetchUsers}/logoutUserTime?nickname=${nickname}`);
    },

    checkRole: (nickname: string) => {
        return api.get(`${requests.fetchUsers}/checkRole?nickname=${nickname}`);
    },

    checkNickname: (userModel: UserModel) => {
        return api.post<UserModel | ExceptionResponseModel>(requests.fetchUsers + '/checkNickname', userModel);
    },

    checkPassword: (userModel: UserModel) => {
        return api.post<UserModel | ExceptionResponseModel>(requests.fetchUsers + '/checkPassword', userModel);
    }
}

export default userAPI;