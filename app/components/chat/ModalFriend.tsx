"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Alert from '../common/Alert';
import { getNickname } from "@/lib/features/users/user.slice";
import { getAlreadyFriends, getRequestFriends, getResponseFriends } from "@/lib/features/users/friend.slice";
import { friendService } from "@/app/service/users/friend.service";
import { useAppDispatch } from "@/lib/store";
import { FriendModel } from "@/app/model/user/users.model";

interface ModalFriendProps {
    name: string;
}

export default function ModalFriend({ name }: ModalFriendProps) {
    const [alertState, setAlertState] = useState({ isOpen: false, message: "" });
    const dispatch = useAppDispatch()
    const nickname = useSelector(getNickname);
    const alreadyFriends = useSelector(getAlreadyFriends)
    const requestFriends = useSelector(getRequestFriends)
    const responseFriends = useSelector(getResponseFriends)

    useEffect(() => {
        if (nickname) {
            friendService.findFriendList(nickname, dispatch)
        }
    }, [dispatch, nickname]);


    const onFriends = () => {
        if (nickname) {
            const friendModel: FriendModel = {
                requestUser: nickname,
                responseUser: name
            }
            friendService.insert(friendModel, dispatch)
            setAlertState({ isOpen: true, message: "친구요청을 보냈습니다." });
        }
    };

    // 친구 요청 거절 또는 친구 삭제
    const onRejectRequest = (action: string) => {
        let message = '';
        let id: number | null | undefined = null;
        switch (action) {
            case 'delete':
                const friendToDelete = alreadyFriends.find((friend) =>
                    friend.requestUser === name || friend.responseUser === name
                );
                if (friendToDelete) {
                    id = friendToDelete.id;
                    message = '친구를 삭제했습니다.';
                }
                break;
            case 'reject':
                const friendToReject = responseFriends.find((friend) =>
                    friend.requestUser === name && friend.responseUser === nickname
                );
                if (friendToReject) {
                    id = friendToReject.id;
                    message = '친구 요청을 거절했습니다.';
                }
                break;
            case 'cancel':
                const friendToCancel = requestFriends.find((friend) =>
                    friend.requestUser === nickname && friend.responseUser === name
                );
                if (friendToCancel) {
                    id = friendToCancel.id;
                    message = '친구 요청을 취소했습니다.';
                }
                break;
            default:
                message = '알 수 없는 작업입니다.';
        }
        if (id) {
            friendService.drop(id, dispatch)
        }
        setAlertState({ isOpen: true, message });
    };

    // 친구 요청 수락
    const onAcceptRequest = () => {
        const friendModel = responseFriends.find((friend) => friend.requestAt === name)
        console.log(friendModel)
        if (friendModel) {
            friendService.modifyFriend(friendModel, dispatch)
                .then(() => {
                    setAlertState({ isOpen: true, message: "친구 요청을 수락했습니다." });
                })
        }
    };

    const closeAlert = () => {
        setAlertState({ isOpen: false, message: "" });
    };

    // 나한테 온 요청
    const isReqsponse = responseFriends.some((friend) =>
        friend.requestUser === name && friend.responseUser === nickname
    );

    // 친구한테 보낸 요청
    const isRequest = requestFriends.some((friend) =>
        friend.requestUser === nickname && friend.responseUser === name
    );

    const isFriend = alreadyFriends.some((friend) =>
        friend.requestUser === name || friend.responseUser === name
    );

    return (
        <>
            <div className="space-y-4 duration-300 ease-in-out w-40 transition-all">
                {isFriend && (
                    <button
                        type="button"
                        className="w-full p-2 border border-green-300 rounded-lg text-green-400 hover:bg-gray-100 transition-colors"
                        onClick={() => onRejectRequest('delete')}
                    >
                        친구 삭제
                    </button>
                )}

                {isReqsponse && (
                    <>
                        <button
                            type="button"
                            className="px-4 py-2 border border-blue-400 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            onClick={onAcceptRequest}
                        >
                            친구 요청 수락
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => onRejectRequest('reject')}
                        >
                            친구 요청 거절
                        </button>
                    </>
                )}

                {isRequest && (
                    <>
                        <button
                            type="button"
                            className="px-4 py-2  border-2
                            border-yellow-400 text-yellow-600
                            text-xs
                             rounded-lg 
                            bg-yellow-100 hover:bg-yellow-50 transition-colors"
                            onClick={() => onRejectRequest('cancel')}
                        >
                            요청 취소
                        </button>
                    </>
                )}

                {!isFriend && !isRequest && !isReqsponse && (
                    <>
                        <button
                            type="button"
                            className="py-2 px-4 border-2 border-green-400 text-gray-900
                            text-xs rounded-lg 
                            bg-green-100 hover:bg-green-50 transition-colors"
                            onClick={onFriends}
                        >
                            친구 요청
                        </button>
                    </>
                )}
            </div>
            {/* 알림 모달 */}
            <Alert
                message={alertState.message}
                isOpen={alertState.isOpen}
                onClose={closeAlert}
            />
        </>

    );
}