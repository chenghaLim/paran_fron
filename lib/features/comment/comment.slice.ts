// commentSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CommentResponseModel, initialCommentState } from '@/app/model/comment/comment.model';
  

const commentSlice = createSlice({
    name: 'comment',
    initialState: initialCommentState,
    reducers: {
        saveLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        saveError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const getSaveLoading = (state: RootState) => state.comment.isLoading
export const getSaveError = (state: RootState) => state.comment.isLoading


export const {
    saveLoading,
    saveError,
} = commentSlice.actions;

export default commentSlice.reducer;
