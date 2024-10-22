"use client"
import Pagination from "@/app/components/common/Row/pagination/Pagination"
import { BookingModel } from "@/app/model/room/bookings.model"
import { bookingService } from "@/app/service/room/booking.service"
import { roomService } from "@/app/service/room/room.service"
import { getSeperatedBookings } from "@/lib/features/room/booking.slice"
import { getEnabledRoomByNickname } from "@/lib/features/room/room.slice"
import { getCurrentUser } from "@/lib/features/users/user.slice"
import { useAppDispatch } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function SellerBooking() {
    const user = useSelector(getCurrentUser)
    const nickname = user?.nickname as string
    const dispatch = useAppDispatch()
    const rooms = useSelector(getEnabledRoomByNickname)
    const { enabledBookings, notEnabledBookings } = useSelector(getSeperatedBookings)
    const route = useRouter()
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(9);
    const [totalItems, setTotalItems] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState<'확정' | '승인 대기'>('확정');

    const handleTabClick = (category: '확정' | '승인 대기') => {
        setSelectedCategory(category);
        setPage(1); // 페이지네이션 리셋 하는 부분 
    };

    const getPaginatedData = (data: BookingModel[]) => {
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        return data.slice(startIndex, endIndex);
    };

    const showList: BookingModel[] = getPaginatedData(
        selectedCategory === '확정' ? enabledBookings : notEnabledBookings
    );

    useEffect(() => {
        if (nickname) {
            bookingService.findByRoomIds(nickname, page - 1, size, dispatch)
            roomService.findEnableByNickname(page - 1, size, nickname, dispatch)
        }
    }, [nickname, page, size, dispatch])

    useEffect(() => {
        setTotalItems(selectedCategory === '확정' ? enabledBookings.length : notEnabledBookings.length);
    }, [selectedCategory, enabledBookings, notEnabledBookings]);

    const onDelete = (id: string) => {
        console.log(`Deleting id: ${id}`)
        bookingService.drop(Number(id), dispatch)
    }

    const onUpdate = (id: string) => {
        if (id !== undefined) {
            bookingService.modify(Number(id), dispatch)
        }
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setSize(newPageSize);
        setPage(1);
    }

    return (
        <div className="mx-auto my-8 max-w-[80%] rounded-lg bg-green-100 p-6 shadow-md">
            <div className="flex space-x-4 my-4">
                <button
                    className={`px-4 py-2 rounded-lg ${selectedCategory === '확정' ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => handleTabClick('확정')}
                >
                    확정
                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${selectedCategory === '승인 대기' ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => handleTabClick('승인 대기')}
                >
                    승인 대기
                </button>
            </div>

            {showList.length > 0 ? (
                showList.map((booking) => (
                    <li key={booking.id}
                        className="mx-auto my-3 flex items-center justify-around bg-white p-3">
                        <div className="flex justify-around">
                            <p>예약일: {booking.date}</p>
                            <p>예약시간: {booking.usingTime.map(time => time.slice(0, 5)).join(', ')}</p>
                        </div>
                        <div>
                            {!booking.enabled && (
                                <>
                                    <button type="button" onClick={() => onUpdate(`${booking.id}`)} className="mx-2 rounded-lg bg-green-100 p-3">거절</button>
                                    <button type="button" onClick={() => onDelete(`${booking.id}`)} className="mx-2 rounded-lg bg-green-100 p-3">승인</button>
                                </>
                            )}
                            {booking.enabled && (
                                <button type="button" className="mx-2 rounded-lg bg-green-100 p-3" disabled>승인됨</button>
                            )}
                        </div>
                    </li>
                ))
            ) : (
                <li className="list-none my-3">정보가 존재하지 않습니다.</li>
            )}

            <Pagination
                currentPage={page}
                pageSize={size}
                totalItems={totalItems}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />

            <button type="button" onClick={() => route.back()} className="rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500">뒤로가기</button>
        </div>
    )
}