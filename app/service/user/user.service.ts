import { RegisterModel, UserModel } from "@/app/model/user/user.model";
import { AppDispatch } from "@/lib/store";
import { deleteUser, logoutUser, saveCurrentUser, saveError, saveLoading, saveSuccess, saveUserList } from "@/lib/features/users/user.slice";
import userAPI from "@/app/api/generate/user.api";

// 사용자 등록
const insertUser = async (registerModel: RegisterModel, isSeller: boolean, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await userAPI.insert(registerModel);
        console.log("회원가입 결과: ", response);
        if (response.data) {
            if (isSeller && registerModel.nickname) {
                console.log(registerModel.nickname)
                modifyRole(registerModel.nickname, "ROLE_SELLER", dispatch)
            }
            dispatch(saveSuccess("사용자가 성공적으로 등록되었습니다."));
        } else {
            throw new Error('사용자 등록 실패');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "사용자 등록 중 오류 발생했습니다.";
        dispatch(saveError(errorMessage));
        console.error('Error adding user:', errorMessage);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 비밀번호 수정
const modifyPassword = async (nickname: string, newPassword: string, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await userAPI.modifyPassword(nickname, newPassword);

        if (response.status === 200) {
            dispatch(saveSuccess("비밀번호가 성공적으로 수정되었습니다."));
        } else {
            throw new Error('비밀번호 수정 실패');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "비밀번호 수정 중 오류 발생했습니다.";
        dispatch(saveError(errorMessage));
        console.error('Error updating password:', errorMessage);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 권한 수정
const modifyRole = async (nickname: string, newRole: string, dispatch: AppDispatch): Promise<any> => {
    try {
        dispatch(saveLoading(true));
        console.log("dispatch 연결 됨.", dispatch)
        const response = await userAPI.modifyRole(nickname, newRole);
        console.log("response 확인용", response)
        if (response.status === 200) {
            dispatch(saveSuccess("권한이 성공적으로 수정되었습니다."));
        } else {
            throw new Error('권한 수정 실패');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "권한 수정 중 오류 발생했습니다.";
        dispatch(saveError(errorMessage));
        console.error('Error updating role:', errorMessage);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 신고횟수 추가
const modifyDeclaration = async (nickname: string, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await userAPI.modifyDeclaration(nickname);

        if (response.status === 200) {
            dispatch(saveSuccess("신고횟수가 성공적으로 추가되었습니다."));
        } else {
            throw new Error('신고횟수 추가 실패');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "신고횟수 추가 중 오류 발생했습니다.";
        dispatch(saveError(errorMessage));
        console.error('Error updating declaration count:', errorMessage);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 사용자 리스트 조회
const findAllUsers = async (nickname: string, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await userAPI.findAllUser(nickname);

        if (Array.isArray(response.data)) {
            dispatch(saveUserList(response.data)); // 사용자 리스트를 저장하는 액션
        } else {
            throw new Error('사용자 목록 조회 실패');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "사용자 목록 조회 중 오류 발생했습니다.";
        dispatch(saveError(errorMessage));
        console.error('Error fetching all users:', errorMessage);
    } finally {
        dispatch(saveLoading(false));
    }
};

const findUserDetail = async (nickname: string, dispatch: AppDispatch): Promise<any> => {
    try {
        const response = await userAPI.findDetailUser(nickname);
        console.log("findUserDetail", response);
        // 현재 로그인 한 유저의 정보를 담음.
        dispatch(saveCurrentUser(response.data));
    } catch (error) {
        console.error("Error fetching user detail:", error);
        throw error; 
    }
}

// 권한 확인
const checkRole = async (nickname: string, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true)); // 로딩 상태 시작
        const response = await userAPI.checkRole(nickname); // 사용자 권한 확인 API 호출 이거 안됨
        if (response.data) {
            dispatch(saveSuccess("확인 완료")); // 권한 정보를 저장하는 액션
        } else {
            throw new Error('권한 확인 실패');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "권한 확인 중 오류 발생했습니다.";
        dispatch(saveError(errorMessage)); // 에러 메시지를 저장
        console.error('Error checking role:', errorMessage); // 에러 로그 출력
    } finally {
        dispatch(saveLoading(false)); // 로딩 상태 종료
    }
};

// 회원 탈퇴
const dropUser = async (nickname: string, dispatch: AppDispatch): Promise<any> => {
    try {
        dispatch(saveLoading(true));
        const response = await userAPI.drop(nickname);

        if (response.status === 200) {
            dispatch(saveSuccess("사용자가 성공적으로 삭제되었습니다."));
            dispatch(deleteUser(nickname))
        } else {
            throw new Error('회원 탈퇴 실패');
        }
        console.log("user drop 확인 : ", response.data)
        return response.data
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "회원 탈퇴 중 오류 발생했습니다.";
        dispatch(saveError(errorMessage));
        console.error('Error deleting user:', errorMessage);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 닉네임 중복 확인
const checkNickname = async (userModel: UserModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await userAPI.checkNickname(userModel);

        if (response.data) {
            dispatch(saveSuccess("닉네임 사용 가능."));
        } else {
            throw new Error('닉네임 중복 확인 실패');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "닉네임 중복 확인 중 오류 발생했습니다.";
        dispatch(saveError(errorMessage));
        console.error('Error checking nickname:', errorMessage);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 비밀번호 확인
const checkPassword = async (userModel: UserModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await userAPI.checkPassword(userModel);

        if (response.data) {
            dispatch(saveSuccess("비밀번호 확인 성공."));
        } else {
            throw new Error('비밀번호 확인 실패');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "비밀번호 확인 중 오류 발생했습니다.";
        dispatch(saveError(errorMessage));
        console.error('Error checking password:', errorMessage);
    } finally {
        dispatch(saveLoading(false));
    }
};
// 로그아웃 시간을 업데이트하는 함수
const modifyLogoutTime = (nickname: string) => async (dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true)); // 로딩 시작
        await userAPI.modifyLogoutTime(nickname); // 로그아웃 시간 API 호출
        dispatch(logoutUser(nickname)); // 로그아웃 사용자 상태 업데이트
    } catch (error: any) {
        dispatch(saveError("로그아웃 시간 업데이트 중 오류 발생했습니다."));
        console.error('Error updating logout time:', error.response?.data || error.message);
    } finally {
        dispatch(saveLoading(false)); // 로딩 종료
    }
};

export const userService = {
    insertUser,
    modifyPassword,
    modifyRole,
    modifyDeclaration,
    findAllUsers,
    findUserDetail,
    checkRole,
    dropUser,
    checkNickname,
    checkPassword,
    modifyLogoutTime,
};