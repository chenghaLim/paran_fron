import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  books: any[];
  groups: any[];
  rooms: any[];
  chats: any[];
}

const initialState: DataState = {
  books: [],
  groups: [],
  rooms: [],
  chats: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<any[]>) => {
      state.books = action.payload;
    },
    setGroups: (state, action: PayloadAction<any[]>) => {
      state.groups = action.payload;
    },
    setRooms: (state, action: PayloadAction<any[]>) => {
      state.rooms = action.payload;
    },
    setChats: (state, action: PayloadAction<any[]>) => {
      state.chats = action.payload;
    },
  },
});

export const { setBooks, setGroups, setRooms, setChats } = dataSlice.actions;

export default dataSlice.reducer;