"use client";

import { configureStore } from "@reduxjs/toolkit";
import signupReducer, { SignupState } from "./SignupSlice";
import signinReducer, { SigninState } from "./SigninSlice";
import dashboardReducer, { DashboardState } from "./dashboardSlice";
import budgetStateReducer, { BudgetState } from "./BudgetStateSlice";
import financesReducer, { FinancesState } from "./FinancesSlice";
import tooltipReducer, { TooltipState } from "./TooltipSlice";

export interface RootState {
    signup: SignupState;
    signin: SigninState;
    dashboard: DashboardState;
    budgetState: BudgetState;
    finances: FinancesState;
    tooltip: TooltipState;
}

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signin: signinReducer,
        dashboard: dashboardReducer,
        budgetState: budgetStateReducer,
        finances: financesReducer,
        tooltip: tooltipReducer
    },
});

export type AppDispatch = typeof store.dispatch;