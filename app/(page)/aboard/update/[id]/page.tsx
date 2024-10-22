"use client"

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/common/Alert";

interface UpdateFormData {
  title: string;
  content: string;
  category: string;
}

export default function Update() {
  //기존의 입력되어있던 것을 가져와서 수정하는 식으로 되야 함. -> 기존 글은 disabled 처리
  const router = useRouter();
  const [formData, setFormData] = useState<UpdateFormData>({
    title: "",
    content: "",
    category: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // API 호출 로직
      const response = await fetch('/api/update-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("게시글이 성공적으로 수정되었습니다.");
        setIsOpen(true);
        // 성공 후 리다이렉트 또는 추가 로직
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      setMessage("게시글 수정에 실패했습니다.");
      setIsOpen(true);
    }
  };

  return (
    <div className="min-h-[80vh] my-10">
      <form className="mx-auto max-w-sm" onSubmit={handleSubmit}>
        <div className="my-2">
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="제목을 입력해주세요"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-400 focus:ring-green-400"
            required
          />
        </div>
        <div className="my-2">
          <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-900">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            value={formData.content}
            onChange={handleInputChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-400 focus:ring-green-400"
            placeholder="내용을 작성해주세요"
            required
          ></textarea>
        </div>
        <button type="submit" className="mx-2 rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500">
          수정하기
        </button>
        <Link href="/aboard" className="mx-2 inline-block rounded-lg bg-green-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300">
          뒤로가기
        </Link>
      </form>
      <Alert 
        isOpen={isOpen}
        message={message}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}