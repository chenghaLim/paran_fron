"use client"
import { getCurrentUser, saveError } from "@/lib/features/users/user.slice";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store";
import { useState } from "react";
import { userService } from "@/app/service/user/user.service";
import { useRouter } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default function UserUpdate({ params }: PageProps) {
  const user = useSelector(getCurrentUser);
  const dispatch = useAppDispatch();
  const [newPassword, setNewPassword] = useState('');
  const route = useRouter()

  const onUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && user.nickname) {
      await userService.modifyPassword(user.nickname, newPassword, dispatch);
      route.push('/users/login')
    } else {
      dispatch(saveError("사용자 정보를 찾을 수 없습니다."));
    }
  }
  return (
    <div className="mx-auto my-8 max-w-sm rounded-lg bg-green-100 p-6">
      <form className="p-2" onSubmit={onUpdate}>
        <div>
          <label htmlFor="ID" className="mb-2 block text-sm font-medium text-gray-900">아이디</label>
          <input
            type="text"
            id="ID"
            value={user?.nickname || ''}
            disabled
            className="block w-full rounded-lg border p-2.5 text-sm"
          />
        </div>
        <div className="my-6">
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="변경할 비밀번호를 입력해주세요"
            className="block w-full rounded-lg border border-green-300 bg-green-50 p-2.5 text-sm text-green-900 focus:border-green-500 focus:ring-green-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="mx-2 rounded-lg bg-green-400 p-2 text-white">수정하기</button>
        <Link href="/" className="mx-2 inline-block rounded-lg bg-gray-300 p-2 text-black">취소</Link>
      </form>
    </div>

  )
}
