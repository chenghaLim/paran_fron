import React, { useState, useEffect, useCallback } from 'react';
import { removeAccessToken, setAccessToken } from "@/app/api/authUtils";
import { userService } from "../../../service/user/user.service";
import { groupService } from "../../../service/group/group.service";
import { likeBookService } from "../../../service/group/likeBook.service";
import { likePostService } from "../../../service/group/likePost.service";
import { roomService } from "../../../service/room/room.service";
import { saveNickname } from "@/lib/features/users/user.slice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/lib/store";
import requests from '@/app/api/requests';
import api from '@/app/api/axios';

interface TimerButtonProps {
  onRefresh: () => void;
}

const TimerButton = ({ onRefresh }: TimerButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [timeLeft, setTimeLeft] = useState(600); // 10분
  const [isHovered, setIsHovered] = useState(false);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          handleLogout(); // 시간이 0이 되면 로그아웃 실행
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function handleLogout() {
    try {
      removeAccessToken();
      window.location.replace('/');
      console.log("시간 초과로 자동 로그아웃되었습니다.");
    } 
    catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };
  

  const handleRefresh = async () => {
    console.log("Refresh 버튼을 눌렀습니다.");
    try {
      const response = await api.post(requests.fetchReissue, {
        withCredentials: true,
      });

      const token = response.headers['authorization']?.replace("Bearer ", "");
      if (token) {
        console.log("Token received:", token);
        setAccessToken(token);
        dispatch(saveNickname(response.headers['nickname']));
        const nickname = response.headers['nickname'];
        
        await userService.findUserDetail(nickname, dispatch);
        await groupService.findByNickname(nickname, dispatch);
        await likeBookService.findByNickname(nickname, dispatch);
        await roomService.findAllLikedByNickname(nickname, dispatch);
        await likePostService.findAllByUserNickname(nickname, dispatch);

        onRefresh();
      } else {
        console.error("토큰 리프레시 요청 없음.");
        throw new Error('토큰을 받지 못했습니다.');
      }
      console.log('Response:', response.data);
    } catch (error) {
      handleLogout(); // 오류 발생 시 로그아웃
      console.error('Error during reissue:', error);
    }

    setTimeLeft(600); // Reset to 10 minutes
  };

  return (
    <div
      className="inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <button
          type="button"
          onClick={handleRefresh}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          시간연장하기
        </button>
      ) : (
        <div className={`rounded px-4 py-2 ${timeLeft <= 60 ? 'bg-red-100' : 'bg-gray-100'}`}>
          <span className={`font-mono ${timeLeft <= 60 ? 'text-red-700' : ''}`}>{formatTime(timeLeft)}</span>
        </div>
      )}
    </div>
  );
};

export default TimerButton;