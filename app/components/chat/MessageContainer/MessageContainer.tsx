import { useEffect, useRef } from "react";
import { ChatMessageModel } from "@/app/model/chat/chat.model";
import styles from "./MessageContainer.module.css";

interface MessageContainerProps {
  messages: ChatMessageModel[]; // props로 메시지 리스트를 받음
  currentUserNickname: string; // 현재 사용자의 닉네임을 받음
}

const MessageContainer = ({ messages, currentUserNickname }: MessageContainerProps) => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.messageContainer}>
      {messages.map((message) => {
        const isCurrentUser = message.nickname === currentUserNickname;

        // 시스템 메시지 처리 (ENTER, EXIT)
        if (message.type === "ENTER" || message.type === "EXIT") {
          return (
            <div key={message.id} className={styles.systemMessageContainer}>
              <p className={styles.systemMessage}>{message.message}</p>
            </div>
          );
        }

        // 내가 보낸 메시지
        if (isCurrentUser) {
          return (
            <div key={message.id} className={styles.myMessageContainer}>
              <span className={styles.messageTime}>{message.time}</span>
              <div className={styles.myMessage}>
                <span>{message.message}</span>
              </div>
            </div>
          );
        }

        // 상대방이 보낸 메시지
        return (
          <div key={message.id}>
            <p>{message.nickname}</p>
            <div className={styles.yourMessageContainer}>
              <div className={styles.yourMessage}>
                <span>{message.message}</span>
              </div>
              <span className={styles.messageTime}>{message.time}</span>
            </div>
          </div>
        );
      })}

      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;

