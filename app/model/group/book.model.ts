export interface BookState {
    books: BookResponseModel[];
    likedBooks: BookResponseModel[];
    currentBook: BookResponseModel | null;
    isLoading: boolean;
    error: string | null;
    totalPage: number;
}

// 초기 상태
export const initialBookState: BookState = {
    books: [],
    likedBooks: [],
    currentBook: null,
    isLoading: false,
    error: null,
    totalPage: 0
};

export interface BookResponseModel {
    id: number;
    title: string;
    author: string;
    categoryName: string;
    likeBookCount: number;
    size: number;
    number: number;
}

export interface LikeBookModel {
    id?: number
    nickname: string;
    bookId?: number;
}