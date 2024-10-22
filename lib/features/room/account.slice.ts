import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialAccountState, AccountModel } from '../../../app/model/room/account.model'
import { RootState } from '@/lib/store';

const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: {
    saveAccounts: (state, action: PayloadAction<AccountModel[]>) => {
      state.accounts = action.payload;
    },
    addAccount: (state, action: PayloadAction<AccountModel>) => {
      state.accounts.push(action.payload);
    },
    addAccounts: (state, action: PayloadAction<AccountModel[]>) => {
      state.accounts.push(...action.payload);
    },
    saveCurrentAccount: (state, action: PayloadAction<AccountModel | null>) => {
      state.currentAccount = action.payload;
    },
    updateAccount: (state, action: PayloadAction<AccountModel>) => {
      state.accounts = state.accounts.map(account => account.orderId === action.payload.orderId ? action.payload : account);
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
export const getAccounts = (state: RootState) => state.account.accounts;
export const getCurrentAccount = (state: RootState) => state.account.currentAccount;
export const getIsLoading = (state: RootState) => state.account.isLoading;
export const getError = (state: RootState) => state.account.error;

// 액션 생성자들을 export
export const {
  saveAccounts,
  addAccount,
  addAccounts,
  saveCurrentAccount,
  saveLoading,
  saveError,
} = accountSlice.actions;

// 리듀서를 export
export default accountSlice.reducer;