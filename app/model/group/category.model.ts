export interface CategoryState {
    categories: CategoryModel[];
    isLoading: boolean;
    error: string | null;
}

// 초기 상태
export const initialCategoryState: CategoryState = {
    categories: [],
    isLoading: false,
    error: null
};


export interface CategoryModel {
    name: string;
}