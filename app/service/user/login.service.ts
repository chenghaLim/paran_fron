import { UserModel } from "@/app/model/user/user.model";
import api from "@/app/api/axios";
import requests from "@/app/api/requests";
import { setAccessToken, removeNickname, removeAuthorization } from "@/app/api/authUtils";
import { AppDispatch } from "@/lib/store";
import { getCurrentUser, saveNickname } from "@/lib/features/users/user.slice";
import { userService } from "./user.service";
import { groupService } from "../group/group.service";
import { likeBookService } from "../group/likeBook.service";
import { likePostService } from "../group/likePost.service";
import { roomService } from "../room/room.service";
import { useSelector } from "react-redux";

const login = async (username: string, password: string, dispatch: AppDispatch): Promise<any> => {
  try {
    const response = await api.post<UserModel>(requests.fetchLogin,
      { username, password }
    )

    const token = response.headers['authorization'].replace("Bearer ", "")
    //console.log("전체 응답 헤더:", response.headers);

    if (token) {
      setAccessToken(token);
      dispatch(saveNickname(response.headers['nickname']))

      const nickname = response.headers['nickname']
      userService.findUserDetail(nickname, dispatch)
      groupService.findByNickname(nickname, dispatch)
      likeBookService.findByNickname(nickname, dispatch)
      roomService.findAllLikedByNickname(nickname, dispatch)
      likePostService.findAllByUserNickname(nickname, dispatch)

    } else {
      console.log("토큰이 안보여요 ㅠㅠ")
      throw new Error('토큰을 받지 못했습니다.');
    }
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('비밀번호가 다릅니다 발생');
      
    }
  }
};

const get = async (): Promise<UserModel> => {
  try {
    const response = await api.get<any>("/get")
    console.log("GET: ", response)
    return response.data;

  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('get 중 오류 발생');
    }
  }
}
const oauth = async (): Promise<any> => {
  const oauthUrl = process.env.NEXT_PUBLIC_OAUTH_URL;

  if (!oauthUrl) {
    throw new Error('OAuth URL이 정의되지 않았습니다.');
  }

  // 첫 번째 단계: OAuth URL로 리디렉션
  console.log("Redirecting to OAuth URL:", oauthUrl);
  window.location.href = oauthUrl;
  console.log("loginservice 부분", window.location.href)
};

const getCookieValue = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};
const handleOAuthCallback = async (dispatch: AppDispatch): Promise<any> => {
  const nickname = getCookieValue("nickname");
  const token = getCookieValue("Authorization");

  console.log('닉네임:', nickname);
  console.log('토큰:', token);

  if (!token || !nickname) {
    throw new Error('액세스 토큰이나 닉네임이 없습니다.');
  }

  await getToken(token, nickname, dispatch);
};

const getToken = async (token: string, nickname: string, dispatch: AppDispatch) => {
  setAccessToken(token);
  dispatch(saveNickname(nickname));

  // 사용자 정보를 가져오기 위한 요청을 Promise.all로 처리
  await Promise.all([
    userService.findUserDetail(nickname, dispatch),
    groupService.findByNickname(nickname, dispatch),
    likeBookService.findByNickname(nickname, dispatch),
    roomService.findAllLikedByNickname(nickname, dispatch),
    likePostService.findAllByUserNickname(nickname, dispatch)
  ]);

  removeNickname(); // 함수 호출
  removeAuthorization(); // 함수 호출
};

export const loginService = {
  login,
  get,
  oauth,
  handleOAuthCallback
}
