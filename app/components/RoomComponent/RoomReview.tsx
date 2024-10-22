"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSelector } from "react-redux"
import { getReviews } from "@/lib/features/room/review.slice"
import { getNickname } from "@/lib/features/users/user.slice"
import { useEffect } from "react"
import { reviewService } from "@/app/service/room/review.service"
import { getCurrentRoom } from "@/lib/features/room/room.slice"
import { useAppDispatch } from "@/lib/store"

export default function RoomReview() {
  const route = useRouter()
  const reviews = useSelector(getReviews)
  const nickname = useSelector(getNickname)
  const room = useSelector(getCurrentRoom)
  const dispatch = useAppDispatch()
  const goBack = () => {
    route.back()
  }
  useEffect(() => {
    if (room?.id) {
      reviewService.findByRoom(room.id, 1, 10, dispatch)
    }
  }, [room, dispatch])
  return (
    <div className="mx-auto my-8 max-w-lg rounded-lg bg-green-50 p-6">
      {/* 예약일이 오늘 날보다 과거이면 리뷰쓰기 버튼 생성하기 */}
      <p className="text-lg">공간리뷰</p>
      <span className="text-sm"> 실제 사용자분들의 후기를 담고 있습니다.</span>
      <ul className="my-3 w-full">
        {reviews.map((review, index) => (
          <li className="my-5 min-w-full max-w-3 rounded-lg bg-white" key={index}>
            <Link href="/" className="p-5">
              <h2 className="border-b border-gray-100 text-xl">⭐{review.rating}</h2>
              <p className="w-18 truncate">{review.content}</p>
            </Link>
          </li>
        ))}
      </ul>
      <h1>pagination구현할곳</h1>
      <button type="button" className="rounded-lg border-white bg-green-100 p-2" onClick={goBack}>뒤로가기</button>
    </div>
  )
}
