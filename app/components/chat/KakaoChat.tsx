"use client";
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Kakao: any; // Kakao 객체를 글로벌로 선언
  }
}

const KakaoChat = () => {
  useEffect(() => {
    const initializeKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // 환경 변수로부터 JavaScript 키 사용
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }

      // 채팅 버튼 생성
      const chatbuttonContainer = document.getElementById("chat-channel-button");
      if (chatbuttonContainer) {
        window.Kakao.Channel.createChatButton({
          container: "#chat-channel-button",
          channelPublicId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID, // 환경 변수로 공개 ID 관리
        });
      } else {
        console.error("Chat button container not found");
      }
    };

    if (typeof window !== "undefined" && window.Kakao) {
      initializeKakao();
    } else {
      // Kakao SDK가 로드될 때까지 대기
      const interval = setInterval(() => {
        if (window.Kakao) {
          clearInterval(interval);
          initializeKakao();
        }
      }, 100); // 100ms 간격으로 확인
    }
  }, []);

  return (
    <div>
      <Script
        src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL} // Kakao SDK URL을 환경 변수로 관리
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        strategy="afterInteractive" // 페이지가 인터랙티브 상태일 때 로드
      />
      <div id="chat-channel-button"></div>
    </div>
  );
};

export default KakaoChat;
