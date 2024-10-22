"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import dynamic from 'next/dynamic';

import { ChatMessageModel, ChatRoomModel, ChatUserModel } from "@/app/model/chat/chat.model";
import { getCurrentChatRoom, getError, getIsLoading, saveError, saveLoading } from "@/lib/features/chat/chat.slice";
import { chatRoomService } from "@/app/service/chat/chatRoom.service";
import { chatUserService } from "@/app/service/chat/chatUser.service";
import { chatMessageService } from "@/app/service/chat/chatMessage.service";
import { useAppDispatch } from "@/lib/store";
import { getNickname } from "@/lib/features/users/user.slice";

const ChatPage = dynamic(() => import("@/app/components/chat/ChatPages/ChatPage"), { ssr: false });
const MyChatList = dynamic(() => import("@/app/components/chat/MyChatList"), { ssr: false });
const PeopleList = dynamic(() => import("@/app/components/chat/PeopleList"), { ssr: false });
const MyProfile = dynamic(() => import("@/app/components/chat/MyProfile"), { ssr: false });

export default function ChatRoom() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const loading = useSelector(getIsLoading);
    const error = useSelector(getError);

    const nickname = useSelector(getNickname) as string;
    const chatRoom = useSelector(getCurrentChatRoom)
    const roomId = chatRoom?.roomId ?? '';

    const [messages, setMessages] = useState<ChatMessageModel[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoomModel[]>([]);
    const [chatUsers, setChatUsers] = useState<ChatUserModel[]>([]);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const unsubscribeRef = useRef<(() => void) | null>(null);

    const listRef = useRef<HTMLUListElement | null>(null);


    const togglePopUp = useCallback(() => {
        setIsPopUpOpen((prev) => !prev);
        const url = `/chats/${roomId}`;
        window.open(
            url,
            "작은채팅방",
            "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=0, resizable=0, width=500, height=800, top=30, left=30",
        );
    }, [roomId]);

    const leaveChat = useCallback(() => {
        if (unsubscribeRef.current) {
            unsubscribeRef.current();
        }

        if (!chatRoom) {
            console.error("현재 채팅방 정보가 없습니다.");
            return;
        }

        chatRoomService.insertLastReadMessageTime({ roomId, nickname, dispatch })
            .then((isSaved) => {
                if (isSaved) {
                    console.log("마지막 읽은 메시지 시간이 저장되었습니다.");
                } else {
                    console.error("마지막 읽은 메시지 시간 저장에 실패했습니다.");
                }
            })
            .finally(() => {
                router.push("/List");
            });
    }, [chatRoom, dispatch, nickname, roomId, router]);


    useEffect(() => {

        Promise.all([chatRoomService.findList({ nickname, dispatch }), chatUserService.findList({ roomId, dispatch })])
            .then(([chatRoomsResult, chatUsersResult]) => {
                if (chatRoomsResult && chatUsersResult) {
                    setChatRooms(chatRoomsResult);
                    setChatUsers(chatUsersResult);

                    console.log('유저:', chatUsersResult);
                    console.log('방:', JSON.stringify(chatRoomsResult, null, 2));
                }

                const handleNewMessage = (newMessage: ChatMessageModel) => {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                };

                // 메시지 목록 가져오기
                return chatMessageService.findList({
                    roomId,
                    nickname,
                    onMessage: handleNewMessage,
                });
            })
            .then((unsubscribe) => {
                if (typeof unsubscribe === "function") {
                    unsubscribeRef.current = unsubscribe;
                } else {
                    console.error("findMessageList did not return a function");
                }
            })
            .catch((error) => {
                dispatch(saveError((error as Error).message));
            })
            .finally(() => {
                dispatch(saveLoading(false));
            });

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, [chatRoom, dispatch, nickname]);

    const handleScroll = useCallback(() => {
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                console.log("Reached the bottom of the people list.");
                // 필요한 경우 더 많은 데이터를 불러오는 로직 추가
            }
        }
    }, []);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (listRef.current) {
                listRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [handleScroll]);

    const memoizedChatPage = useMemo(() => {
        console.log("Rendering ChatPage with messages and roomId:", messages, roomId);
        return <ChatPage messages={messages} roomId={roomId} />;
    }, [messages, roomId]);

    const memoizedMyChatList = useMemo(() => {
        console.log("Rendering MyChatList with chatRooms and roomId:", chatRooms, roomId);
        return <MyChatList chatRooms={chatRooms} currentChatRoomId={roomId} />;
    }, [chatRooms, roomId]);

    const memoizedPeopleList = useMemo(() => {
        console.log("Rendering PeopleList with chatUsers:", chatUsers);
        return chatUsers.map((user, index) => (
            user.nickname !== nickname && <PeopleList key={index} chatUser={user} />
        ));
    }, [chatUsers, nickname]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="relative w-full">
            <div className="fixed left-0 top-0 min-h-screen w-full">
                <div id="chatHead" className="mt-1 flex justify-end bg-gray-100 text-black opacity-90">
                    <button
                        type="button"
                        onClick={togglePopUp}
                        className="mb-1 me-2 rounded-full bg-green-700 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                        <svg
                            className="size-4 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                        >
                            <path
                                d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"></path>
                            <path
                                d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"></path>
                        </svg>
                    </button>
                    <button
                        onClick={leaveChat}
                        className="mb-1 me-2 rounded-full bg-red-700 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                        X
                    </button>
                </div>
                <div className="flex h-screen justify-center rounded-lg bg-gray-100">
                    <section className="relative flex flex-col w-1/5 bg-green-700">
                        {memoizedMyChatList}
                        <div className="flex-1 overflow-hidden">
                            <ul
                                className="w-full h-full overflow-y-auto"
                                ref={listRef}
                                style={{ maxHeight: "100%" }} // 최대 높이 설정
                            >
                                {memoizedPeopleList}
                            </ul>
                        </div>
                        <MyProfile roomId={roomId} />
                    </section>

                    <article className="flex w-4/5 flex-col bg-blue-200">
                        <aside className="w-full">
                            {memoizedChatPage}
                        </aside>
                    </article>
                </div>
            </div>
        </div>
    );
}