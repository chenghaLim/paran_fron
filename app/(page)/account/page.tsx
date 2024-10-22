"use client"
import { AccountModel } from "@/app/model/room/account.model";
import { accountService } from "@/app/service/room/account.service";
import { getLeaderGroups } from "@/lib/features/group/group.slice";
import { getNickname } from "@/lib/features/users/user.slice";
import { useAppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Account() {
  const route = useRouter();
  const goBack = () => route.back()
  const leaderGroups = useSelector(getLeaderGroups)
  const nickname = useSelector(getNickname)
  const dispatch = useAppDispatch()
  const [accounts, setAccounts] = useState<AccountModel[]>([]);

  useEffect(() => {
    if (nickname !== null) {
      setAccounts([])
      leaderGroups.forEach(group => {
        accountService.findByGroup(group.id, 0, 10, dispatch).then(data => {
          data.forEach(account => {
            setAccounts(prevAccounts => [...prevAccounts, account]);
          })
        })
      })
    }
  }, [])
  return (
    <div className="mx-auto max-w-lg">
      <ul className="my-8 rounded-lg bg-green-100 p-6">
        {/* 맵으로 돌리기 */}
        {accounts.length > 0 && accounts.map((account, index) => (
          <li key={index} className="my-2 rounded-lg bg-green-50 p-4">
            <div className="flex items-end justify-evenly">
              <h2 className="text-xl">{account.orderName}</h2>
              <p>결제일: {account.createAt?.slice(0, 10)}</p>
              <p className="text-sm">{account.amount.toLocaleString()}원</p>
              <span className="rounded-full bg-green-500 p-1 text-sm text-white">{account.canceled}</span>
            </div>
          </li>
        ))
        }
        {accounts.length === 0 && <p>결제내역이 없습니다.</p>}
        {/*         
        <li className="my-2 rounded-lg bg-green-50 p-4">
          <div className="flex items-end justify-evenly">
            <h2 className="text-xl">결제 큰제목</h2>
            <p className="text-sm">결제정보</p>
            <span className="rounded-full bg-green-500 p-1 text-sm text-white">결제여부</span>
          </div>
        </li>
         */}
      </ul>
      <button type="button" onClick={goBack} className="rounded-lg bg-green-400 p-2 text-white">뒤로가기</button>
    </div>
  )
}
