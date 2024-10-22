import { GroupModel, JoiningModel } from '@/app/model/group/group.model';
import { groupApi } from "@/app/api/generate/group.api";
import {
    addGroupMember,
    deleteGroup,
    deleteGroupMember,
    saveError,
    saveGroupMembers,
    saveUserGroups,
    saveGroups,
    saveLoading,
    updateGroup,
    saveLeaderGroups,
    saveGroupEnableMembers,
    deleteGroupEnableMember,
    addGroupEnableMember,
    addGroup,
    addEnableGroup,
    deleteEnableGroup,
    saveEnableGroups,
} from "@/lib/features/group/group.slice";
import { AppDispatch } from "@/lib/store";


// 그룹 관련 서비스 로직
const handleApiError = (error: any, dispatch: AppDispatch, message: string) => {
    dispatch(saveError(message));
    console.error(message, error.response?.data || error.message);
};

const handleLoading = async (dispatch: AppDispatch, callback: () => Promise<void>) => {
    try {
        dispatch(saveLoading(true));
        await callback();
    } catch (error: any) {
        console.error('Error during loading process:', error.response?.data || error.message);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 전체 그룹 조회 승인된 소모임
const findList = async (page: number, size: number, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.findList(page, size);
            dispatch(saveGroups(response.data.content));
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임 조회 중 오류 발생했습니다.");
        }
    });
};

// 참여중인 소모임 조회
const findByNickname = async (nickname: string, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.findByNickname(nickname);
            dispatch(saveUserGroups(response.data));
            dispatch(saveLeaderGroups(response.data.filter((group) => group.nickname === nickname)))
        } catch (error: any) {
            handleApiError(error, dispatch, "참여 중인 소모임 조회 중 오류 발생했습니다.");
        }
    });
};

// 소모임 등록
const insert = async (groupModel: GroupModel, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.insert(groupModel);
            console.log("groups insert 에서 실행됩니다₩", response.data)
            dispatch(addEnableGroup(response.data))
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임 등록 중 오류 발생했습니다.");
        }
    });
};

// 소모임 승인 요청
const able = async (groupId: number, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.able(groupId);
            dispatch(addGroup(response.data))
            dispatch(deleteEnableGroup(response.data.id))
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임 승인 요청 중 오류 발생했습니다.");
        }
    });
};

// 소모임 승인 취소
const enable = async (groupId: number, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.enable(groupId);
            dispatch(deleteGroup(response.data.id))
            dispatch(addEnableGroup(response.data))
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임 승인 취소 중 오류 발생했습니다.");
        }
    });
};

// 소모임 참여중인 멤버 리스트
const findUserById = async (groupId: number, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.findUserById(groupId);

            const ableUsers = response.data.filter((user) => user.enabled === true);
            const enableUsers = response.data.filter((user) => user.enabled !== true)
            dispatch(saveGroupMembers(ableUsers));
            dispatch(saveGroupEnableMembers(enableUsers))
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임 멤버 승인 목록을 불러 오는 중 오류 발생했습니다.");
        }
    });
};

// 소모임에 채팅방 추가
const modifyChatRoomId = async (roomId: number, groupId: number, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.modifyChatRoomId(roomId, groupId);
            if ('id' in response.data && 'name' in response.data) {
                dispatch(updateGroup(response.data));
            }
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임 채팅방 추가 중 오류 발생했습니다.");
        }
    });
};

// 소모임 멤버 추가
const insertUser = async (joiningModel: JoiningModel, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.insertUser(joiningModel);
            if ('groupId' in response.data && 'nickname' in response.data) {
                dispatch(addGroupEnableMember(response.data));
            }
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임 멤버 추가 중 오류 발생했습니다.");
        }
    });
};

// 소모임 멤버 승인
const ableUser = async (groupId: number, nickname: string, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.ableUser(groupId, nickname);
            if ('groupId' in response.data && 'nickname' in response.data) {
                dispatch(addGroupMember(response.data));
                dispatch(deleteGroupEnableMember({ groupId, nickname }))
            }
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임 멤버 승인 중 오류 발생했습니다.");
        }
    });
};

// 소모임 삭제
const drop = async (groupId: number, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            await groupApi.drop(groupId);
            dispatch(deleteGroup(groupId));
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임 삭제 중 오류 발생했습니다.");
        }
    });
};

// 소모임 승인해야 하는 리스트 찾기
const enableList = async (page: number, size: number, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.enableList(page, size);
            dispatch(saveEnableGroups(response.data.content))
        } catch (error: any) {
            handleApiError(error, dispatch, "승인해야하는 소모임 찾는 중 오류 발생했습니다.");
        }
    });
};

// 소모임 나가기
const dropUser = async (nickname: string, groupId: number, dispatch: AppDispatch): Promise<void> => {
    await handleLoading(dispatch, async () => {
        try {
            const response = await groupApi.dropUser(nickname, groupId);
            if (response.data) {
                dispatch(deleteGroupMember({ groupId, nickname }));
                dispatch(deleteGroupEnableMember({ groupId, nickname }));
            }
        } catch (error: any) {
            handleApiError(error, dispatch, "소모임을 탈퇴하는 중 오류 발생했습니다.");
        }
    });
};


export const groupService = {
    findList,
    findByNickname,
    insert,
    able,
    enable,
    findUserById,
    modifyChatRoomId,
    insertUser,
    ableUser,
    drop,
    enableList,
    dropUser
};
