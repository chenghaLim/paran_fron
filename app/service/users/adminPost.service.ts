import { AdminPostModel } from "@/app/model/user/users.model";
import { AppDispatch } from "@/lib/store";
import { saveError, saveLoading } from "@/lib/features/users/user.slice";
import { adminPostAPI } from "@/app/api/generate/adminPost.api";
import { addAdminPost, deleteAdminPost, saveAdminPosts, updateAdminPost } from "@/lib/features/users/adminPost.slice";
//insert, drop, modify, find**


//게시물 추가
const insert = async (adminPostModel: AdminPostModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await adminPostAPI.insert(adminPostModel)
        if ('id' in response.data && 'name' in response.data) {
            dispatch(addAdminPost(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시글 등록 중 오류 발생했습니다."));
        console.error('Error adding post:', error.response?.data || error.message);
        throw new Error('게시글 등록 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
//게시물 수정
const modify = async (id: number, adminPostModel: AdminPostModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await adminPostAPI.modify(id, adminPostModel)
        if ('id' in response.data && 'title' in response.data) {
            dispatch(updateAdminPost(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시글 수정 중 오류 발생했습니다."));
        console.error('Error updating post:', error.response?.data || error.message);
        throw new Error('게시글 수정 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
//게시글 삭제
const drop = async (id: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true)); // 로딩 시작
        const response = await adminPostAPI.drop(id);
        // 응답 상태가 성공적인 경우만 디스패치
        if (response.status === 200) {
            dispatch(deleteAdminPost(id)); // id만 전달
        } else {
            throw new Error('게시글 삭제 실패');
        }
    } catch (error: any) {
        dispatch(saveError("게시글 삭제 중 오류 발생했습니다."));
        console.error('Error deleting post:', error.response?.data || error.message);
        throw new Error('게시글 삭제 중 오류 발생');
    } finally {
        dispatch(saveLoading(false)); // 로딩 종료
    }
};
//게시물 리스트 조회
const findAll = async (page: number, size: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await adminPostAPI.findAdminPost(page, size)
        if (Array.isArray(response.data)) {
            dispatch(saveAdminPosts(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시물 목록 조회 중 오류 발생했습니다."));
        console.error('Error fetching Apost:', error.response?.data || error.message);
        throw new Error('게시물 목록 조회 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
//게시물 리스트 조회 (닉네임)
const findAllByNickname = async (page: number, size: number, nickname: string, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await adminPostAPI.findAdminPostByNickname(page, size, nickname)
        if (Array.isArray(response.data)) {
            dispatch(saveAdminPosts(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시물 목록 조회 중 오류 발생했습니다."));
        console.error('Error fetching Aposts by nickname:', error.response?.data || error.message);
        throw new Error('게시물 목록 조회 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
//게시물 상세조회
const findByAdminPostId = async (id: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await adminPostAPI.findAdminPostDetail(id)
        if (Array.isArray(response.data)) {
            dispatch(saveAdminPosts(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시물 조회 중 오류 발생했습니다."));
        console.error('Error fetching viewCount:', error.response?.data || error.message);
        throw new Error('게시물 조회 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
//조회수
const findViewCountById = async (id: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await adminPostAPI.findAdminPostViewCount(id)
        if (Array.isArray(response.data)) {
            dispatch(saveAdminPosts(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("조회수 확인 중 오류 발생했습니다."));
        console.error('Error fetching viewCount:', error.response?.data || error.message);
        throw new Error('조회수 확인 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};

export const adminPostService = {
    insert,
    modify,
    drop,
    findAll,
    findAllByNickname,
    findByAdminPostId,
    findViewCountById
}
