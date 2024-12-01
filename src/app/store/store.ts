"use client";

import { configureStore } from "@reduxjs/toolkit";
import budgetReducer, { BudgetState } from "./budgetSlice";
import signupReducer, { SignupState } from "./SignupSlice";
import signinReducer, { SigninState } from "./SigninSlice";
import dashboardReducer, { DashboardState} from "./dashboardSlice";

export interface RootState {
    signup: SignupState;
    signin: SigninState;
    budget: BudgetState;
    dashboard: DashboardState;
}

export const store = configureStore({
    reducer: {
        budget: budgetReducer,
        signup: signupReducer,
        signin: signinReducer,
        dashboard: dashboardReducer,
    },
});

export type AppDispatch = typeof store.dispatch;