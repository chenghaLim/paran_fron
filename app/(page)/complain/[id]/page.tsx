"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "@/app/components/common/Alert";
import { useSelector } from "react-redux";
import { getCurrentDeclarationPost } from "@/lib/features/users/declarationPost.slice";
import { declarationService } from "@/app/service/users/declarationPost.service";
import { useAppDispatch } from "@/lib/store";
import { userService } from "@/app/service/user/user.service";

export default function ShowOne() {
  const route = useRouter();
  const dispatch = useAppDispatch()
  const declarationPost = useSelector(getCurrentDeclarationPost)
  const [isOpen, setIsOpen] = useState(false);

  const Deny = () => {
    if (declarationPost?.id) {
      declarationService.drop(declarationPost.id, dispatch)
      route.back();
    }
  }

  const Complete = () => {
    if(declarationPost?.target && declarationPost?.id){
      userService.modifyDeclaration(declarationPost.target,dispatch)
      declarationService.drop(declarationPost.id, dispatch)
    }
    setIsOpen(true);
    route.back();
  }

  return (
   <div className="max-w-lg mx-auto my-8 p-8 rounded-lg bg-green-100 shadow-lg">
  {/* 신고 접수 요청을 리스트로 크게 볼 수 있도록 한다. */}
  <ul className="bg-white p-6 rounded-lg shadow-md">
    <li className="border-b-2 border-gray-200 pb-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {declarationPost?.title || "제목 없음"}
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        {declarationPost?.content || "내용 없음"}
      </p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          {`신고자: ${declarationPost?.declarer || "알 수 없음"}`}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong className="text-gray-800">신고 대상: </strong>
          {declarationPost?.target || "알 수 없음"}
        </p>
      </div>
    </li>

    <li className="flex justify-center space-x-4">
      <button
        type="button"
        className="px-6 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
        onClick={Complete}
      >
        처리 완료하기
      </button>
      <button
        type="button"
        className="px-6 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        onClick={Deny}
      >
        거절하기
      </button>
    </li>
  </ul>
  <button type="button" onClick={() => { route.back() }} className="mt-4 p-2 bg-green-400 text-white rounded-lg hover:bg-green-500">뒤로가기</button>
  <Alert
    message={"처리가 완료되었습니다"}
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
  />
</div>
  )
}
