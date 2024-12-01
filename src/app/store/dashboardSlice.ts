"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
    isLoading: boolean;
}

const initialState: DashboardState = {
    isLoading: true,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
});

export const {
    setIsLoading
} = dashboardSlice.actions;

export default dashboardSlice.reducer;