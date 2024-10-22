"use client";
import React, { useState } from "react";
import styles from "./MyChatList.module.css";
import { ChatRoomModel } from "@/app/model/chat/chat.model";
import { useRouter } from "next/navigation";
import { chatRoomService } from "@/app/service/chat/chatRoom.service";
import { useAppDispatch } from "@/lib/store";
import { saveCurrentChatRoom } from "@/lib/features/chat/chat.slice";
import { getCurrentUser } from "@/lib/features/users/user.slice";
import { useSelector } from "react-redux";


interface ChatRoomListProps {
    chatRooms: ChatRoomModel[] | null;
    currentChatRoomId: string;
}


export default function ChatRoomList({ chatRooms, currentChatRoomId }: ChatRoomListProps) {
    // Popover의 가시성을 관리하는 상태
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const router = useRouter()
    const dispatch = useAppDispatch()
    const nickname = useSelector(getCurrentUser)?.nickname ?? "";

    // 현재 활성화된 채팅방을 제외한 채팅방 필터링
    const filteredChatRooms = chatRooms?.filter((room) => room.roomId !== currentChatRoomId);

    const switchChatRoom = (chatRoom: ChatRoomModel) => {
        chatRoomService.insertLastReadMessageTime({ roomId: currentChatRoomId, nickname, dispatch })
            .then((isSaved) => {
                if (isSaved) {
                    console.log("마지막 읽은 메시지 시간이 저장되었습니다.");
                } else {
                    console.error("마지막 읽은 메시지 시간 저장에 실패했습니다.");
                }
            })
            .finally(() => {
                dispatch(saveCurrentChatRoom(chatRoom))
                router.push(`/chats/${chatRoom.roomId}`)
            });
    }

    return (
        <div id="chatHead" className="px-5 py-3">
            {/* Pop-up button */}
            <button
                id="popup-button"
                type="button"
                className="relative mb-3 me-4 w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-lg font-bold text-gray-100 hover:bg-green-600"
                onClick={()=> setIsPopoverVisible((prev) => !prev)}
            >
                디른 대화방 {"^"}
            </button>
            {/* Popover List */}
            <ul
                id="popover-bottom"
                className={`${styles.listUp} transition-opacity duration-300 ease-in-out ${isPopoverVisible ? `${styles.visible}` : `${styles.invisible}`
                    }`}
            >
                {filteredChatRooms && filteredChatRooms.length > 0 ? (
                    filteredChatRooms.map((room) => (
                        <li key={room.roomId} className={styles.ListOne}>
                            <button onClick={() => switchChatRoom(room)}>{room.name}</button>
                            <span className={styles.number}>{room.unReadMessageCount}</span>
                        </li>
                    ))
                ) : (
                    <p>다른 채팅방이 없습니다</p>
                )}
            </ul>
        </div>
    );
}
