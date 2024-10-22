import { ChatRoomModel, initialChatState } from '@/app/model/chat/chat.model';
import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const chatSlice = createSlice({
    name: 'chat',
    initialState: initialChatState,
    reducers: {
        saveCurrentChatRoom: (state, action: PayloadAction<ChatRoomModel>) => {
            state.currentRoom = action.payload;
        },
        saveLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        saveError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const getCurrentChatRoom = (state: RootState) => state.chat.currentRoom;
export const getIsLoading = (state: RootState) => state.chat.isLoading;
export const getError = (state: RootState) => state.chat.error;


export const {
    saveCurrentChatRoom,
    saveLoading,
    saveError,
} = chatSlice.actions;

export default chatSlice.reducer;
