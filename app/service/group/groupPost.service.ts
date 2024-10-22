import { GroupPostModel, GroupPostResponseModel } from '@/app/model/group/group.model';
import { AppDispatch } from "@/lib/store";
import {
    addGroupPost,
    deleteGroupPost,
    saveError,
    saveGroupPosts,
    saveLoading,
    updateGroupPost
} from "@/lib/features/group/group.slice";
import { groupPostAPI } from '@/app/api/generate/groupPost.api';
import { Retryer } from 'react-query/types/core/retryer';

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

// 게시글 추가
const insert = async (
    groupPostModel: GroupPostModel,
    dispatch: AppDispatch
): Promise<GroupPostResponseModel> => {

    try {
        dispatch(saveLoading(true));
        const response = await groupPostAPI.insert(groupPostModel);
        // 응답 데이터 유효성 검사
        if (response?.data?.id && response?.data?.title) {
            dispatch(addGroupPost(response.data)); // Redux에 게시글 추가
            return response.data; // 유효한 데이터 반환
        } else {
            throw new Error('유효하지 않은 응답입니다.');
        }
    } catch (error: any) {
        // API 에러 처리
        handleApiError(error, dispatch, '게시글 등록 중 오류 발생했습니다.');
        throw new Error('게시글 등록 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
// 게시글 수정
const modify = async (groupPostModel: GroupPostModel, dispatch: AppDispatch): Promise<GroupPostResponseModel> => {
    try {
        dispatch(saveLoading(true));
        const response = await groupPostAPI.modify(groupPostModel);
        if ('id' in response.data && 'title' in response.data) {
            dispatch(updateGroupPost(response.data));
        }
        return response.data
    } catch (error: any) {
        handleApiError(error, dispatch, "게시글 수정 중 오류 발생했습니다.");
        throw new Error('게시글 수정 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};

// 게시글 삭제
const drop = async (boardId: number, dispatch: AppDispatch, postCategory: string): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            await groupPostAPI.drop(boardId);
            dispatch(deleteGroupPost({ id: boardId, postCategory }));
        } catch (error: any) {
            handleApiError(error, dispatch, "게시글 삭제 중 오류 발생했습니다.");
            throw new Error('게시글 삭제 중 오류 발생');
        }
    });
};

// 내가 속한 그룹의 게시물 목록 조회
const findByGroupId = async (groupId: number, page: number, size: number, postCategory: string, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupPostAPI.findByGroupId(groupId, page, size, postCategory);
            dispatch(saveGroupPosts(response.data.content));
            console.log(response.data)
        } catch (error: any) {
            handleApiError(error, dispatch, "게시물 목록 조회 중 오류 발생했습니다.");
            throw new Error('게시물 목록 조회 중 오류 발생');
        }
    });
};

// 게시물 조회수 수정
const modifyViewCount = async (postId: number, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupPostAPI.modifyViewCount(postId);
            if ('boardId' in response.data && 'title' in response.data) {
                dispatch(updateGroupPost(response.data));
            }
        } catch (error: any) {
            handleApiError(error, dispatch, "게시물 조회수 수정 중 오류 발생했습니다.");
            throw new Error('게시물 조회수 수정 중 오류 발생');
        }
    });
};

export const groupPostService = {
    insert,
    modify,
    drop,
    findByGroupId,
    modifyViewCount
};
