"use client"
import { getDeclarationPosts, saveCurrentDeclarationPost } from "@/lib/features/users/declarationPost.slice"
import { useAppDispatch } from "@/lib/store"
import { useSelector } from "react-redux"
import ErrorMessage from "../status/ErrorMessage"
import { useEffect, useState } from "react"
import { declarationService } from "@/app/service/users/declarationPost.service"
import { DeclarationPostModel } from "@/app/model/user/users.model"
import { useRouter } from "next/navigation"

export default function ComplainList() {
  const dispatch = useAppDispatch()
  const declarationList = useSelector(getDeclarationPosts)
  const [page, setPage] = useState(0);
  const size = 10;
  const router = useRouter()

  useEffect(() => {
    declarationService.findAll(page, size, dispatch);
  }, [page, size, dispatch]);

  const moveToDetail = (complain: DeclarationPostModel) => {
    dispatch(saveCurrentDeclarationPost(complain))
    router.push(`/complain/${complain.id}`)
  }

  console.log("declaration값이 나오는지 봅시다", declarationList)
  return (
    <>
      {/* 신고 리스트 렌더링 */}
      {declarationList.length > 0 ? (
        declarationList.map((complain, index) => (
          <li
            className="p-6 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all duration-300 my-4"
            key={index}
          >
            <div className="flex items-center justify-between mb-4" onClick={()=>moveToDetail(complain)}>
              <h3 className="text-lg font-semibold text-gray-800">{complain.title}</h3>
              <span className="text-sm text-gray-500">{`신고자: ${complain.declarer}`}</span>
            </div>
          </li>
        ))
      ) : (
        // 신고가 없는 경우 에러 메시지 표시
        <p>
          <ErrorMessage message="접수된 신고가 없습니다." />
        </p>
      )}
    </>
  )
}
