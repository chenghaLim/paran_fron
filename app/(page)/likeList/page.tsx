"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/common/Alert";
import AccountButton from "@/app/components/common/AccountButton";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/store";
import { getLikedPosts, saveCurrentGroupPost } from "@/lib/features/group/group.slice";
import { getLikedRooms, saveCurrentRoom } from "@/lib/features/room/room.slice";
import { getLikedBooks, saveCurrentBook } from "@/lib/features/group/book.slice";
import { getAddresses, saveCurrentAddress } from "@/lib/features/room/address.slice";
import { getNickname } from "@/lib/features/users/user.slice";
import { likePostService } from "@/app/service/group/likePost.service";
import { likeBookService } from "@/app/service/group/likeBook.service";
import { likeRoomService } from "@/app/service/users/likeRoom.service";
import { LikePostModel } from "@/app/model/group/group.model";
import { LikeBookModel } from "@/app/model/group/book.model";
import { LikeRoomModel } from "@/app/model/user/users.model";


interface LikeItemProps {
    id: number;
    title: string;
    type: "게시글" | "도서" | "장소";
    onDetail: (id: number) => void;
    onDislike: (id: number) => void;
}

const LikeItem = ({ id, title, type, onDetail, onDislike }: LikeItemProps) => (
    <li className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex justify-between items-center space-x-4">
        <p
            className="font-semibold text-lg text-gray-800 truncate cursor-pointer"
            onClick={() => onDetail(id)}
        >
            {title}
        </p>
        <div className="flex space-x-4">
            <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => onDislike(id)}
            >
                좋아요 취소
            </button>
        </div>
    </li>
);

export default function LikeList() {
    const [activeTab, setActiveTab] = useState<"게시글" | "도서" | "장소">("게시글");
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [likeData, setLikeData] = useState<{ id: number; title: string }[]>([]);

    // Redux 상태 가져오기
    const likedPosts = useSelector(getLikedPosts);
    const likedRooms = useSelector(getLikedRooms);
    const likedBooks = useSelector(getLikedBooks);
    const nickname = useSelector(getNickname);
    const addresses = useSelector(getAddresses);

    useEffect(() => {
        switch (activeTab) {
            case "게시글":
                setLikeData(
                    likedPosts
                        .filter((post) => post.id !== undefined) // undefined 필터링
                        .map((post) => ({ id: post.id as number, title: post.title }))
                );
                break;
            case "도서":
                setLikeData(
                    likedBooks
                        .filter((book) => book.id !== undefined) // undefined 필터링
                        .map((book) => ({ id: book.id as number, title: book.title }))
                );
                break;
            case "장소":
                setLikeData(
                    likedRooms
                        .filter((room) => room.id !== undefined) // undefined 필터링
                        .map((room) => ({ id: room.id as number, title: room.name }))
                );
                break;
            default:
                setLikeData([]);
        }
    }, [activeTab, dispatch]);



    const handleDetail = (id: number) => {
        switch (activeTab) {
            case "게시글":
                const post = likedPosts.find((item) => item.id === id);
                post && dispatch(saveCurrentGroupPost(post));
                router.push(`/groups/board/detail/${id}`);
                break;
            case "도서":
                const book = likedBooks.find((item) => item.id === id);
                book && dispatch(saveCurrentBook(book));
                router.push(`/books/${id}`);
                break;
            case "장소":
                const room = likedRooms.find((item) => item.id === id);
                if (room) {
                    dispatch(saveCurrentRoom(room));
                    dispatch(saveCurrentAddress(addresses.find(({ roomId }) => roomId === id) ?? null));
                    router.push(`/rooms/${id}`);
                }
                break;
        }
    };

    const handleDislike = (id: number) => {
        if (!nickname) return;
        switch (activeTab) {
            case "게시글":
                const likePostModel: LikePostModel = {
                    postId: id,
                    nickname: nickname
                };
                likePostService.drop(likePostModel, dispatch)
                break;
            case "도서":
                const likeBookModel: LikeBookModel = {
                    id: id,
                    nickname: nickname
                };
                likeBookService.drop(likeBookModel, dispatch)
                break;
            case "장소":
                const likeRoomModel: LikeRoomModel = {
                    roomId: id,
                    nickname: nickname
                };
                likeRoomService.drop(likeRoomModel, dispatch)
                break;
            default:
                break;
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">

            <div className="bg-green-50 py-8 rounded-lg text-center">
                <h1 className="text-lg font-bold">좋아요 목록</h1>
            </div>

            <div className="my-6">
                <div className="flex justify-center space-x-4 mb-8">
                    {["게시글", "도서", "장소"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 rounded-lg font-semibold ${activeTab === tab ? "bg-green-500 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => setActiveTab(tab as any)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <ul className="bg-green-50 p-8 rounded-lg">
                    {likeData.length > 0 ? (
                        likeData.map(({ id, title }) => (
                            <LikeItem
                                key={id}
                                id={id!}
                                title={title}
                                type={activeTab}
                                onDetail={handleDetail}
                                onDislike={handleDislike}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">좋아요한 {activeTab}이 없습니다.</p>
                    )}
                </ul>
            </div>

            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-full px-6 py-3 text-sm font-medium text-black border border-gray-200 hover:bg-gray-200 transition"
                >
                    뒤로가기
                </button>
            </div>
        </div>
    );
}
