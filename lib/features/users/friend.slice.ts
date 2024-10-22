import { initialUserState,FriendModel} from '@/app/model/user/users.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const friendSlice = createSlice({
    name: 'friend',
    initialState: initialUserState,
    reducers: {
        saveFriends: (state, action: PayloadAction<FriendModel[]>) => {
            state.friends =action.payload;
        },
        saveAlreadyFriends: (state, action: PayloadAction<FriendModel[]>) => {
            state.alreadyFriends = action.payload;
        },
        addAlreadyFriends: (state, action: PayloadAction<FriendModel>) => {
            state.alreadyFriends.push(action.payload);
        },
        saveRequestFriends: (state, action: PayloadAction<FriendModel[]>) => {
            state.requestFriends = action.payload;
        },  
        saveResponseFriends: (state, action: PayloadAction<FriendModel[]>) => {
            state.responseFriends = action.payload;
        },  
        addFriend: (state, action: PayloadAction<FriendModel>) => {
            state.friends.push(action.payload);
        },
        addRequsetFriend: (state, action: PayloadAction<FriendModel>) => {
            state.requestFriends.push(action.payload);
        },
        addResponseFriend: (state, action: PayloadAction<FriendModel>) => {
            state.responseFriends.push(action.payload);
        },
        deleteFriend: (state, action: PayloadAction<number>) => {
            state.friends = state.friends.filter(friend => friend.id !== action.payload);
        },
        deleteRequestFriend: (state, action: PayloadAction<number>) => {
            state.requestFriends = state.requestFriends.filter(friend => friend.id !== action.payload);
        },
        deleteResponseFriend: (state, action: PayloadAction<number>) => {
            state.responseFriends = state.responseFriends.filter(friend => friend.id !== action.payload);
        },
    }
});

export const getFriends = (state: RootState) => state.friend.friends;
export const getAlreadyFriends = (state: RootState) => state.friend.alreadyFriends;
export const getRequestFriends = (state: RootState) => state.friend.requestFriends;
export const getResponseFriends = (state: RootState) => state.friend.responseFriends;

export const {
    saveFriends,
    addFriend,
    deleteFriend,
    saveAlreadyFriends,
    saveRequestFriends,
    saveResponseFriends,
    addRequsetFriend,
    addResponseFriend,
    deleteRequestFriend,
    deleteResponseFriend,
    addAlreadyFriends
} = friendSlice.actions;

export default friendSlice.reducer;