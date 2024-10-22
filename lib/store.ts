import { configureStore } from '@reduxjs/toolkit'
import fileSlice from './features/file/file.slice'
import roomSlice from './features/room/room.slice'
import addressSlice from './features/room/address.slice'
import accountSlice from './features/room/account.slice'
import reviewSlice from './features/room/review.slice'
import bookingsSlice from './features/room/booking.slice'
import { useDispatch } from "react-redux"
import userSlice from './features/users/user.slice'
import errorSlice from './features/error.slice'
import commentSlice from './features/comment/comment.slice'
import chatSlice from './features/chat/chat.slice'
import bookSlice from './features/group/book.slice'
import dataSlice from './features/data.slice'
import adminPostSlice from './features/users/adminPost.slice'
import declarationPostSlice from './features/users/declarationPost.slice'
import friendSlice from './features/users/friend.slice'
import groupSlice from '@/lib/features/group/group.slice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      adminPost: adminPostSlice,
      declarationPost: declarationPostSlice,
      friend: friendSlice,
      file: fileSlice,
      room: roomSlice,
      address: addressSlice,
      account: accountSlice,
      review: reviewSlice,
      group: groupSlice,
      bookings: bookingsSlice,
      error: errorSlice,
      comment: commentSlice,
      chat: chatSlice,
      book: bookSlice,
      data: dataSlice,
    },
  })
}

// 스토어 타입을 정의합니다.
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch