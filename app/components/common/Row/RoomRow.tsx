"use client";
import React, { useEffect, useState } from "react";
import { getRooms, saveCurrentRoom } from "@/lib/features/room/room.slice";
import { useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { roomService } from "@/app/service/room/room.service";
import { getFiles, saveCurrentFile } from "@/lib/features/file/file.slice";
import Pagination from "./pagination/Pagination";
import RoomCard from "./RoomCard";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/features/users/user.slice";
import { getAddresses, saveCurrentAddress } from "@/lib/features/room/address.slice";

interface RoomRowProps {
  active: boolean;
  onSelect: () => void;
}

const RoomRow = ({ active, onSelect }: RoomRowProps) => {
  const rooms = useSelector(getRooms)
  const files = useSelector(getFiles)
  const addresses = useSelector(getAddresses)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useSelector(getCurrentUser)

  // const [items, setItems] = useState<RoomModel[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const totalItems = 10;

  useEffect(() => {
    roomService.findByEnabled(page, pageSize, dispatch);
  }, [page, pageSize, dispatch])

  const getRoomImage = (roomId: number | undefined): string => {
    if (roomId !== undefined) {
      const roomFile = files.roomFiles.find((file) => file.refId === roomId);
      return roomFile
        ? `${process.env.NEXT_PUBLIC_FILE_URL}/one?path=${roomFile.path}`
        : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`;
    }
    return `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`;
  };

  const onClickToDetail = (currentId: number | undefined): void => {
    if (currentId !== undefined) {
      const currentRoom = rooms.find(({ id }) => id === currentId);
      if (currentRoom) {
        dispatch(saveCurrentRoom(currentRoom));
        dispatch(saveCurrentFile(files.roomFiles.find(({ refId }) => refId === currentId) ?? null));
        dispatch(saveCurrentAddress(addresses.find(({ roomId }) => roomId === currentId) ?? null))
        router.push(`/rooms/${currentId}`);
      }
    }
  };

  return (
    <>
      <div className="w-[92%] mb-4 ml-4 grid grid-cols-4 gap-8 md:grid-cols-3">
        {rooms.map((room, index) => (
          <RoomCard
            key={index}
            room={room}
            isActive={active}
            getRoomImage={getRoomImage}
            onSelect={onSelect}
            onClickToDetail={onClickToDetail}
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </>
  );
};

export default RoomRow;