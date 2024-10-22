"use client"
import ComplainList from "@/app/components/common/Complain/ComplainList";
import { useRouter } from "next/navigation";

export default function List() {
  const route = useRouter();
  return (
    <div className="max-w-lg mx-auto my-9">
      <ul className="p-8 my-4 bg-green-100 rounded-lg">
        <ComplainList />
      </ul>
      <button type="button" onClick={() => { route.back() }} className="p-2 bg-green-400 rounded-lg hover:bg-green-500 text-white">뒤로가기</button>
    </div>
  )
}
