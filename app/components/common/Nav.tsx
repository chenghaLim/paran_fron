"use client"
import Link from "next/link"
import { useState } from "react";

export default function Nav() {
   // 현재 선택된 탭 상태
   const [activeTab, setActiveTab] = useState('All');
   // 탭 클릭 시 상태 변경 함수
   const handleTabClick = (tab: string) => {
     setActiveTab(tab);
   }
 
  return (
    <>
      <ul className="mt-4 flex flex-col items-center rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium text-gray-900  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
            <li>
              <Link
                href="/List"
                className={`block rounded py-2 ${
                  activeTab === 'Groups' ? ' text-green-600  md:hover:text-green-700  md:hover:bg-transparent' : ''
                 }`}
                 onClick={() => handleTabClick('Groups')}
                  aria-current="page"
              >
                파란만장 서비스 보러가기
              </Link>
            </li>
            <li>
              <Link
                href="/aboard"
                className={`block rounded py-2 ${
                  activeTab === 'Aboard' ? ' text-green-600 md:hover:text-green-700 md:p-0 md:hover:bg-transparent' : ''
                 }`}
                 onClick={() => handleTabClick('Aboard')}
                  aria-current="page"
              >
                공지사항
              </Link>
            </li>
          </ul>
    </>
  )
}
