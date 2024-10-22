// addressSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialAddressState, AddressModel} from '../../../app/model/room/address.model';
import { RootState } from '@/lib/store';

const addressSlice = createSlice({
    name: 'address',
    initialState: initialAddressState,
    reducers: {
        saveAddresses: (state, action: PayloadAction<AddressModel[]>) => {
            state.addresses = action.payload;
        },
        addAddress: (state, action: PayloadAction<AddressModel>) => {
            state.addresses.push(action.payload);
        },
        updateAddress: (state, action: PayloadAction<AddressModel>) => {
            const index = state.addresses.findIndex(address => address.id === action.payload.id);
            if (index !== -1) {
                state.addresses[index] = action.payload;
            }
        },
        deleteAddress: (state, action: PayloadAction<number>) => {
            state.addresses = state.addresses.filter(address => address.id !== action.payload);
        },
        saveCurrentAddress: (state, action: PayloadAction<AddressModel | null>) => {
            state.currentAddress = action.payload;
        },
        saveLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        saveError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const getAddresses = (state: RootState) => state.address.addresses;
export const getCurrentAddress = (state: RootState) => state.address.currentAddress;
export const getIsLoading = (state: RootState) => state.address.isLoading;
export const getError = (state: RootState) => state.address.error;


export const {
    saveAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    saveCurrentAddress,
    saveLoading,
    saveError,
} = addressSlice.actions;

export default addressSlice.reducer;