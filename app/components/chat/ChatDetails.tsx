import { ChatRoomModel } from "@/app/model/chat/chat.model"
import { saveCurrentChatRoom } from "@/lib/features/chat/chat.slice";
import { useAppDispatch } from "@/lib/store";
import Link from "next/link"

interface ChatDetailsProps {
    chatRoom: ChatRoomModel
}

export default function ChatDetails({ chatRoom }: ChatDetailsProps) {
    const dispatch = useAppDispatch()

    const handleJoinChat = () => {
        dispatch(saveCurrentChatRoom(chatRoom));
    };

    return (
        <div className="relative">
            <h2 className="font-semibold text-2xl">{chatRoom.name}</h2>
            <Link onClick={handleJoinChat} href={`/chats/${chatRoom.roomId}`}
                className="absolute right-6 my-6 text-green-600 hover:text-white bg-green-200 hover:bg-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                참여하기
            </Link>
        </div>
    )
}
