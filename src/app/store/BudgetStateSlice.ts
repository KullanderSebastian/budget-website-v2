"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BudgetState {
    budgetState: number;
}

const initialState: BudgetState = {
    budgetState: 0,
};

const budgetStateSlice = createSlice({
    name: "budgetState",
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<number>) => {
            state.budgetState = action.payload;
        },
        onNext: (state) => {
            state.budgetState += 1;
        },
        onPrev: (state) => {
            state.budgetState = Math.max(0, state.budgetState - 1);
        }
    },
});

export const { setState, onNext, onPrev } = budgetStateSlice.actions;

export default budgetStateSlice.reducer;