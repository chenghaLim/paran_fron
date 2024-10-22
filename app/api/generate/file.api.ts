import { FileDeleteModel, FileModel, FileType } from "@/app/model/file/file.model";
import api from "../axios";
import qs from "qs"
import requests from "../requests";

export const fileAPI = {
    findAll(refIds: number[], type: FileType) {
        return api.get<FileModel[]>(`${requests.fetchFiles}/list`, {
            params: { type: type, refIds: refIds },
            paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' })
        });
    },
    insert(file: any, type: FileType, refId: number) {
        const formData = new FormData();
        formData.append('file', file); // 파일 추가
        formData.append('type', type);
        formData.append('refId', refId.toString());

        return api.post<FileModel>(`${requests.fetchFiles}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    drop(fileModel: FileDeleteModel) {
        return api.delete<boolean>(`${requests.fetchFiles}`, { data: fileModel });
    },
    findByRefId(refId: number, type: FileType) {
        return api.get<Blob>(`${requests.fetchFiles}/${refId}`, {
            params: { type }, // 쿼리 파라미터로 전달
            responseType: "blob", // Blob 타입으로 응답 받기
        })
    }
}

