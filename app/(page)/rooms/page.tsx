"use client";
import RoomDetails from "@/app/components/common/Details/RoomDetails";
import { useParams } from "next/navigation";

export default function Rooms() {
  const param = useParams();

  return (
    <div>
      <RoomDetails/>
    </div>
  );
}
