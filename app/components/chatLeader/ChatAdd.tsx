"use client"
import { chatRoomService } from "@/app/service/chat/chatRoom.service";
import { useAppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { getCurrentUser } from "@/lib/features/users/user.slice"
import { useSelector } from "react-redux";


export default function ChatAdd() {
  const dispatch = useAppDispatch()
  const nickname = useSelector(getCurrentUser)?.nickname as string;
  const route = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    password: '',
    public: false,
  })


  const handleChange = (event: any) => {
    const { name, value, type } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'radio' ? value === 'true' : value
    }))
  }

  const onCreate = () => {
    chatRoomService.insert({ roomName: formData.title, nickname, dispatch })
      .then(result => {
        if (typeof result === 'string' && !formData.public) {
          chatRoomService.modifyPassword({ roomId: result, password: formData.password, nickname, dispatch })
        }
      })
  }

  return (
    <div>
      <form onSubmit={onCreate} className="max-w-lg mx-auto bg-green-50 p-6 my-60 rounded-lg">
        <div className="grid gird-cols ">
          <label htmlFor="chatTitle">채팅방의 제목을 입력해주세요</label>
          <input type="text" placeholder="채팅방의 제목을 입력해주세요" id="chatTitle" className="rounded-lg my-3"
            onChange={handleChange} value={formData.title} name="title" />
        </div>
        <div className="grid gird-cols my-6">
          <p>채팅방의 공개 여부를 입력해주세요</p>
          <div className="flex items-center gap-3">
            <input type="radio" id="public" name="public" checked={formData.public}
              onChange={handleChange} value="true" />
            <label htmlFor="public">공개</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="radio" id="private" name="private" value="false"
              checked={!formData.public} onChange={handleChange} />
            <label htmlFor="private">비공개</label>
          </div>
          <div className="grid grid-cols-1 my-4">
            <label htmlFor="password">비밀번호를 입력해주세요 [ 8자 내외 ]</label>
            <input type="password" id="password" placeholder="채팅방의 비밀번호를 입력해주세요" className="rounded-lg"
              name="password" onChange={handleChange} value={formData.password} />
          </div>
        </div>
        <div>
          <button type="submit" className="p-3 bg-green-400 text-white rounded-lg">생성하기</button>
          <button type="button" className="p-3 text-green-400 bg-white rounded-lg mx-2"
            onClick={() => {route.back()}}>뒤로가기
          </button>
        </div>
      </form>
    </div>
  )
}
