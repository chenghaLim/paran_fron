import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserState, UserModel } from "../../../app/model/user/user.model"
import { RootState } from '@/lib/store';

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    saveCurrentUser: (state, action: PayloadAction<any>) => {
      console.log('saveCurrentUser 에서 실행중:', action.payload);
      state.currentUser = action.payload;
    },
    saveNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    saveUsers: (state, action: PayloadAction<UserModel[]>) => {
      console.log('saveUsers 에서 실행중:', action.payload);
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<UserModel>) => {
      console.log('addUser 에서 실행중:', action.payload);
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<UserModel>) => {
      console.log('updateUser 에서 실행중:', action.payload);
      const index = state.users.findIndex(user => user.nickname === action.payload.nickname);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      console.log('deleteUser에서 실행중:', action.payload);
      state.users = state.users.filter(user => user.nickname !== action.payload);
    },
    saveLoading: (state, action: PayloadAction<boolean>) => {
      console.log('saveLoading에서 실행중:', action.payload);
      state.isLoading = action.payload;
    },
    saveError: (state, action: PayloadAction<string | null>) => {
      console.log('saveError 에서 실행중:', action.payload);
      state.error = action.payload;
    },
    saveUserList: (state, action: PayloadAction<UserModel[]>) => {
      console.log('saveUserList에서 실행중 :', action.payload);
      state.users = action.payload;
    },
    saveUserDetail: (state, action: PayloadAction<UserModel>) => {
      console.log('saveUserDetail 에서 실행중:', action.payload);
      state.currentUser = action.payload;
    },
    saveUserRole: (state, action: PayloadAction<{ nickname: string; role: string }>) => {
      console.log('saveUserRole 에서 실행중:', action.payload);
      const index = state.users.findIndex(user => user.nickname === action.payload.nickname);
      if (index !== -1) {
        state.users[index].role = action.payload.role;
      }
    },
    logoutUser: (state, action: PayloadAction<string>) => {
      console.log('logoutUser 에서 실행중:', action.payload);
      const index = state.users.findIndex(user => user.nickname === action.payload)
      if (index !== -1) {
        state.users[index].logoutAt = new Date().toISOString()
      }
    },
    saveSuccess: (state, action: PayloadAction<string>) => {
      console.log('saveSuccess 에서 실행중:', action.payload)
      state.successMessage = action.payload
    },
  }
});

export const getCurrentUser = (state: RootState) => state.user.currentUser
export const getUsers = (state:  RootState) => state.user.users
export const getNickname = (state: RootState) => state.user.nickname
export const getIsLoading = (state: RootState) => state.user.isLoading
export const getUserList = (state: RootState) => state.user.users 
export const getError = (state:  RootState) => state.user.error

// 액션 생성자들을 export
export const {
  saveCurrentUser,
  saveUsers,
  saveNickname,
  addUser,
  updateUser,
  deleteUser,
  saveLoading,
  saveError,
  saveUserList,
  saveUserDetail,
  saveUserRole,
  logoutUser,
  saveSuccess,
} = userSlice.actions;

// 리듀서를 export
export default userSlice.reducer;