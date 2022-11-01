import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
    name: "input",
    initialState: {
        value: "aaa",
    },
    reducers: {
        onChange: (initialState, action) => {
            initialState.value = action.payload
        }
    }
})

export const { onChange } = inputSlice.actions;
export default inputSlice.reducer;
