"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TooltipState {
    showTooltip: boolean;
}

const initialState: TooltipState = {
    showTooltip: false,
};

const tooltipSlice = createSlice({
    name: "tooltip",
    initialState,
    reducers: {
        setShowTooltip: (state, action: PayloadAction<boolean>) => {
            state.showTooltip = action.payload;
        },
        toggleTooltip: (state) => {
            state.showTooltip = !state.showTooltip;
        },
    }
});

export const {
    setShowTooltip,
    toggleTooltip
} = tooltipSlice.actions;

export default tooltipSlice.reducer;