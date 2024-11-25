"use client";

import { configureStore } from "@reduxjs/toolkit";
import budgetReducer, { BudgetState } from "./budgetSlice";
import signupReducer, { SignupState } from "./SignupSlice";

export interface RootState {
    signup: SignupState;
    budget: BudgetState;
}

export const store = configureStore({
    reducer: {
        budget: budgetReducer,
        signup: signupReducer,
    },
});

export type AppDispatch = typeof store.dispatch;