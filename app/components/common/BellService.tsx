import { getCurrentUser } from "@/lib/features/users/user.slice";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSelector } from "react-redux";

export default function BellService() {
  const route = useRouter()
  const [isPage, setIsPage] = useState();
  const user = useSelector(getCurrentUser)
  const onMovePage = () => {
    // setIsPage(`{여기에 이동할 페이지 올리기}`)
    route.push('/admin/`${}`')
  }
  return (
    //item 실시간 알림 구현하기 
    <li className="max-w-sm mx-auto">
        {/* {item.map( */}
        <div className="flex justify-around p-2">
          <p>{} 채팅방 요청</p>
          <button type="button" onClick={onMovePage} className="p-1 bg-green-400 text-xs ml-4">더보기</button>
        </div>
        <div className="flex justify-around p-2">
          <p>{} 채팅방 요청</p>
          <button type="button" onClick={onMovePage} className="p-1 bg-green-400 text-xs ml-4">더보기</button>
        </div>
        <div className="flex justify-around p-2">
          <p>{} 소모임 승인요청</p>
          <button type="button" onClick={onMovePage} className="p-1 bg-green-400 text-xs ml-4">더보기</button>
        </div>
        <div className="flex justify-around p-2">
          <p>{} 소모임 승인요청</p>
          <button type="button" onClick={onMovePage} className="p-1 bg-green-400 text-xs ml-4">더보기</button>
        </div>
        <div className="flex justify-around p-2">
          <p>{} 소모임 승인요청</p>
          <button type="button" onClick={onMovePage} className="p-1 bg-green-400 text-xs ml-4">더보기</button>
        </div>
        <div>
          ...더보기 
        </div>
        {/* )} */}
      </li>
  )
}
