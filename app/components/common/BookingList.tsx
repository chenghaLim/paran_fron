"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AccountButton from "./AccountButton"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/lib/store"
import { BookingModel } from "@/app/model/room/bookings.model"

import { getBookings } from "@/lib/features/room/booking.slice"
import { useSelector } from "react-redux"
import { bookingService } from "@/app/service/room/booking.service"
import { getLeaderGroups } from "@/lib/features/group/group.slice"
import { accountService } from "@/app/service/room/account.service"
import { getCurrentRoom } from "@/lib/features/room/room.slice"

interface BookingListProps {
  bookingId?: string
}

export default function BookingList({ bookingId }: BookingListProps) {
  const router = useRouter()
  const [selectedBookings, setSelectedBookings] = useState<string[]>([])
  const dispatch = useAppDispatch();
  const bookingItem = useSelector(getBookings);
  const leaderGorup = useSelector(getLeaderGroups)
  const page = 0;
  const size = 10;

  useEffect(() => {
    bookingService.findByGroupIds(leaderGorup.map(group => group.id), page, size, dispatch)
  }, [])

  const handleCheckboxChange = (id: string) => {
    setSelectedBookings(prev =>
      prev.includes(id) ? prev.filter(bookingId => bookingId !== id) : [...prev, id]
    )
  }

  const handleDelete = () => {
    console.log('삭제하기:', selectedBookings)
    if (selectedBookings.length > 0) {
      selectedBookings.forEach(id => {
        bookingService.drop(Number(id), dispatch)
      })
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <ul className="w-full">
        {bookingItem.length > 0 && bookingItem.map((booking: BookingModel) => (
          <li key={booking.id} className="relative mb-4 rounded-lg bg-green-100" id="box">
            <form className="absolute top-2 w-full px-3">
              <div className="flex justify-between">
                <div id="selectBtn">
                  <input
                    id={`select-${booking.id}`}
                    type="checkbox"
                    checked={selectedBookings.includes(String(booking.id))}
                    onChange={() => handleCheckboxChange(String(booking.id))}
                    className="size-6 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor={`select-${booking.id}`} hidden>Select</label>
                </div>
              </div>
            </form>
            <div className="border-1 border-gray-100 p-6">
              <div className="p-5">
                <Link href={`/books/${booking.id}`}>
                  <h5 className="mb-2 text-lg font-medium tracking-tight">
                    예약 방 번호 {booking?.roomId}
                  </h5>
                </Link>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  예약 일 {booking.date}
                </p>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  예약 소모임 {booking.groupId}
                </p>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  {booking.usingTime.length > 1 && booking.usingTime[0] + "-" + booking.usingTime[booking.usingTime.length - 1]}
                </p>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  {booking.enabled}
                </p>
                <div className="mt-5 flex w-full items-end justify-end">
                  <button
                    type="button"
                    onClick={() => router.push(`/rooms/${booking.id}`)}
                    className="mx-2 rounded-lg bg-green-600 p-2 text-sm font-medium text-white"
                  >
                    상세보기
                  </button>
                  {new Date(booking.date) > new Date() && accountService.findByBooking(booking.id ?? 0, dispatch) == null && <AccountButton />}
                  {new Date(booking.date) > new Date() && accountService.findByBooking(booking.id ?? 0, dispatch) != null && (<p>결제정보보기?</p>)}
                </div>
              </div>
            </div>
          </li>
        ))}
        {bookingItem.length === 0 && <p>예약내역이 없습니다.</p>}
      </ul>
      <div className="btn_wrap my-4 flex justify-end">
        <button onClick={() => router.back()} className="rounded-lg bg-green-600 p-2 text-white">뒤로가기</button>
        <button
          onClick={() => handleDelete()}
          className="mx-2 rounded-lg bg-green-600 p-2 text-white"
        >삭제하기</button>
      </div>
    </div>
  )
}