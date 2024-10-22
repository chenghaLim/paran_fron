// bookingTypes.ts
export interface BookingModel {
  id?: number;
  enabled: boolean;
  date: string;
  usingTime: string[]; //HH:00 형식
  roomId: number;
  groupId: number;
}

// 상태 인터페이스 정의
export interface BookingState {
  bookings: BookingModel[];
  enabledBookings: BookingModel[];
  notEnabledBookings: BookingModel[];
  currentBooking: BookingModel | null;
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
export const initialBookingState: BookingState = {
  bookings: [],
  enabledBookings: [],
  notEnabledBookings: [],
  currentBooking: null,
  isLoading: false,
  error: null
};