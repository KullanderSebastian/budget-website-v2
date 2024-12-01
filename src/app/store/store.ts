"use client";

import { configureStore } from "@reduxjs/toolkit";
import budgetReducer, { BudgetState } from "./budgetSlice";
import signupReducer, { SignupState } from "./SignupSlice";
import signinReducer, { SigninState } from "./SigninSlice";

export interface RootState {
    signup: SignupState;
    signin: SigninState;
    budget: BudgetState;
}

export const store = configureStore({
    reducer: {
        budget: budgetReducer,
        signup: signupReducer,
        signin: signinReducer,
    },
});

export type AppDispatch = typeof store.dispatch;