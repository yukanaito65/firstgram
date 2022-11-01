import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./inputSlicer";

export const store =configureStore({
    reducer: {
        input: inputSlice,
    },
});
