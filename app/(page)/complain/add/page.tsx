"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "@/app/components/common/Alert";

export default function Add() {
  const route = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const postComplain = () => {
    setIsOpen(true)
  }
  const goBack = () => {
    route.back();
  }
  return (
    <div className="max-w-lg mx-auto bg-green-200 my-10 rounded-lg p-8">
      {/* form 에 데이터 옮기는 로직 만들기  */}
      <form>
        <div>
          <label htmlFor="complainTitle" className="block mb-2 text-sm font-medium text-gray-900">불편사항</label>
          <input type="text" placeholder="신고접수사항을 적어주세요" id="complainTitle" className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
        </div>
        <div className="my-6">
        <label htmlFor="complainContent" className="block mb-2 text-sm font-medium text-gray-900">신고접수내용</label>
        <input type="text"  placeholder="신고접수내용을 적어주세요" id="complainContent" className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
        </div>
        <button type="button" className="p-2 mx-2 bg-green-500 text-white rounded-lg" onClick={postComplain}>접수</button>
        <button type="button" className="p-2 mx-2 bg-red-500 text-white rounded-lg" onClick={goBack}>취소</button>
      </form>
      <Alert message={"신고접수가 완료되었습니다. 소중한 의견 감사합니다."} isOpen={isOpen} onClose={() => {setIsOpen(false)}}/>
    </div>
  )
}
