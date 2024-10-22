"use client"
import { ChatRoomModel } from "@/app/model/chat/chat.model";
import { getCurrentChatRoom } from "@/lib/features/chat/chat.slice";
import { useAppDispatch } from "@/lib/store";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Id {
  id: ChatRoomModel
}

export default function ChatUpdate({id}: Id) {
  const [isPassword, setIsPassword] = useState("");
  const dispatch = useAppDispatch();
  const chatRoom = useSelector(getCurrentChatRoom);
  const password = chatRoom?.password
  const name = chatRoom?.name

  const updateChatRoom = () => {
    
  }

  return (
    <div>
      <form onSubmit={updateChatRoom}>
        <div>
          <label htmlFor="chatTitle">채팅방의 제목을 변경하시겠습니까? </label>
          <input type="text" placeholder={`${name}`} id="chatTitle"/>
        </div>
        <div>
          <h3>채팅방의 비밀번호를 변경하시겠습니까?</h3>
          <label htmlFor="passwordYes">예</label>
          <input type="radio" id="passwordYes"/>
          <label htmlFor="passwordNo">아니오</label>
          <input type="radio" id="passwordNo"/>
        </div>
        <div>
          <label htmlFor="password">새로운 비밀번호를 입력해주세요</label>
          <input type="password" placeholder={`${password}`} id="password"/>
        </div>
        
      </form>

    </div>
  )
}
