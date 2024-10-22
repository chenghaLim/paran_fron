import api from '@/app/api/axios';
import requests from '@/app/api/requests';
import { CategoryModel } from '@/app/model/group/category.model';

export const getCategoryList = async (): Promise<CategoryModel[]> => {
    try {
        const response = await api.get<CategoryModel[]>(`${requests.fetchGroups}/category`);
        return response.data;
    } catch (error: any) {
        console.error('Error finding category:', error.response?.data || error.message);
        throw new Error('카테고리 찾는 중 오류 발생');
    }
};
