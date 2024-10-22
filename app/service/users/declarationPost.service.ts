import { DeclarationPostModel } from "@/app/model/user/users.model";
import { AppDispatch } from "@/lib/store";
import { saveError, saveLoading } from "@/lib/features/users/user.slice";
import { declarationPostAPI } from "@/app/api/generate/declarationPost.api";
import { addDeclarationPost, addDeclarationPostByNickname, deleteDeclarationPost, deleteDeclarationPostByNickname, saveDeclarationPosts, saveDeclarationPostsByNickname } from "@/lib/features/users/declarationPost.slice";



//게시물 추가
const insert = async (declarationPostModel: DeclarationPostModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await declarationPostAPI.insert(declarationPostModel)
        if ('id' in response.data && 'name' in response.data) {
            dispatch(addDeclarationPost(response.data))
            dispatch(addDeclarationPostByNickname(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시글 등록 중 오류 발생했습니다."));
        console.error('Error adding post:', error.response?.data || error.message);
        throw new Error('게시글 등록 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};

//게시글 삭제
const drop = async (id: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true)); // 로딩 시작
        const response = await declarationPostAPI.drop(id);
        // 응답 상태가 성공적인 경우만 디스패치
        if (response.status === 200) {
            dispatch(deleteDeclarationPost(id)); // id만 전달
            dispatch(deleteDeclarationPostByNickname(id))
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
const findAll = async (page: number, size: number, dispatch: AppDispatch): Promise<any> => {
    try {
        dispatch(saveLoading(true));
        const response = await declarationPostAPI.findAll(page, size)
        console.log(response.data.content)
        dispatch(saveDeclarationPosts(response.data.content))
    } catch (error: any) {
        dispatch(saveError("게시물 목록 조회 중 오류 발생했습니다."));
        console.error('Error fetching Aposts :', error.response?.data || error.message);
        throw new Error('게시물 목록 조회 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
//게시물 리스트 조회 (닉네임)
const findByNickname = async (page: number, size: number, nickname: string, dispatch: AppDispatch): Promise<any> => {
    try {
        dispatch(saveLoading(true));
        const response = await declarationPostAPI.findByNickname(page, size, nickname)
        console.log("response 신고 게시판 리스트 띄움 ", response)
        dispatch(saveDeclarationPostsByNickname(response.data.content))
    } catch (error: any) {
        dispatch(saveError("게시물 목록 조회 중 오류 발생했습니다."));
        console.error('Error fetching Dposts by nickname:', error.response?.data || error.message);
        throw new Error('게시물 목록 조회 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};
//게시물 상세조회
const findByPostId = async (id: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await declarationPostAPI.findById(id)
        if (Array.isArray(response.data)) {
            dispatch(saveDeclarationPosts(response.data))
        }
    } catch (error: any) {
        dispatch(saveError("게시물 조회 중 오류 발생했습니다."));
        console.error('Error fetching viewCount:', error.response?.data || error.message);
        throw new Error('게시물 조회 중 오류 발생');
    } finally {
        dispatch(saveLoading(false));
    }
};

export const declarationService = {
    insert,
    drop,
    findAll,
    findByNickname,
    findByPostId
}