"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "./Alert";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/lib/features/users/user.slice";

interface AccordionItem {
  id: string;
  title: string;
  category: string;
  content: React.ReactNode;
}

const accordionItems: AccordionItem[] = [
  {
    id: "accordion-open-heading-1",
    title: "paranmanzang 이란?",
    category: "전체",
    content: (
      <>
        <p className="mb-2 text-gray-500">
          책을 사랑하고 취미로 읽으시는 분들이 모여 소모임과 공간대여를 통해
          자유롭게 의견을 나누고 책을 더 좋아하게 되었으면 좋겠다는 취지로
          만들어진 서비스입니다.
        </p>
        <p className="text-gray-500">
          파란만장 서비스를 경험해보고 싶으신 분들은{" "}
          <Link href="/" className="bg-green-400 text-white hover:underline">
            지금 시작해보기
          </Link>{" "}
          함께 독서하고 얘기를 나누며 삶의 질을 높이는 경험이 될 수 있으면
          좋겠습니다.
        </p>
      </>
    ),
  },
  {
    id: "accordion-open-heading-2",
    title: "책 구매도 할 수 있나요?",
    category: "",
    content: (
      <>
        <p className="mb-2 text-gray-500">
          현재 책 구매 서비스는 제공하고 있지 않습니다. 파란만장은 독서 모임과
          공간 대여에 중점을 두고 있습니다.
        </p>
        <p className="text-gray-500">
          하지만 향후 서비스 확장 시 고려해볼 수 있는 기능입니다. 여러분의
          의견을 환영합니다!
        </p>
      </>
    ),
  },
  {
    id: "accordion-open-heading-3",
    title: "공간은 어떻게 예약할 수 있나요?",
    category: "",
    content: (
      <>
        <p className="mb-2 text-gray-500 border-b-1">
          공간 예약은 웹사이트나 모바일 앱을 통해 간단히 할 수 있습니다. 원하는
          날짜와 시간을 선택하고, 필요한 인원수를 입력한 후 예약 버튼을 클릭하면
          됩니다.
        </p>
        <p className="mb-2 text-gray-500">
          예약 과정에 대해 더 자세히 알고 싶다면, 다음 링크를 참고해주세요:
        </p>
        <ul className="list-disc ps-5 text-gray-500">
          <li>
            <Link href="/" className="bg-green-400 text-white hover:underline">
              예약 방법 안내
            </Link>
          </li>
        </ul>
      </>
    ),
  },
];

export default function About() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [items, setItems] = useState<AccordionItem[]>(accordionItems);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();
  const user = useSelector(getCurrentUser);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    openItems.forEach((id) => {
      if (contentRefs.current[id]) {
        const element = contentRefs.current[id];
        if (element) {
          element.style.maxHeight = `${element.scrollHeight}px`;
        }
      }
    });
  }, [openItems]);

  const handleDelete = () => {
    if (checkedItems.length === 0) {
      setIsAlertOpen(true);
      setAlertMessage("삭제할 항목을 선택해주세요");
      return;
    }

    const newItems = items.filter((item) => !checkedItems.includes(item.id));
    setItems(newItems);
    setCheckedItems([]);
    setIsAlertOpen(true);
    setAlertMessage("선택한 항목이 삭제되었습니다.");
  };

  const handleUpdate = () => {
    if (checkedItems.length === 0) {
      setIsAlertOpen(true);
      setAlertMessage("수정할 항목을 선택해주세요.");
      return;
    }

    if (checkedItems.length > 1) {
      setIsAlertOpen(true);
      setAlertMessage("수정할 항목을 하나만 선택해주세요.");
      return;
    }

    // 선택된 항목의 ID를 쿼리 파라미터로 전달
    router.push(`/aboard/update/${checkedItems[0]}`);
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="px-[15%] py-[5%]">
        {user?.role === 'ROLE_ADMIN' && (
          <div className="ms-auto max-w-[20rem] mb-4">
            <Link
              href="/aboard/add"
              className="mx-2 rounded-lg bg-green-400 px-4 py-3 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              등록
            </Link>
            <button
              type="button"
              onClick={handleUpdate}
              className="mx-2 rounded-lg bg-green-400 px-4 py-3 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              수정
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="mx-2 rounded-lg bg-green-400 px-4 py-3 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              삭제
            </button>
            <button type="button"
              onClick={() => { router.back() }}
              className="mx-2 rounded-lg bg-green-400 px-4 py-3 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
            >뒤로가기</button>
          </div>
        )}

        <blockquote className="mb-6 text-xl font-semibold italic text-gray-900">
          <p>&ldquo;Paranmanzang 서비스를 이용해주셔서 감사합니다.&rdquo;</p>
        </blockquote>

        <div id="accordion-open" data-accordion="open">
          {items.map((item) => (
            <div key={item.id}>
              <h2 id={item.id}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 border border-gray-200 p-5 font-medium text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rtl:text-right ${openItems.includes(item.id) && "bg-gray-100 text-gray-900"
                    }`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={openItems.includes(item.id)}
                  aria-controls={`${item.id}-body`}
                >
                  <span className="flex items-center">
                    {user?.role === 'ROLE_ADMIN' && (
                      <input
                        id={`checkbox-${item.id}`}
                        type="checkbox"
                        checked={checkedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="mr-2 h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-400"
                      />
                    )}
                    <svg
                      className="me-2 size-5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {item.title}
                    <span className="ms-3 inline-flex items-center justify-center rounded-full bg-green-100 px-2 text-sm font-medium text-green-800">
                      {item.category}
                    </span>
                  </span>
                  <svg
                    className={`size-3 shrink-0 transition-transform ${openItems.includes(item.id) ? "rotate-180" : ""
                      }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id={`${item.id}`}
                className={`accordion-content ${openItems.includes(item.id) ? "open" : ""}`}
                aria-labelledby={item.id}
              >
                <div className="border border-b-0 border-gray-200 p-5">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Alert
        message={alertMessage}
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      />
    </>
  );
}