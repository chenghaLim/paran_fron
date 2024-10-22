"use client"
import React, {useCallback, useRef, useState} from 'react'
import InputField from "../InputField/InputField";
import MessageContainer from '../MessageContainer/MessageContainer';
import {chatMessageService} from '@/app/service/chat/chatMessage.service';
import {ChatMessageModel} from '@/app/model/chat/chat.model';
import {useDispatch, useSelector} from "react-redux";
import { getCurrentUser } from '@/lib/features/users/user.slice';

interface ChatPageProps {
    messages: ChatMessageModel[];
    roomId: string;
}

const ChatPage = ({messages, roomId}: ChatPageProps) => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const isSuccessRef = useRef<boolean | null>(null)
    const user = useSelector(getCurrentUser)
    const nickname = user?.nickname ?? ''

    const sendMessage = useCallback(() => {
        chatMessageService.insert({nickname, roomId, message, dispatch})
            .then((isSuccess) => {
                if (isSuccess) {
                    setMessage(''); // 메시지 전송 성공 후 입력창 초기화
                    isSuccessRef.current = true;
                } else {
                    isSuccessRef.current = false;
                    console.error('메시지 전송 실패');
                }
            })
    }, [nickname, roomId, message, dispatch]);


    return (
        <div>
            <div id="ChatPage">
                <MessageContainer messages={messages} currentUserNickname={nickname}/>
                <InputField
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
}

export default ChatPage;