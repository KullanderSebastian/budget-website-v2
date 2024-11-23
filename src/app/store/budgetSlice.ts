"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BudgetState {
    income: number;
    expenses: Record<string, number>;
};

const initialState: BudgetState = {
    income: 0,
    expenses: {},
};

const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        setIncome: (state, action: PayloadAction<number>) => {
            state.income = action.payload;
        },
        setExpense: (state, action: PayloadAction<{ category: string; amount: number }>) => {
            const { category, amount } = action.payload;
            state.expenses[category] = amount;
        },
    },
});

export const { setIncome, setExpense } = budgetSlice.actions;

export default budgetSlice.reducer;