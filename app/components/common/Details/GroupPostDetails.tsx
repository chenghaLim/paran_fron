"use client"
import { useSelector } from "react-redux";
import { getCurrentGroupPost } from "@/lib/features/group/group.slice";
import DetailButton from "./DetailButton";
import { useEffect, useState } from "react";
import { fileService } from "@/app/service/file/file.service";
import { FileType } from "@/app/model/file/file.model";

export default function GroupPostDetails() {
    const post = useSelector(getCurrentGroupPost)
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    useEffect(() => {
        const loadImage = async () => {
            if (!post) return; // post가 없으면 실행 중단

            const url = await fileService.findByRefId(post.id, FileType.GROUP_POST);
            console.log("url: ", url)
            if (url.size > 0) {
                setImageUrl(URL.createObjectURL(url)); // Blob URL을 상태에 저장
            } else {
                setImageUrl(null);
            }
        };

        loadImage();
    }, [post])

    return (
        <>
            <div className="mx-auto my-20 max-w-4xl bg-green-100 p-4">
                <div className="rounded-lg bg-white py-4">
                    <h1 className="text-center text-lg font-semibold">{post?.title || "글 제목"}</h1>
                </div>
                <div>
                    <h3 className="mx-4 my-4 font-medium text-base">작성자 : {post?.nickname}</h3>
                </div>
                <div className="flex justify-between items-center border-y-2 py-2 border-dotted border-green-500">
                    <h3 className="mx-4 font-sm text-sm">작성일: {formatDate(post?.createAt ?? "2024-01-01T00:00:00")}</h3>
                    <h3 className="mx-4 font-sm text-sm">조회수: {post?.viewCount}</h3>
                </div>
                <div>
                    <h3 className="m-4 font-medium text-sm">게시판 분류: {post?.postCategory}</h3>
                </div>
                <div className="border-t-2 border-dotted border-green-500 py-6">
                     <h3 className="m-4 font-medium text-base">내용:</h3>
                    {imageUrl && imageUrl.length > 0 && (<img src={imageUrl} alt="포스트 이미지" className="rounded-lg shadow-md" />)}
                    
                    {post?.bookId && (
                        <div className="mb-4">
                            <p className="text-base">책 제목: {post?.bookTitle}</p>
                        </div>
                    )}
                    <div className="rounded-lg bg-white p-4 text-base">{post?.content}</div>
                </div>
            </div>
            <div className="mx-auto max-w-4xl">
                <DetailButton thisPage={`/groups/board/detail`} displayBoard="block" displayReview="none" displayReservation="block" displayComment="block" />
            </div>
        </>
    )
}