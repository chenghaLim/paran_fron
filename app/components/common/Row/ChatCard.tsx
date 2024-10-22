"use client";
import Link from "next/link";
import { ChatRoomModel } from "@/app/model/chat/chat.model";
import { useAppDispatch } from "@/lib/store";
import { saveCurrentChatRoom } from "@/lib/features/chat/chat.slice";
import { useRouter } from "next/navigation";

interface CardRowProps {
  chatRoom: ChatRoomModel;
  active: boolean;
  onSelect: () => void;
}

const ChatCard = ({
  chatRoom, active, onSelect
}: CardRowProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const onClickToDetail = () => {
    dispatch(saveCurrentChatRoom(chatRoom));
    router.push(`/chats/${chatRoom.roomId}`);
  };

  return (
    <>
      <li
        className={`max-w-sm my-6 list-none rounded-lg border border-gray-200 bg-white shadow ${active ? 'ring-2 ring-green-500' : ''
          }`}
        onClick={onSelect}
      >
        <div className="p-5">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {chatRoom.name}
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              {chatRoom.userCount}명이 참여 중 읽지 않은 메시지 {chatRoom.unReadMessageCount}개
            </p>
            <button
              // href 주소에 link로 변경하기
              onClick={onClickToDetail}
              className="inline-flex items-center rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              입장하기
              <svg
                className="ms-2 size-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </li>
    </>
  );
}

export default ChatCard;
