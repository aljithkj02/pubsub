import { createSlice } from "@reduxjs/toolkit";

export interface GlobalInitialState {
    loading: boolean;
}

const initialState: GlobalInitialState = {
    loading: false
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    } 
})

export default globalSlice.reducer;
export const { setLoading } = globalSlice.actions;