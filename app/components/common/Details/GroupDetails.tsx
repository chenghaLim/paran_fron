"use client"
import { useSelector } from "react-redux";
import { getCurrentGroup, getGroupEnableMembers, getGroupMembers } from "@/lib/features/group/group.slice";
import { useAppDispatch } from "@/lib/store";
import { useEffect, useState } from "react";
import { groupService } from "@/app/service/group/group.service";
import DetailButton from "./DetailButton";
import LoadingSpinner from "../status/LoadingSpinner";
import { getNickname } from "@/lib/features/users/user.slice";
import { JoiningModel } from "@/app/model/group/group.model";
import ModalFriend from "../../chat/ModalFriend";
import { ChatUserModel } from "@/app/model/chat/chat.model";
import { chatUserService } from "@/app/service/chat/chatUser.service";
import { FaExclamationTriangle } from "react-icons/fa";
import { declarationService } from "@/app/service/users/declarationPost.service";
import { DeclarationPostModel } from "@/app/model/user/users.model";
import Modal from "../../Modal";

export default function GroupDetails() {
    const dispatch = useAppDispatch()
    const group = useSelector(getCurrentGroup)
    const users = useSelector(getGroupMembers)
    const enableUsers = useSelector(getGroupEnableMembers)
    const nickname = useSelector(getNickname)
    const [chatUsers, setChatUsers] = useState<ChatUserModel[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const declarationUser = (name: string) => {
        const title = prompt("신고 제목을 입력하세요:");
        if (!title) {
            alert("신고 제목을 입력해야 합니다.");
            return;
        }

        // 신고 내용 입력 받기
        const content = prompt("신고 내용을 입력하세요:");
        if (!content) {
            alert("신고 내용을 입력해야 합니다.");
            return;
        }
        if (title && content && nickname) {
            const declarationPostModel: DeclarationPostModel = {
                title: title,
                content: content,
                target: name,
                declarer: nickname
            };

            // 신고 서비스 호출
            declarationService.insert(declarationPostModel, dispatch)
                .then(() => {
                    alert('신고가 성공적으로 접수되었습니다.');
                })
        } else {
            alert('모든 필드를 입력해 주세요.');
        }
    };

    useEffect(() => {
        if (group?.id !== undefined) {
            groupService.findUserById(group.id, dispatch);
        }
    }, [group, dispatch]);

    useEffect(() => {
        if (group?.chatRoomId !== undefined) {
            chatUserService.findList({ roomId: group.chatRoomId, dispatch })
                .then((chatUserResult) => {
                    if (chatUserResult) {
                        setChatUsers(chatUserResult);
                    }
                })
                .catch((error) => {
                    console.error('채팅 유저 리스트를 불러오는 중 오류 발생:', error);
                });
        }
    }, [group, dispatch]);

    const inputUserIntoChatRoom = (name: string) => {
        if (group) {
            chatUserService.insert(group.chatRoomId, name, dispatch)
                .then((result) => {
                    if (result) {
                        return chatUserService.findList({ roomId: group.chatRoomId, dispatch });
                    }
                })
                .then((updatedChatUsers) => {
                    if (updatedChatUsers) {
                        setChatUsers(updatedChatUsers);
                    }
                })
        }
    }

    const deleteUser = (name: string) => {
        if (group) {
            groupService.dropUser(name, group.id, dispatch)
            if (isUserInChatRoom(name)) {
                chatUserService.drop(group.chatRoomId, name, dispatch)
            }
        }
    }

    const ableUser = (name: string) => {
        if (group) {
            groupService.ableUser(group.id, name, dispatch)
        }
    }



    const isUserInGroup = group?.id && users[group.id]?.some((user: any) => user.nickname === nickname);
    const isUserInChatRoom = (name: string) => { return chatUsers.some((user) => user.nickname === name); };


    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <div className="bg-green-50 py-8 rounded-lg text-center">
                <h1 className="text-4xl font-bold">{group?.name || "그룹 이름"}</h1>
            </div>

            <hr className="my-8" />

            <div className="my-6 space-y-6">
                <div className="bg-green-50 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">소모임 정보:</h3>
                    {group ? (
                        <div className="space-y-2">
                            <p><strong>카테고리:</strong> {group.categoryName}</p>
                            <p><strong>설명:</strong> {group.detail}</p>
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>

                {isUserInGroup && (
                    <div className="bg-green-50 rounded-lg p-8 shadow-lg overflow-y-auto">
                        <h3 className="text-2xl font-bold text-center mb-6">소모임 장: {group.nickname}</h3>
                        <h3 className="text-xl font-bold text-center mb-6">참여 중인 유저</h3>

                        {group && users[group.id]?.length > 0 && (
                            <ul className="space-y-4">
                                {users[group.id].map((user: JoiningModel, index) => (
                                    user.nickname !== nickname && (
                                        <li key={index} className="flex items-center justify-between p-4 px-6 bg-white rounded-lg shadow-sm hover:bg-gray-100">
                                            <div className="text-left">
                                                <p className="font-bold text-gray-800">{user.nickname}</p>
                                                <p className="text-gray-600 text-sm">가입 날짜: {user.requestAt}</p>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                {!isUserInChatRoom(user.nickname) && nickname === group.nickname && (
                                                    <button
                                                        type="button"
                                                        className="p-2 border border-green-400 text-green-600 rounded-lg hover:bg-green-50"
                                                        onClick={() => inputUserIntoChatRoom(user.nickname)}
                                                    >
                                                        채팅방 초대하기
                                                    </button>
                                                )}

                                                {nickname === group.nickname && (
                                                    <button
                                                        type="button"
                                                        className="p-2 border border-red-400 text-red-600 rounded-lg hover:bg-red-50"
                                                        onClick={() => deleteUser(user.nickname)}
                                                    >
                                                        소모임 멤버 제명
                                                    </button>
                                                )}

                                                <ModalFriend name={user.nickname} />

                                                <button
                                                    type="button"
                                                    className="px-4 py-2 border border-red-400 text-red-600 rounded-lg hover:bg-red-50"
                                                    onClick={() => declarationUser(user.nickname)}
                                                >
                                                    <FaExclamationTriangle />
                                                </button>
                                            </div>
                                        </li>
                                    )
                                ))}
                            </ul>
                        )}
                    </div>
                )}

               {group && group.nickname === nickname && enableUsers[group.id]?.length > 0 && (
                <div>
                    <button
                        type="button"
                        className="p-2 border bg-green-400 text-white rounded-lg hover:bg-green-500"
                        onClick={openModal}
                    >
                        참여 신청자 보기
                    </button>
                </div>
                )}

                {isModalOpen && group && (
                    <Modal onClose={closeModal}>
                        <h3 className="text-xl font-bold text-center mb-6">참여하고 싶어하는 유저</h3>
                        <ul className="space-y-4">
                            {enableUsers[group.id]?.map((user: JoiningModel, index) => (
                                <li key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-100">
                                    <div className="text-left">
                                        <p className="font-bold text-gray-800">{user.nickname}</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-green-400 text-green-600 rounded-lg hover:bg-green-50"
                                        onClick={() => ableUser(user.nickname)}
                                    >
                                        소모임 멤버 승인
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Modal>
                )}
            </div>
            <DetailButton thisPage={`/groups`} displayBoard="block" displayReview="none" displayReservation="block" displayComment="none" />
        </div>
    )
}