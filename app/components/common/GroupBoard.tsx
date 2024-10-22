"use client"
import { useEffect, useState } from "react";
import { getCurrentGroup, getGroupPosts, saveCurrentGroupPost } from "@/lib/features/group/group.slice";
import { useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { groupPostService } from "@/app/service/group/groupPost.service";
import { getBookings } from "@/lib/features/room/booking.slice";
import { bookingService } from "@/app/service/room/booking.service";
import { getRoomsMap, saveCurrentRoom } from "@/lib/features/room/room.slice";
import { getAddresses, saveCurrentAddress } from "@/lib/features/room/address.slice";
import { GroupPostResponseModel } from "@/app/model/group/group.model";
import PostEditor from "../crud/PostEditor";
import Pagination from "@/app/components/common/Row/pagination/Pagination";

type TabType = "공지 사항" | "자유게시판" | "스케쥴";

export default function GroupBoard() {
    const dispatch = useAppDispatch();
    const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false);
    const router = useRouter();
    const { groupPostsNotice, groupPostsGeneral } = useSelector(getGroupPosts);
    const group = useSelector(getCurrentGroup);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [activeTab, setActiveTab] = useState<TabType>('공지 사항');
    const tabs: TabType[] = ["공지 사항", "자유게시판", "스케쥴"];

    const bookings = useSelector(getBookings);
    const enableRooms = useSelector(getRoomsMap);
    const addresses = useSelector(getAddresses);

    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (!group) {
            return;
        }
        groupPostService.findByGroupId(group.id, page - 1, size, activeTab, dispatch);
        bookingService.findByGroupId(group.id, page - 1, size, dispatch);
    }, [dispatch, group, activeTab, page, size]);

    useEffect(() => {
        switch (activeTab) {
            case "공지 사항":
                setTotalItems(groupPostsNotice.length);
                break;
            case "자유게시판":
                setTotalItems(groupPostsGeneral.length);
                break;
            case "스케쥴":
                setTotalItems(bookings.length);
                break;
        }
    }, [activeTab, groupPostsNotice, groupPostsGeneral, bookings]);

    const onClickToDetail = (post: GroupPostResponseModel) => {
        if (post) {
            dispatch(saveCurrentGroupPost(post));
            groupPostService.modifyViewCount(post.id, dispatch)
                .finally(() => {
                    router.push(`/groups/board/detail/${post.id}`);
                });
        }
    };

    const onClickToRoomDetail = (currentId: number | undefined) => {
        if (currentId !== undefined) {
            dispatch(saveCurrentRoom(enableRooms.find((room) => room.id === currentId) || null));
            dispatch(saveCurrentAddress(addresses.find(({ roomId }) => roomId === currentId) ?? null));
            router.push(`/rooms/${currentId}`);
        }
    };

    function formatUsingTime(times: string[]) {
        if (times.length === 0) return "시간 정보 없음";
        const startTime = times[0].slice(0, 5);
        const endTime = times[times.length - 1].slice(0, 5);
        return `${startTime} ~ ${endTime}`;
    }

    const toggleEditorVisibility = () => {
        setIsEditorVisible((prev) => !prev);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setSize(newPageSize);
        setPage(1);
    };

    const getPaginatedData = (data: any[]) => {
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;
        return data.slice(startIndex, endIndex);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "공지 사항":
                return renderPostList(getPaginatedData(groupPostsNotice));
            case "자유게시판":
                return renderPostList(getPaginatedData(groupPostsGeneral));
            case "스케쥴":
                return renderScheduleList(getPaginatedData(bookings));
            default:
                return null;
        }
    };

    const renderPostList = (posts: GroupPostResponseModel[]) => (
        <ul className="space-y-4">
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <li key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" onClick={() => onClickToDetail(post)}>
                        <div className="flex items-center justify-between space-x-4">
                            <p className="font-semibold text-lg text-gray-800 truncate flex-1">
                                {post.title}
                            </p>
                            <div className="flex items-center space-x-6">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-gray-700">작성자:</span> {post.nickname}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium text-gray-700">조회수:</span> {post.viewCount}
                                </p>
                            </div>
                        </div>
                    </li>
                ))
            ) : (
                <p className="text-center text-gray-500">게시물이 없습니다.</p>
            )}
        </ul>
    );

    const renderScheduleList = (bookings: any[]) => (
        <ul className="space-y-4">
            {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                    <li
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                            <p className="text-lg font-semibold text-gray-900">{booking.date}</p>
                            <p
                                className="text-base font-medium text-green-600 cursor-pointer hover:underline"
                                onClick={() => onClickToRoomDetail(booking.roomId)}
                            >
                                장소: {enableRooms.find((room) => room.id === booking.roomId)?.name || "알 수 없음"}
                            </p>
                        </div>
                        <div className="mt-2">
                            <p className="text-base font-medium text-gray-800">
                                <span className="font-semibold text-gray-700">이용 시간: </span>
                                {formatUsingTime(booking.usingTime)}
                            </p>
                        </div>
                    </li>
                ))
            ) : (
                <li className="text-center text-gray-500 py-8">스케쥴이 없습니다.</li>
            )}
        </ul>
    );

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <div className="bg-green-50 py-8 rounded-lg text-center">
                <h1 className="text-4xl font-bold">{group?.name}</h1>
            </div>

            <div className="my-6 space-y-6">
                <div className="flex justify-center space-x-4 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 
                                ${activeTab === tab ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            onClick={() => {
                                setActiveTab(tab);
                                setPage(1);
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto my-4 p-6 bg-white rounded-lg shadow-lg">
                    <button
                        type="button"
                        onClick={toggleEditorVisibility}
                        className="py-2 px-6 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors duration-300 shadow-md"
                    >
                        {isEditorVisible ? '글 작성 취소' : '글 작성'}
                    </button>

                    {isEditorVisible && (
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform scale-100">
                            <PostEditor />
                        </div>
                    )}
                </div>

                <div className="bg-green-50 p-8 rounded-lg shadow-md">
                    {renderTabContent()}
                </div>

                <Pagination
                    currentPage={page}
                    pageSize={size}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            </div>

            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    뒤로가기
                </button>
            </div>
        </div>
    );
}