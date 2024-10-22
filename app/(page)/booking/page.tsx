"use client"
import BookingList from "@/app/components/common/BookingList"
import { getCurrentBooking } from "@/lib/features/room/booking.slice"
import { useSelector } from "react-redux"

export default function BookingListPage() {
  const page = useSelector(getCurrentBooking)
  return (
    <div className="my-8">
      <BookingList bookingId={`${page?.roomId}`} />
    </div>
  )
}
