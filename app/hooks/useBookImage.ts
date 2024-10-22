import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const useBookImage = (bookId: number) => {
  const files = useSelector((state: RootState) => state.file.bookFiles);
  
  const bookFile = files.find(file => file.refId === bookId);
  return bookFile 
    ? `${process.env.NEXT_PUBLIC_FILE_URL}/one?path=${bookFile.path}` 
    : process.env.NEXT_PUBLIC_IMAGE_DEFAULT;
};