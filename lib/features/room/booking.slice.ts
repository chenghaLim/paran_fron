// bookingSlice.ts

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialBookingState, BookingModel } from '../../../app/model/room/bookings.model';
import { RootState } from '../../store'

const bookingSlice = createSlice({
    name: 'booking',
    initialState: initialBookingState,
    reducers: {
        saveBookings: (state, action: PayloadAction<BookingModel[]>) => {
            state.bookings = action.payload;
        },
        saveSeperatedBookings: (state, action: PayloadAction<BookingModel[]>) => {
            state.enabledBookings = action.payload.filter(booking => booking.enabled);
            state.notEnabledBookings = action.payload.filter(booking => !booking.enabled);
        },
        addBooking: (state, action: PayloadAction<BookingModel>) => {
            state.bookings.push(action.payload);
        },
        addEnabledBooking: (state, action: PayloadAction<BookingModel>) => {
            state.enabledBookings.push(action.payload);
        },
        updateBooking: (state, action: PayloadAction<BookingModel>) => {
            const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
            if (index !== -1) {
                state.bookings[index] = action.payload;
            }
        },
        removeBooking: (state, action: PayloadAction<number>) => {
            state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
        },
        removeNotEnabledBooking: (state, action: PayloadAction<number>) => {
            state.notEnabledBookings = state.notEnabledBookings.filter(booking => booking.id !== action.payload);
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

export const getSeperatedBookings = createSelector(
    (state: RootState) => state.bookings.enabledBookings,
    (state: RootState) => state.bookings.notEnabledBookings,
    (enabledBookings, notEnabledBookings) => ({
        enabledBookings,
        notEnabledBookings
    })
)

export const getBookings = (state: RootState) => state.bookings.bookings;
export const getCurrentBooking = (state: RootState) => state.bookings.currentBooking;
export const getIsLoading = (state: RootState) => state.bookings.isLoading;
export const getError = (state: RootState) => state.bookings.error;


export const {
    saveBookings,
    addBooking,
    updateBooking,
    removeBooking,
    removeNotEnabledBooking,
    saveSeperatedBookings,
    saveCurrentBooking,
    saveLoading,
    saveError,
} = bookingSlice.actions;

export default bookingSlice.reducer;