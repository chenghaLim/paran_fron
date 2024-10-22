"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type CarouselItem = {
  id: number;
  title: string;
  string: string;
  text: string;
  btn: {
    text: string;
    link: string;
  };
};

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "독서습관 길러봐요!",
    string: "우리들의 즐거운 소모임을 통해서 함께 독서습관 만들어요!",
    text: "집과 가까운곳 재밌어 보이는곳 나와 취향이 비슷한 곳 등 다양한 소모임에 참여해보세요!",
    btn: { text: "참여하기", link: "/List" },
  },
  {
    id: 2,
    title: "재밌는 모임에 함께해요!",
    string: "우리들의 즐거운 소모임을 통해서 함께 독서습관 만들어요!",
    text: "나와 독서취향이 비슷한 사람들과 즐겁게 독서해요!",
    btn: { text: "함께하기", link: "/List" },
  },
  {
    id: 3,
    title: "독서가 새해목표이신 분들 집중!",
    string: "여러 사람들과 함께하는 독서는 어떠신가요?",
    text: "새로운 만남과 집중할 공간도 있어서 독서에 재미를 붙여봐요!",
    btn: { text: "더보기", link: "/List" },
  },
  {
    id: 4,
    title: "집이 아닌 카페같은 공간에서 독서해요!",
    string: "집 주변의 장소를 컨텍해서 독서를 해보는건 어떠세요?",
    text: "예쁜 공간에서 즐겁게 독서해요",
    btn: { text: "공간보러가기", link: "/List" },
  },
  {
    id: 5,
    title: "여러분들의 심상을 공유해주세요!",
    string: "독서는 마음의 양식이면서 휴식처입니다!",
    text: "독서를 읽으면서 마음도 치유되는 새로운 경험을 공유해주세요!",
    btn: { text: "더보기", link: "/List" },
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLink, setCurrentLink] = useState(carouselItems[0].btn.link); // 현재 링크 상태 관리
  const router = useRouter();

  const handleButtonClick = useCallback(() => {
    router.push(currentLink); // 현재 링크로 이동
  }, [router, currentLink]);

  const renderButton = (btn: { text: string; link: string }) => (
    <button
      onClick={handleButtonClick}
      className="inline-flex items-center justify-center rounded-lg bg-green-400 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-green-500 focus:ring-4 focus:ring-green-300"
    >
      {btn.text}
      <svg
        className="ms-2 size-3.5 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length,
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    setCurrentLink(carouselItems[currentSlide].btn.link); // 슬라이드 변경 시 링크 업데이트
  }, [currentSlide]);

  return (
    <div className="relative" aria-label="Carousel" id="article">
      <div className="rounded-xlg relative h-60 w-full overflow-hidden bg-green-50 px-[5.5rem] py-[4.5rem] md:h-96">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute h-80 w-full p-4 transition-opacity duration-700 ease-linear ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-4xl font-extrabold">
              {item.title}
            </h2>
            <p className="my-2 text-lg text-gray-500">{item.string}</p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              {item.text}
            </p>
            {renderButton(item.btn)}
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`size-3 rounded-full ${
              index === currentSlide
                ? "bg-green-300"
                : "bg-white hover:bg-white/50"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="group absolute left-[-10%] top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white">
          <svg
            className="size-4 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1L1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="group absolute right-[-10%] top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white">
          <svg
            className="size-4 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
