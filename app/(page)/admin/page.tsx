import Link from "next/link";

export default function admin() {
  return (
    <div className="max-w-lg mx-auto my-10">
      <ul className="p-7 bg-green-100 rounded-lg">
        <li className="py-3 px-4 my-2 bg-white rounded-lg"><Link href='/users'>사용자 관리</Link></li>
        <li className="py-3 px-4 my-2 bg-white rounded-lg"><Link href='/admin/rooms'>공간 관리</Link></li>
        <li className="py-3 px-4 my-2 bg-white rounded-lg"><Link href='/admin/groups'>소모임 관리</Link></li>
        <li className="py-3 px-4 my-2 bg-white rounded-lg"><Link href='/aboard'>관리자 공지 관리</Link></li>
        <li className="py-3 px-4 my-2 bg-white rounded-lg"><Link href='/complain'>신고 관리하기</Link></li>
      </ul>
    </div>
  )
}
