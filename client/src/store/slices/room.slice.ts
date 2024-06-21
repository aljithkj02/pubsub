import { createSlice } from "@reduxjs/toolkit";
import { Room } from "@src/services/types";

export interface RoomInitialState {
    selectedRoom: Room | null;
    refetch: boolean;
}

const initialState: RoomInitialState = {
    selectedRoom: null,
    refetch: false
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setSelectedRoom: (state, action) => {
            state.selectedRoom = action.payload;
        },
        handleRefetch: (state) => {
            state.refetch = !state.refetch;
        }
    } 
})

export default roomSlice.reducer;
export const { setSelectedRoom, handleRefetch } = roomSlice.actions;