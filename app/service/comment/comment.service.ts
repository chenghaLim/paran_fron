import { CommentRequestModel, CommentResponseModel } from '@/app/model/comment/comment.model';
import { ExceptionResponseModel } from '@/app/model/error.model';
import { commentAPI } from "@/app/api/generate/commant.api";
import { AppDispatch } from "@/lib/store";
import { saveError, saveLoading } from "@/lib/features/comment/comment.slice";


// 댓글 등록
const insert = async (model: CommentRequestModel, nickname: string, dispatch: AppDispatch): Promise<boolean | ExceptionResponseModel> => {
    try {
        dispatch(saveLoading(true));
        const response = await commentAPI.insert(model, nickname)
        return response.data;
    } catch (error) {
        dispatch(saveError("댓글 등록 중 오류 발생했습니다."));
        console.error('Error inserting comment:', error);
        throw new Error('댓글 등록 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};

// 댓글 삭제
const drop = async (commentId: number, dispatch: AppDispatch): Promise<boolean> => {
    try {
        dispatch(saveLoading(true));
        const response = await commentAPI.drop(commentId)
        return response.data;
    } catch (error) {
        dispatch(saveError("댓글 삭제 중 오류 발생했습니다."));
        console.error('Error deleting comment:', error);
        throw new Error('댓글 삭제 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};

// 댓글 수정
const modify = async (commentId: number, content: string, nickname: string, dispatch: AppDispatch): Promise<boolean> => {
    try {
        dispatch(saveLoading(true));
        const response = await commentAPI.modify(commentId, content, nickname)
        return response.data;
    } catch (error) {
        dispatch(saveError("댓글 수정 중 오류 발생했습니다."));
        console.error('Error updating comment:', error);
        throw new Error('댓글 수정 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};

// 특정 게시물에 대한 댓글 리스트 가져오기
const findByPostId = async (postId: number, page: number, size: number, dispatch: AppDispatch): Promise<CommentResponseModel[]> => {
    try {
        dispatch(saveLoading(true));
        const response = await commentAPI.findByPostId(postId, page, size)
        return response.data.content;
    } catch (error) {
        dispatch(saveError("댓글 리스트 가져오기 중 오류 발생했습니다."));
        console.error('Error fetching comment list:', error);
        throw new Error('댓글 리스트 가져오기 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
export const commentService = {
    insert, drop, modify, findByPostId
}
