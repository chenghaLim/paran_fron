"use client"
import Link from "next/link";
import Alert from "@/app/components/common/Alert";
import { useState } from "react";

export default function Add() {
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const onCreate = (e:any) => {
    e.preventDefault();
    setIsActive(true);
    setMessage("등록이 완료되었습니다.");
  }
  const closeAlert = () => setIsActive(false);
  return (
    <>
      <div className="h-[80%] my-10">
        <form className="mx-auto max-w-sm" onSubmit={onCreate}>
          <div className="my-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              aria-describedby="helper-text-explanation"
              placeholder="제목을 입력해주세요"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-400 focus:ring-green-400"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              내용
            </label>
            <textarea
              id="content"
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-400 focus:ring-green-400"
              placeholder="내용을 작성해주세요"
            ></textarea>
          </div>
          <div className="my-2">
            <label
              htmlFor="categories"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              카테고리
            </label>
            <select
              id="categories"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-400 focus:ring-green-400"
            >
              <option>사회과학</option>
              <option>기술과학</option>
              <option>문학</option>
              <option>철학</option>
              <option>예술</option>
              <option>언어</option>
              <option>역사</option>
              <option>종교</option>
              <option>자연과학</option>
              <option>기타</option>

            </select>
          </div>
          <button type="submit" className="mx-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300">등록하기</button>
          <Link href="/aboard" className="mx-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300">뒤로가기</Link>
        </form>

      </div>
      <Alert
        message={message}
        isOpen={isActive}
        onClose={closeAlert}
      />
    </>
  );
}
