"use client"
import Link from "next/link";
import { useSelector } from "react-redux";
import { getUserList, getNickname } from "@/lib/features/users/user.slice";
import Image from "next/image";
import { useAppDispatch } from "@/lib/store";
import { userService } from "@/app/service/user/user.service";
import { useEffect, useState, useMemo } from "react";
import Pagination from "@/app/components/common/Row/pagination/Pagination";
import { useRouter } from "next/navigation";

export default function UserList() {
  const dispatch = useAppDispatch()
  const allUsers = useSelector(getUserList)
  const currentUserNickname = useSelector(getNickname)
  const [userRoles, setUserRoles] = useState<{ [key: string]: string | undefined}>({})
  const router = useRouter()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  useEffect(() => {
    const fetchUsers = async () => {
      if (currentUserNickname) {
        try {
          await userService.findAllUsers(currentUserNickname, dispatch);
        } catch (error) {
          console.error("사용자 목록 조회 중 오류:", error);
        }
      }
    }

    fetchUsers();
  }, [currentUserNickname, dispatch])

  useEffect(() => {
    const initialRoles = allUsers.reduce<{ [key: string]: string | undefined }>((acc, user) => {
      if (user.nickname) {
        acc[user.nickname as string] = user.role;
      }
      return acc;
    }, {});
    setUserRoles(initialRoles);
  }, [allUsers]);

  const { paginatedUsers, totalPages } = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return {
      paginatedUsers: allUsers.slice(startIndex, endIndex),
      totalPages: Math.ceil(allUsers.length / pageSize)
    };
  }, [allUsers, page, pageSize])

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }

  const handleRoleChange = (nickname: string, newRole: string) => {
    setUserRoles(prevRoles => ({
      ...prevRoles,
      [nickname]: newRole
    }));
  }

  const onUpdateUser = async (nickname: string | undefined) => {
    if (!nickname) {
      console.error("닉네임이 없습니다.");
      return;
    }

    const newRole = userRoles[nickname];
    if (!newRole) {
      console.error("새로운 역할이 선택되지 않았습니다.");
      return;
    }

    if (window.confirm(`${nickname}의 회원등급을 ${newRole}로 수정하시겠습니까?`)) {
      try {
        await userService.modifyRole(nickname, newRole, dispatch)
        alert("회원 등급이 성공적으로 업데이트되었습니다.")
        await userService.findUserDetail(nickname, dispatch);
      } catch (error) {
        console.error("회원 등급 업데이트 실패:", error)
        alert("회원 등급 업데이트에 실패했습니다.")
      }
    }
  }

  const onDelete = async (nickname: string | undefined) => {
    if (!nickname) {
      console.error("유저가 없습니다.");
      return;
    }
    if (window.confirm(`${nickname}을(를) 강제 탈퇴시키겠습니까?`)) {
      try {
        await userService.dropUser(nickname, dispatch);
        alert("회원이 성공적으로 탈퇴되었습니다.");
        // await userService.findAllUsers(nickname, dispatch);
      } catch (error) {
        console.error("회원 강제 탈퇴 중 오류:", error);
        alert("회원 강제 탈퇴에 실패했습니다.");
      }
    }
  }


  return (
    <div className="h-auto max-w-[80%] mx-auto my-[40px]">
      <div id="btn" className="m-2 max-w-full">
        <button onClick={() => {router.push("/admin")}}className="rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500">
          뒤로가기
        </button>
      </div>

      <ul className="h-1/2 px-10 py-10 my-6 bg-green-100 rounded-lg">
        {paginatedUsers.map(user => (
          <li key={user.id}>
            <div className="inline-flex justify-around items-center w-full bg-green-50 border-2 border-green-400 p-4 m-2">
              <div className="size-8 bg-green-500 rounded-full">
                <Image
                  className="size-100 rounded-full shadow-lg"
                  width={502}
                  height={500}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`}
                  alt="프로필 사진"
                  onError={(e) => {
                    e.currentTarget.src = `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT}`
                  }}
                />
              </div>
              <div>
                <div className="my-1">
                  <span className="text-sm">닉네임: </span>
                  <span>{user.nickname}</span>
                </div>
                <div className="my-1">
                  <span className="text-sm">신고누적횟수: </span>
                  <span>{user.declarationCount}</span>
                </div>
              </div>
              <div>
                <div>
                  <div className="content-center">
                    <div className="flex items-center justify-center">
                      <select
                        value={userRoles[user.nickname as string] || user.role}
                        onChange={(e) => user.nickname && handleRoleChange(user.nickname, e.target.value)}
                        className="rounded-lg bg-green-50 px-3 py-1 text-center border-2 border-green-400 text-sm font-medium text-gray-900"
                      >
                        <option value="ROLE_USER">일반회원</option>
                        <option value="ROLE_SELLER">판매자</option>
                        {/* 
                          어드민으로 만드는게 필요할까? 
                         <option value="ROLE_ADMIN">Admin</option> 
                         */}
                      </select>
                    </div>
                    <button
                      onClick={() => onUpdateUser(user.nickname)}
                      className="m-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500"
                    >
                      등급 변경
                    </button>
                  </div>
                  <button
                    type="button"
                    className="mx-2 rounded-lg bg-red-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-500"
                    onClick={() => onDelete(user.nickname)}
                  >
                    강제탈퇴
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        pageSize={totalPages}
        totalItems={allUsers.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}