import { ChatUserModel } from "@/app/model/chat/chat.model";
import Image from "next/image";
import { useState, useEffect } from "react";
import ModalFriend from "./ModalFriend";
import styles from './PeopleList.module.css';

interface PeopleListProps {
  chatUser: ChatUserModel;
}

export default function PeopleList({ chatUser }: PeopleListProps) {
  const [onToggle, setOnToggle] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const profileImageSrc = `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`;

  return (
    <li className="border-b w-full overflow-x-clip">
      <div
        className="flex items-center px-8 py-4 space-x-6 justify-between"
        style={{ maxWidth: "600px", margin: "0 auto" }} // 가운데 정렬
      >
        {/* 온라인 상태 */}
        <div className="relative w-30">
          <Image
            width={50}
            height={50}
            className="rounded-full bg-green-400"
            src={profileImageSrc}
            alt="프로필 사진"
            onError={(e) => {
              (e.target as HTMLImageElement).src = profileImageSrc;
            }}
          />
          {/* 온라인 상태 가져오기 sse  */}
          <span className={`${isOnline ? "online" : "offline"}`}></span>
        </div>

        {/* 닉네임 버튼 */}
        <div className="relative">
          <button
            className="text-white text-lg font-semibold hover:text-green-300 focus:outline-none"
            onClick={() => setOnToggle((prev) => !prev)}
          >
            {chatUser.nickname}
          </button>

          {/* 모달 */}
          <div
            className={`${onToggle ? "visible" : "invisible" 
              } absolute top-8 left-[-3rem] z-50`}
          >
            <ModalFriend name={chatUser.nickname} />
          </div>
        </div>
      </div>
    </li>
  );
}