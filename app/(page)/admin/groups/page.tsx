"use client"
import Pagination from "@/app/components/common/Row/pagination/Pagination";
import ErrorMessage from "@/app/components/common/status/ErrorMessage";
import LoadingSpinner from "@/app/components/common/status/LoadingSpinner";
import { GroupResponseModel } from "@/app/model/group/group.model";
import { groupService } from "@/app/service/group/group.service";
import { getEnableGroups, getGroups, saveCurrentGroup } from "@/lib/features/group/group.slice";
import { getError, getIsLoading } from "@/lib/features/room/room.slice";
import { useAppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function GroupsAdmin() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const totalItems = 10

  useEffect(() => {
    groupService.findList(page, pageSize, dispatch)
    groupService.enableList(page, pageSize, dispatch)
  }, [page, pageSize])

  const onClickToDetail = (group: GroupResponseModel) => {
    dispatch(saveCurrentGroup(group));
    router.push(`/groups/${group.id}`);
  };
  const [activeTab, setActiveTab] = useState<string>("승인 완료");
  const dispatch = useAppDispatch()
  // 승인된 소모임 내역
  const groups = useSelector(getGroups)
  // 승인되지 않은 소모임 내역
  const enableGroups = useSelector(getEnableGroups)
  const loading = useSelector(getIsLoading)
  const error = useSelector(getError)

  const ableGroup = (group: GroupResponseModel) => {
    groupService.able(group.id, dispatch)
  }

  const enableGroup = (group: GroupResponseModel) => {
    groupService.enable(group.id, dispatch);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "승인 완료":
        return (
          <ul>
            {groups.length > 0 ? (
              groups.map((group, index) => (
                <li key={index} className="p-4 px-8 bg-white rounded-lg shadow-sm mb-4 flex justify-between items-center">
                  <p className="font-bold text-gray-800" onClick={() => onClickToDetail(group)}>
                    {group.name}
                  </p>
                  <button
                    className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500"
                    onClick={() =>
                      enableGroup(group)
                    }
                  >
                    승인 취소
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">승인한 소모임 목록이 없습니다.</p>
            )}
          </ul>
        );
      case "승인 대기 소모임":
        return (
          <ul>
            {enableGroups.length > 0 ? (
              enableGroups.map((group, index) => (
                <li key={index} className="p-4 px-8 bg-white rounded-lg shadow-sm mb-4 flex justify-between items-center">
                  <p className="font-bold text-gray-800" onClick={() => onClickToDetail(group)}>
                    {group.name}
                  </p>
                  <button
                    className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500"
                    onClick={() =>
                      ableGroup(group)
                    }
                  >
                    승인
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">승인 요청이 없습니다.</p>
            )}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <div className="py-4 rounded-lg">
          <h1 className="text-lg font-semibold">소모임 승인 요청</h1>
        </div>
        <button
          type="button"
          onClick={() => { router.back() }}
          className="rounded-lg bg-green-300 px-4 py-2 my-4 text-sm font-medium hover:bg-green-400 transition duration-300 border border-green-400 text-white"
        >
          뒤로가기
        </button>
      </div>


      <div className="my-6">
        {/* 탭 버튼 */}
        <div className="flex justify-center bg-green-50 py-8 rounded-t-lg shadow-b-lg">
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${activeTab === "승인 완료" ? "bg-green-400 text-white" : "bg-gray-200"
              }`}
            onClick={() => setActiveTab("승인 완료")}
          >
            승인 완료
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${activeTab === "승인 대기" ? "bg-green-400 text-white" : "bg-gray-200"
              }`}
            onClick={() => setActiveTab("승인 대기")}
          >
            승인 대기
          </button>
        </div>

        {/* 탭 내용 렌더링 */}
        <div className="bg-green-50 p-8 rounded-b-lg">{renderTabContent()}</div>
      </div>
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        totalItems={activeTab === "승인 완료" ? groups.length : enableGroups.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}