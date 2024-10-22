// errorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialErrorState, ExceptionResponseModel } from '../../app/model/error.model';
import { RootState } from '../store';

const errorSlice = createSlice({
    name: 'error',
    initialState: initialErrorState,
    reducers: {
        saveCurrentError: (state, action: PayloadAction<ExceptionResponseModel>) => {
            state.currentError = action.payload;
            state.isError = action.payload !== null;
            if (action.payload) {
                state.errorHistory.push(action.payload);
            }
        },
        clearCurrentError: (state) => {
            state.currentError = {} as ExceptionResponseModel;
            state.isError = false;
        },
        addToErrorHistory: (state, action: PayloadAction<ExceptionResponseModel>) => {
            state.errorHistory.push(action.payload);
        },
        clearErrorHistory: (state) => {
            state.errorHistory = [];
        },
        saveIsError: (state, action: PayloadAction<boolean>) => {
            state.isError = action.payload;
        },
        saveGlobalLoading: (state, action: PayloadAction<boolean>) => {
            state.isGlobalLoading = action.payload;
        },
        saveGlobalError: (state, action: PayloadAction<string | null>) => {
            state.globalerror = action.payload;
        },
    },
});

export const getError = (state: RootState) => { state.error.currentError, state.error.isError }
export const getClearError = (state: RootState) => { state.error.currentError, state.error.isError }
export const getAddToError = (state: RootState) => state.error.errorHistory
export const getErrorHistory = (state: RootState) => state.error.errorHistory
export const getSaveError = (state: RootState) => state.error.isError

export const {
    saveCurrentError,
    clearCurrentError,
    addToErrorHistory,
    clearErrorHistory,
    saveIsError,
    saveGlobalLoading,
    saveGlobalError
} = errorSlice.actions;

export default errorSlice.reducer;