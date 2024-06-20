import { configureStore } from "@reduxjs/toolkit";
import globalReducer, { GlobalInitialState } from "@store/slices/global.slice"
import roomReducer, { RoomInitialState } from "@store/slices/room.slice"

export const appStore = configureStore({
    reducer: {
        global: globalReducer,
        room: roomReducer
    }
})

export type StateType = {
    global: GlobalInitialState,
    room: RoomInitialState
}