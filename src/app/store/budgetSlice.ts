"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BudgetState {

}

const initialState: BudgetState = {

};

const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        
    },
});

export const {  } = budgetSlice.actions;

export default budgetSlice.reducer;