import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    loading: boolean;
}

const initialState: InitialState = {
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