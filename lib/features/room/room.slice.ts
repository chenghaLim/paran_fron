import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialRoomState, RoomModel } from '../../../app/model/room/room.model';
import { RootState } from '../../store';

export const roomSlice = createSlice({
    name: 'room',
    initialState: initialRoomState,
    reducers: {
        saveRooms: (state, action: PayloadAction<RoomModel[]>) => {
            state.rooms = action.payload;
        },
        saveRoomsMap: (state, action: PayloadAction<RoomModel[]>) => {
            state.roomsMap = action.payload;
        },
        saveDisableRooms: (state, action: PayloadAction<RoomModel[]>) => {
            state.disabledRooms = action.payload;
        },
        saveDisableRoomByNickname: (state, action: PayloadAction<RoomModel[]>) => {
            state.disabledRoomByNickname = action.payload;
        },
        saveEnabledRoomByNickanme: (state, action: PayloadAction<RoomModel[]>) => {
            state.enabledRoomByNickname = action.payload;
        },
        saveLikedRooms: (state, action: PayloadAction<RoomModel[]>) => {
            state.roomsLiked = action.payload
        },
        saveSeperatedRooms: (state, action: PayloadAction<RoomModel[]>) => {
            state.enabledrooms = action.payload.filter(room => room.enabled);
            state.notEnabledrooms = action.payload.filter(room => !room.enabled);
        },
        saveCurrentRoom: (state, action: PayloadAction<RoomModel | null>) => {
            state.currentRoom = action.payload;
        },
        saveLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        saveError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addRoom: (state, action: PayloadAction<RoomModel>) => {
            state.rooms.push(action.payload)
        },
        addRoomMap: (state, action: PayloadAction<RoomModel>) => {
            state.roomsMap.push(action.payload)
        },
        addEnabledRoomByNickname: (state, action: PayloadAction<RoomModel>) => {
            state.enabledRoomByNickname.push(action.payload)
        },
        addDisabledRoomByNickname: (state, action: PayloadAction<RoomModel>) => {
            state.disabledRoomByNickname.push(action.payload)
        },
        addDisabledRoom: (state, action: PayloadAction<RoomModel>) => {
            state.disabledRooms.push(action.payload)
        },
        addLikedRoom: (state, action: PayloadAction<RoomModel>) => {
            state.roomsLiked.push(action.payload);
        },
        addEnabledRoom: (state, action: PayloadAction<RoomModel>) => {
            state.enabledrooms.push(action.payload);
        },
        updateRoom: (state, action: PayloadAction<RoomModel>) => {
            const index = state.rooms.findIndex(room => room.id === action.payload.id)
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        },
        updateRoomMap: (state, action: PayloadAction<RoomModel>) => {
            const index = state.roomsMap.findIndex(room => room.id === action.payload.id)
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        },
        updateEnableRoomByNickname: (state, action: PayloadAction<RoomModel>) => {
            const index = state.enabledRoomByNickname.findIndex(room => room.id === action.payload.id)
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        },
        updateDisabledRoomByNickname: (state, action: PayloadAction<RoomModel>) => {
            const index = state.disabledRoomByNickname.findIndex(room => room.id === action.payload.id)
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        },
        updateDisabledRoom: (state, action: PayloadAction<RoomModel>) => {
            const index = state.disabledRooms.findIndex(room => room.id === action.payload.id)
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        },
        removeRoom: (state, action: PayloadAction<number>) => {
            state.rooms.filter(room => room.id !== action.payload)
        },
        removeRoomMap: (state, action: PayloadAction<number>) => {
            state.roomsMap.filter(room => room.id !== action.payload)
        },
        removeEnabledRoomByNickname: (state, action: PayloadAction<number>) => {
            state.enabledRoomByNickname.filter(room => room.id !== action.payload)
        },
        removeDisabledRoomByNickname: (state, action: PayloadAction<number>) => {
            state.disabledRoomByNickname.filter(room => room.id !== action.payload)
        },
        removeDisabledRoom: (state, action: PayloadAction<number>) => {
            state.disabledRooms.filter(room => room.id !== action.payload)
        },
        removeNotEnabledRoom: (state, action: PayloadAction<number>) => {
            state.notEnabledrooms.filter(room => room.id !== action.payload)
        },
        removeLikedRoom: (state, action: PayloadAction<number>) => {
            state.roomsLiked.filter(room => room.id !== action.payload)
        }
    },
});

// Selector 함수들
export const getSeperatedRooms = createSelector(
    (state: RootState) => state.room.enabledrooms,
    (state: RootState) => state.room.notEnabledrooms,
    (enabledrooms, notEnabledrooms) => ({
        enabledrooms,
        notEnabledrooms
    })
)
export const getRooms = (state: RootState) => state.room.rooms;
export const getRoomsMap = (state: RootState) => state.room.roomsMap;
export const getEnabledRoomByNickname = (state: RootState) => state.room.enabledRoomByNickname;
export const getDisabledRoomByNickname = (state: RootState) => state.room.disabledRoomByNickname;
export const getDisabledRooms = (state: RootState) => state.room.disabledRooms;
export const getLikedRooms = (state: RootState) => state.room.roomsLiked;
export const getCurrentRoom = (state: RootState) => state.room.currentRoom;
export const getIsLoading = (state: RootState) => state.room.isLoading;
export const getError = (state: RootState) => state.room.error;

// 액션 생성자들을 export
export const {
    saveRooms,
    saveRoomsMap,
    saveDisableRooms,
    saveEnabledRoomByNickanme,
    saveDisableRoomByNickname,
    saveLikedRooms,
    saveSeperatedRooms,
    saveCurrentRoom,
    saveLoading,
    saveError,
    addRoom,
    addRoomMap,
    addDisabledRoom,
    addDisabledRoomByNickname,
    addEnabledRoomByNickname,
    updateRoom,
    updateRoomMap,
    updateDisabledRoom,
    updateDisabledRoomByNickname,
    updateEnableRoomByNickname,
    removeRoom,
    removeRoomMap,
    addLikedRoom,
    removeLikedRoom,
    removeDisabledRoom,
    removeDisabledRoomByNickname,
    removeEnabledRoomByNickname,
    removeNotEnabledRoom,
} = roomSlice.actions;

// 리듀서를 export
export default roomSlice.reducer;