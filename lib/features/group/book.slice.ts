import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { BookResponseModel, initialBookState} from '@/app/model/group/book.model';

export const bookSlice = createSlice({
  name: 'book',
  initialState: initialBookState,
  reducers: {
    saveBooks: (state, action: PayloadAction<BookResponseModel[]>) => {
      state.books = action.payload;
    },
    saveLikedBooks: (state, action: PayloadAction<BookResponseModel[]>) => {
      state.likedBooks = action.payload;
    },
    addLikedBook: (state, action: PayloadAction<BookResponseModel>) => {
      state.likedBooks.push(action.payload);
    },
    deleteLikedBook: (state, action: PayloadAction<number>) => {
      state.likedBooks = state.likedBooks.filter(likedBook => likedBook.id !== action.payload);
    },
    saveCurrentBook: (state, action: PayloadAction<BookResponseModel | null>) => {
      state.currentBook = action.payload;
    },
    saveTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
    saveLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    saveError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
   
  }
});

// Selector 함수들
export const getBooks = (state: RootState) => state.book.books;
export const getCurrentBook = (state: RootState) => state.book.currentBook;
export const getIsLoading = (state: RootState) => state.book.isLoading;
export const getError = (state: RootState) => state.book.error;
export const getLikedBooks = (state: RootState) => state.book.likedBooks;
export const getIsBookLiked = createSelector(
  [getLikedBooks, (_, bookId) => bookId],
  (likedBooks, bookId) => likedBooks.some(likedBook => likedBook.id === bookId)
);
export const getTotalPage = (state: RootState) => state.book.totalPage;

export const {
  saveBooks,
  addLikedBook,
  saveCurrentBook,
  saveLikedBooks,
  deleteLikedBook,
  saveTotalPage,
  saveLoading,
  saveError
} = bookSlice.actions;

export default bookSlice.reducer;
