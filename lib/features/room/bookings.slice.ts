// bookingSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialBookingState, BookingModel } from '../../../app/model/room/bookings.model';
import { RootState } from '../../store'

const bookingSlice = createSlice({
    name: 'booking',
    initialState: initialBookingState,
    reducers: {
        saveBookings: (state, action: PayloadAction<BookingModel[]>) => {
            state.bookings = action.payload;
        },
        addBooking: (state, action: PayloadAction<BookingModel>) => {
            state.bookings.push(action.payload);
        },
        updateBooking: (state, action: PayloadAction<BookingModel>) => {
            const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
            if (index !== -1) {
                state.bookings[index] = action.payload;
            }
        },
        deleteBooking: (state, action: PayloadAction<number>) => {
            state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
        },
        saveCurrentBooking: (state, action: PayloadAction<BookingModel | null>) => {
            state.currentBooking = action.payload;
        },
        saveLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        saveError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const getBookings = (state: RootState) => state.bookings.bookings;
export const getCurrentBooking = (state: RootState) => state.bookings.currentBooking;
export const getIsLoading = (state: RootState) => state.bookings.isLoading;
export const getError = (state: RootState) => state.bookings.error;


export const {
    saveBookings,
    addBooking,
    updateBooking,
    deleteBooking,
    saveCurrentBooking,
    saveLoading,
    saveError,
} = bookingSlice.actions;

export default bookingSlice.reducer;