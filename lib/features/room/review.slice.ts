// reviewSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewModel, ReviewUpdateModel, initialReviewState } from '../../../app/model/room/review.model';
import { RootState } from '../../store';

// createSlice를 사용하여 slice 생성
const reviewSlice = createSlice({
    name: 'review',
    initialState: initialReviewState,
    reducers: {
        saveReviews: (state, action: PayloadAction<ReviewModel[]>) => {
            state.reviews = action.payload;
        },
        addReview: (state, action: PayloadAction<ReviewModel>) => {
            state.reviews.push(action.payload);
        },
        updateReview: (state, action: PayloadAction<ReviewModel>) => {
            const index = state.reviews.findIndex(review => review.id === action.payload.id);
            if (index !== -1) {
                state.reviews[index] = action.payload;
            }
        },
        deleteReview: (state, action: PayloadAction<number>) => {
            state.reviews = state.reviews.filter(review => review.id !== action.payload);
        },
        saveCurrentReview: (state, action: PayloadAction<ReviewModel | null>) => {
            state.currentReview = action.payload;
        },
        saveLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        saveError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

// Selector 함수들
export const getReviews = (state: RootState) => state.review.reviews;
export const getCurrentReview = (state: RootState) => state.review.currentReview;
export const getIsLoading = (state: RootState) => state.review.isLoading;
export const getError = (state: RootState) => state.review.error;


// 액션 생성자들을 export
export const {
    saveReviews,
    addReview,
    updateReview,
    deleteReview,
    saveCurrentReview,
    saveLoading,
    saveError,
} = reviewSlice.actions;

// 리듀서를 export
export default reviewSlice.reducer;