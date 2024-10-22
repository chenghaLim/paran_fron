"use client";
import { useSelector } from "react-redux";
import dynamic from 'next/dynamic';
import ChatRoomLayout from "./ChatRoomLayout";
import { useChatRoom } from "@/app/hooks/useChatRoom";
import { getCurrentChatRoom, getError, getIsLoading } from "@/lib/features/chat/chat.slice";
import { useAppDispatch } from "@/lib/store";
import ErrorMessage from "../common/status/ErrorMessage";
import LoadingSpinner from "../common/status/LoadingSpinner";
import { getCurrentUser } from "@/lib/features/users/user.slice";

const ChatPage = dynamic(() => import("@/app/components/chat/ChatPages/ChatPage"), { ssr: false });
const MyChatList = dynamic(() => import("@/app/components/chat/MyChatList"), { ssr: false });
const PeopleList = dynamic(() => import("@/app/components/chat/PeopleList"), { ssr: false });
const MyProfile = dynamic(() => import("@/app/components/chat/MyProfile"), { ssr: false });

export default function ChatRoom() {
    const dispatch = useAppDispatch();
    const chatRoom = useSelector(getCurrentChatRoom)
    const loading = useSelector(getIsLoading)
    const error = useSelector(getError)
    const user = useSelector(getCurrentUser)
    const nickname = user?.nickname ?? ''
    const roomId = chatRoom?.roomId ?? ''

    const {
        messages,
        chatRooms,
        chatUsers,
        togglePopUp,
        leaveChat
    } = useChatRoom(roomId, nickname, dispatch);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;


    return (
        <ChatRoomLayout
            togglePopUp={togglePopUp}
            leaveChat={leaveChat}
            roomId={roomId}
        >
            <>
                <MyChatList chatRooms={chatRooms} currentChatRoomId={roomId} />
                <ul className="w-full">
                    {chatUsers.map((user) => (
                        <PeopleList key={user.nickname} chatUser={user} />
                    ))}
                </ul>
                <MyProfile roomId={""} />
                <ChatPage messages={messages} roomId={roomId} />
            </>
        </ChatRoomLayout>
    );
}