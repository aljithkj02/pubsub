import { configureStore } from "@reduxjs/toolkit";
import globalReducer, { GlobalInitialState } from "@store/slices/global.slice"

export const appStore = configureStore({
    reducer: {
        global: globalReducer
    }
})

export type StateType = {
    global: GlobalInitialState
}