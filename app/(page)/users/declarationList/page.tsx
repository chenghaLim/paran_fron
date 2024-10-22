"use client";
import { declarationService } from "@/app/service/users/declarationPost.service";
import { getDeclarationPostsByNickname } from "@/lib/features/users/declarationPost.slice";
import { getNickname } from "@/lib/features/users/user.slice";
import { useAppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DeclarationList() {
  const dispatch = useAppDispatch();
  const declarationList = useSelector(getDeclarationPostsByNickname);
  const nickname = useSelector(getNickname);
  const router = useRouter()
  const [page, setPage] = useState(0);
  const size = 10;

  useEffect(() => {
    if (!nickname) return;
    declarationService.findByNickname(page, size, nickname, dispatch);
  }, [nickname, page]);

  const deleteDeclarationPost = (id: number) => {
    if (window.confirm("신고를 취소하시겠습니까?")) {
      declarationService.drop(id, dispatch);
      alert("신고가 취소되었습니다.");
    }
  };


  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">신고 내역</h1>
      {declarationList.length === 0 ? (
        <p className="text-center text-gray-500">신고 내역이 없습니다.</p>
      ) : (
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">제목</th>
              <th className="py-3 px-6 text-left">신고 이유</th>
              <th className="py-3 px-6 text-left">신고 대상자</th>
              <th className="py-3 px-6 text-center">작업</th>
            </tr>
          </thead>
          <tbody>
            {declarationList.map((post, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{post.title}</td>
                <td className="py-3 px-6 text-left">{post.content}</td>
                <td className="py-3 px-6 text-left">{post.target}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => deleteDeclarationPost(Number(post.id))}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors"
                  >
                    신고 취소
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={() => { router.back() }}
          className="rounded-full bg-white-400 px-6 py-3 text-black text-sm font-medium hover:bg-gray-200 transition duration-300 border border-gray-200"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}