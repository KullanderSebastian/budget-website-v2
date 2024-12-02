"use client";

import { configureStore } from "@reduxjs/toolkit";
import signupReducer, { SignupState } from "./SignupSlice";
import signinReducer, { SigninState } from "./SigninSlice";
import dashboardReducer, { DashboardState } from "./dashboardSlice";
import budgetStateReducer, { BudgetState } from "./BudgetStateSlice";

export interface RootState {
    signup: SignupState;
    signin: SigninState;
    dashboard: DashboardState;
    budgetState: BudgetState
}

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signin: signinReducer,
        dashboard: dashboardReducer,
        budgetState: budgetStateReducer,
    },
});

export type AppDispatch = typeof store.dispatch;