import requests from "@/app/api/requests";
import api from "@/app/api/axios";
import {BookResponseModel} from "@/app/model/group/book.model";



export const bookAPI = {
    findList(page: number, size: number) {
        return api.get<Page<BookResponseModel>>(`${requests.fetchGroups}/books`, {
            params: {
                page,
                size
            }
        });
    }
}

export default bookAPI;