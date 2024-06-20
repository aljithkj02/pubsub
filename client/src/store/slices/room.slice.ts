import { createSlice } from "@reduxjs/toolkit";
import { Room } from "@src/services/types";

export interface RoomInitialState {
    selectedRoom: Room | null;
}

const initialState: RoomInitialState = {
    selectedRoom: null
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setSelectedRoom: (state, action) => {
            state.selectedRoom = action.payload;
        }
    } 
})

export default roomSlice.reducer;
export const { setSelectedRoom } = roomSlice.actions;