import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@store/slices/global.slice"

export const appStore = configureStore({
    reducer: {
        global: globalReducer
    }
})