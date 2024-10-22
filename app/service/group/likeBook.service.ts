import { LikeBookModel } from '@/app/model/group/book.model';
import { AppDispatch } from "@/lib/store";
import { addLikedBook, deleteLikedBook, saveError, saveLikedBooks, saveLoading } from "@/lib/features/group/book.slice";
import { likeBookAPI } from '@/app/api/generate/likeBook.api';

// 공통 에러 처리 함수
const handleApiError = (error: any, dispatch: AppDispatch, message: string) => {
    dispatch(saveError(message));
    console.error(message, error.response?.data || error.message);
};

// 공통 로딩 처리 함수
const handleLoading = async (dispatch: AppDispatch, callback: () => Promise<void>) => {
    try {
        dispatch(saveLoading(true));
        await callback();
    } catch (error: any) {
        console.error('Error during process:', error.response?.data || error.message);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 좋아요 추가
const insert = async (likeBookModel: LikeBookModel, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        console.log(likeBookModel)
        try {
            const response = await likeBookAPI.insert(likeBookModel);
            if ('title' in response.data) {
                dispatch(addLikedBook(response.data));
            }
        } catch (error: any) {
            handleApiError(error, dispatch, "좋아요 중 오류 발생했습니다.");
        }
    });
};

// 좋아요 취소
const drop = async (likeBookModel: LikeBookModel, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await likeBookAPI.drop(likeBookModel);
            if (likeBookModel.bookId !== undefined) {
                dispatch(deleteLikedBook(likeBookModel.bookId));
            }
        } catch (error: any) {
            handleApiError(error, dispatch, "좋아요 취소 중 오류 발생했습니다.");
        }
    });
};

// 내가 좋아하는 책 목록 조회
const findByNickname = async (nickname: string, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await likeBookAPI.findByNickname(nickname);
            console.log(response.data)
            if(response.data !== null){
                dispatch(saveLikedBooks(response.data));
            }
        } catch (error: any) {
            handleApiError(error, dispatch, "내가 좋아하는 책 찾는 중 오류 발생했습니다.");
        }
    });
};

export const likeBookService = {
    insert,
    drop,
    findByNickname
};
