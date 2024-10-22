"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";
import { getBooks, getIsLoading, getError, getTotalPage } from "@/lib/features/group/book.slice";
import { useAppDispatch } from "@/lib/store";
import { defaultFile, FileType } from "@/app/model/file/file.model";
import { bookService } from "@/app/service/group/book.service";
import { getFiles } from "@/lib/features/file/file.slice";
import LoadingSpinner from "../status/LoadingSpinner";
import ErrorMessage from "../status/ErrorMessage";
import Pagination from "./pagination/Pagination";

interface BookRowProps {
  active: boolean;
  onSelect: () => void;
}

export default function BookRow({ active, onSelect }: BookRowProps) {
  const dispatch = useAppDispatch();
  const books = useSelector(getBooks);
  const files = useSelector(getFiles);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const totalItems = 10 // 임의값임 바꿔야함.

  useEffect(() => {
    bookService.findList(page, pageSize, dispatch)
  }, [page, pageSize, dispatch])

   const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(0);
  };

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <>
      <div className="w-[92%] mb-4 ml-4 grid grid-cols-4 gap-8 md:grid-cols-3">
        {books.map((book, index) => (
          <BookCard
            key={index}
            book={book}
            active={active}
            file={files.bookFiles.find(file => file.refId === book.id) ?? defaultFile(FileType.BOOK, book.id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
};