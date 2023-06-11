import { createSlice } from "@reduxjs/toolkit";

export interface widthHeightType {
    width: number,
    height: number,
};

const initialState:widthHeightType = {
    width: 0,
    height: 0,
};

const widthHeight = createSlice({
    name:"width_height_provider",
    initialState,
    reducers:{
        updateWidthHeight: (state)=>{
            state.width = window.innerWidth;
            state.height = window.innerHeight;
        },
    }
});

export default widthHeight.reducer;
export const { updateWidthHeight } = widthHeight.actions;