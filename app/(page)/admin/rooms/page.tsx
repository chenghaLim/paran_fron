"use client";
import Pagination from "@/app/components/common/Row/pagination/Pagination";
import { RoomModel } from "@/app/model/room/room.model";
import { roomService } from "@/app/service/room/room.service";
import { getDisabledRooms, getRooms, getSeperatedRooms, saveCurrentRoom } from "@/lib/features/room/room.slice";
import { useAppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function RoomAdmin() {
  const rooms = useSelector(getRooms);
  const dispatch = useAppDispatch();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  console.log("rooms 목록 불러오기 ", rooms);
  const route = useRouter();

  const [관리Page, set관리Page] = useState(1);
  const [승인대기Page, set승인대기Page] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  
  const enabledRooms = useSelector(getRooms)
  const disabledRooms = useSelector(getDisabledRooms)
  const [selectedCategory, setSelectedCategory] = useState<'관리' | '승인 대기'>('관리');

  
  const showList: RoomModel[] = selectedCategory === '관리' ? enabledRooms : disabledRooms;
  const currentPage = selectedCategory === '관리' ? 관리Page : 승인대기Page;

  useEffect(() => {
    if (selectedCategory === '관리') {
      roomService.findByEnabled(관리Page, pageSize, dispatch);
    } else {
      roomService.findDisable(승인대기Page, pageSize, dispatch);
    }
  }, [관리Page, 승인대기Page, pageSize, selectedCategory, dispatch]);


  const handleTabClick = (category: '관리' | '승인 대기') => {
    setSelectedCategory(category);
  };

  const onClick = (room: RoomModel) => {
    if (room.id !== undefined) {
      dispatch(saveCurrentRoom(room));
      route.push(`/rooms/${room.id}`);
    }
  };

  const onDelete = (id: string) => {
    console.log(`Deleting room with id: ${id}`);
    roomService.drop(Number(id), dispatch);
  };

  const onUpdate = (id: string) => {
    if (id !== undefined) {
      roomService.modifyConfirm(Number(id), dispatch);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (selectedCategory === '관리') {
      set관리Page(newPage);
    } else {
      set승인대기Page(newPage);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-[80%]">
      <button onClick={() => route.back()} className="mx-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500">뒤로가기</button>
      
      <ul className="mx-auto my-8 rounded-lg bg-green-100 p-6 shadow-md">
        <li className="flex space-x-4 my-4">
          <button
            className={`px-4 py-2 rounded-lg ${selectedCategory === '관리' ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleTabClick('관리')}
          >
            관리
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${selectedCategory === '승인 대기' ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleTabClick('승인 대기')}
          >
            승인 대기
          </button>
        </li>

        {showList.length > 0 ? (
          showList.map((room, index) => (
            <li key={index} className="mx-auto my-3 flex items-center justify-around bg-white p-3">
              <div className="flex justify-around w-80 items-center">
                <h2 className="text-lg">{room.name}</h2>
                <p className="text-sm w-[9rem]">날짜: {room.createdAt ? formatDate(room.createdAt) : "날짜 정보 없음"}</p>
              </div>
              {selectedCategory === '관리' && (
                <button
                  type="button"
                  onClick={() => onClick(room)}
                  className="mx-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500"
                >
                  상세보기
                </button>
              )}
              {selectedCategory === '승인 대기' && (
                <div>
                  <button type="button" onClick={() => onUpdate(`${room.id}`)} className="mx-2 rounded-lg bg-green-400 p-3">승인</button>
                  <button type="button" onClick={() => onDelete(`${room.id}`)} className="mx-2 rounded-lg bg-green-400 p-3">거절</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="list-none">정보가 존재하지 않습니다.</li>
        )}
      </ul>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={showList.length}
        onPageChange={handlePageChange}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}