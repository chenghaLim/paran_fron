"use Client"
import React from "react";
import Image from "next/image";
import { saveCurrentBook } from "@/lib/features/group/book.slice";
import { BookResponseModel } from "@/app/model/group/book.model";
import { FileModel } from "@/app/model/file/file.model";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { saveCurrentFile } from "@/lib/features/file/file.slice";

interface BookCardProps {
    book: BookResponseModel;
    active: boolean;
    file: FileModel;
}

const BookCard = ({ book, active, file }: BookCardProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onClickToDetail = () => {
        dispatch(saveCurrentBook(book));
        dispatch(saveCurrentFile(file));
        router.push(`/books/${book.id}`);
    };

    return (
        <li className="list-none">
            <div
                className={`max-w-80 rounded-lg border border-gray-200 bg-white shadow ${active ? 'ring-2 ring-green-500' : ''}`}>
                <Image
                    width={260}
                    height={210}
                    className="w-80 h-40 cursor-pointer rounded-t-lg object-cover"
                    src={file.path === process.env.NEXT_PUBLIC_IMAGE_DEFAULT ? process.env.NEXT_PUBLIC_IMAGE_DEFAULT : `http://localhost:8000/api/files?path=${file.path}`}
                    alt={`cover of ${book.title}`}
                    priority

                />
                <div className="p-5">
                    <h5 className={`mb-2 text-lg font-medium tracking-tight ${active ? "text-green-600" : "text-gray-900"} cursor-pointer dark:text-white`}>
                        {book.title}
                    </h5>
                    <p className="text-sm font-medium">저자: {book.author}</p>
                    <div className="w-full">
                        <span className="my-4 rounded-full bg-green-400 p-1 text-xs text-white">
                            {book.categoryName}
                        </span>
                    </div>
                    <button
                        onClick={onClickToDetail}
                        className="mt-5 inline-flex w-full items-center rounded-lg bg-green-600 p-3 text-sm font-medium text-white hover:bg-green-700"
                    >
                        상세보기
                        <svg
                            className="ms-2 size-4 rtl:rotate-180"
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
                </div>
            </div>
        </li>
    );
};

export default BookCard;