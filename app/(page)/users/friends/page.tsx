"use client";
import Alert from "@/app/components/common/Alert";
import { FriendModel } from "@/app/model/user/users.model";
import { friendService } from "@/app/service/users/friend.service";
import { getAlreadyFriends, getRequestFriends, getResponseFriends } from "@/lib/features/users/friend.slice";
import { getNickname } from "@/lib/features/users/user.slice";
import { useAppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DeclarationList() {
  const [alertState, setAlertState] = useState({ isOpen: false, message: "" });
  const dispatch = useAppDispatch();
  const friends = useSelector(getAlreadyFriends)
  const requestFriends = useSelector(getRequestFriends)
  const responseFriends = useSelector(getResponseFriends)
  const nickname = useSelector(getNickname);
  const [activeTab, setActiveTab] = useState<string>("친구 목록");
  const router = useRouter()
  console.log(requestFriends)
  useEffect(() => {
    if (!nickname) return;
    friendService.findFriendList(nickname, dispatch)
  }, [nickname, dispatch]);

  const deleteFriend = (name: string, id: number, tab: string) => {
    let message = ''
    switch (tab) {
      case "친구 목록":
        message = `${name}님과 친구 관계를 삭제했습니다.`;
        break;
      case "보낸 요청":
        message = `${name}님에게 보낸 친구 요청을 취소했습니다.`;
        break;
      case "받은 요청":
        message = `${name}님의 친구 요청을 거절합니다.`;
        break;
      default:
        return null;
    }
    friendService.drop(id, dispatch)
    setAlertState({ isOpen: true, message });
  }

  const insertFriend = (friend: FriendModel) => {
    friendService.modifyFriend(friend, dispatch)
    setAlertState({ isOpen: true, message: `${friend.requestUser}와 친구가 되었습니다.` });
  }

  const closeAlert = () => {
    setAlertState({ isOpen: false, message: "" });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "친구 목록":
        return (
          <ul>
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <li key={index} className="p-4 bg-white rounded-lg shadow-sm mb-4 flex justify-between items-center">
                  <p className="font-bold text-gray-800">
                    {friend.requestUser === nickname ? friend.responseUser : friend.requestUser}
                  </p>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() =>
                      deleteFriend(
                        friend.requestUser === nickname ? friend.responseUser : friend.requestUser,
                        Number(friend.id),
                        activeTab
                      )
                    }
                  >
                    친구 삭제
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">친구 목록이 없습니다.</p>
            )}
          </ul>
        );
      case "보낸 요청":
        return (
          <ul>
            {requestFriends.length > 0 ? (
              requestFriends.map((friend, index) => (
                <li key={index} className="p-4 bg-white rounded-lg shadow-sm mb-4 flex justify-between items-center">
                  <p className="font-bold text-gray-800">{friend.responseUser}</p>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => deleteFriend(friend.responseUser, Number(friend.id), activeTab)}
                  >
                    요청 취소
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">보낸 친구 요청이 없습니다.</p>
            )}
          </ul>
        );
      case "받은 요청":
        return (
          <ul>
            {responseFriends.length > 0 ? (
              responseFriends.map((friend, index) => (
                <li key={index} className="p-4 bg-white rounded-lg shadow-sm mb-4 flex justify-between items-center">
                  <p className="font-bold text-gray-800">{friend.requestUser}</p>
                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => deleteFriend(friend.requestUser, Number(friend.id), activeTab)}
                    >
                      요청 거절
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      onClick={() => insertFriend(friend)}
                    >
                      요청 수락
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">받은 친구 요청이 없습니다.</p>
            )}
          </ul>
        );
      default:
        return null;
    }
  };


  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="bg-green-50 py-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold">친구 관리</h1>
      </div>

      <div className="my-6 space-y-6">
        {/* 탭 버튼 */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${activeTab === "친구 목록" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            onClick={() => setActiveTab("친구 목록")}
          >
            친구 목록
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${activeTab === "보낸 요청" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            onClick={() => setActiveTab("보낸 요청")}
          >
            보낸 요청
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${activeTab === "받은 요청" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            onClick={() => setActiveTab("받은 요청")}
          >
            받은 요청
          </button>
        </div>

        {/* 탭 내용 렌더링 */}
        <div className="bg-green-50 p-8 rounded-lg">{renderTabContent()}</div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={() => { router.back() }}
          className="rounded-full bg-white-400 px-6 py-3 text-black text-sm font-medium hover:bg-gray-200 transition duration-300 border border-gray-200"
        >
          뒤로가기
        </button>
      </div>
      <Alert
        message={alertState.message}
        isOpen={alertState.isOpen}
        onClose={closeAlert}
      />
    </div>
  );
}