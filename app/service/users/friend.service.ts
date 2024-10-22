import { FriendModel } from "@/app/model/user/users.model";
import { AppDispatch } from "@/lib/store";
import { saveError, saveLoading } from "@/lib/features/users/user.slice";
import { friendAPI } from "@/app/api/generate/friend.api";
import { addAlreadyFriends, addFriend, addRequsetFriend, deleteFriend, deleteRequestFriend, deleteResponseFriend, saveAlreadyFriends, saveFriends, saveRequestFriends, saveResponseFriends } from "@/lib/features/users/friend.slice";

// 친구 추가
const insert = async (friendModel: FriendModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true)); // 로딩 시작
        const response = await friendAPI.insert(friendModel); // API 호출

        // 응답 상태가 성공적이고, id와 nickname이 포함된 경우만 디스패치
        if (response.status === 200 && 'id' in response.data) {
            dispatch(addFriend(response.data)); // 친구 신청 추가
            dispatch(addRequsetFriend(response.data))
        } else {
            throw new Error('친구 추가 실패');
        }
    } catch (error: any) {
        dispatch(saveError("친구 추가 중 오류 발생했습니다.")); // 에러 메시지 수정
        console.error('Error adding friend:', error.response?.data || error.message); // 에러 로깅
    } finally {
        dispatch(saveLoading(false)); // 로딩 종료
    }
};

// 친구 삭제
const drop = async (id: number, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true)); // 로딩 시작
        const response = await friendAPI.drop(id); // API 호출
        if (response.status === 200) {
            dispatch(deleteFriend(id)); // 친구 삭제
            dispatch(deleteRequestFriend(id))
            dispatch(deleteResponseFriend(id))
        } else {
            throw new Error('좋아요 취소 실패');
        }
    } catch (error: any) {
        dispatch(saveError("좋아요 취소 중 오류 발생했습니다."));
        console.error('Error removing like post:', error.response?.data || error.message); // 에러 로깅
    } finally {
        dispatch(saveLoading(false)); // 로딩 종료
    }
};

// 친구 리스트 확인
const findFriendList = async (nickname: string, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await friendAPI.findFriendList(nickname)
        if (Array.isArray(response.data)) {
            const friends = response.data.filter((user) => user.responseAt !== null);
            const requestFriends = response.data.filter((user) => user.responseAt === null && user.requestUser === nickname);
            const responseFriends = response.data.filter((user) => user.responseAt === null && user.responseUser === nickname);

            dispatch(saveAlreadyFriends(friends));
            dispatch(saveRequestFriends(requestFriends));
            dispatch(saveResponseFriends(responseFriends))
            dispatch(saveFriends(response.data))

            console.log(friends)
            console.log(requestFriends)
            console.log(responseFriends)
        }
    } catch (error) {
        dispatch(saveError("친구를 찾는 중 오류 발생했습니다."));
        console.error('Error finding friend:', error);
    } finally {
        dispatch(saveLoading(false));
    }
}

// 친구 요청 수락
const modifyFriend = async (friendModel: FriendModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await friendAPI.modifyFriend(friendModel)
        if ('id' in response.data) {
            dispatch(deleteResponseFriend(Number(response.data.id)))
            dispatch(addAlreadyFriends(response.data))
        }
    } catch (error) {
        dispatch(saveError("친구를 추가 하는 중 오류 발생했습니다."));
        console.error('Error update friend:', error);
    } finally {
        dispatch(saveLoading(false));
    }
}

export const friendService = {
    insert,
    drop,
    findFriendList,
    modifyFriend
}