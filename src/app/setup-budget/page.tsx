"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { setState, onNext, onPrev } from "@/app/store/BudgetStateSlice";
import Sidebar from "./components/layout/Sidebar";
import TransparentHeader from "../layout/TransparentHeader";
import Welcome from "./components/Welcome";
import BudgetFormHandler from "./components/BudgetFormHandler";
import { saveBudget, fetchBudget } from "../store/FinancesActions";


export default function SetupBudget() {
    const dispatch = useDispatch<AppDispatch>();
    const budgetState = useSelector((state: RootState) => state.budgetState.budgetState);

    const handlePrev = () => {
        dispatch(saveBudget());
        dispatch(onPrev())
    };
    const handleNext = () => {
        dispatch(saveBudget());
        dispatch(onNext())
    };

    const setBudgetState = (stateValue: number) => {
        dispatch(setState(stateValue));
    }

    useEffect(() => {
        dispatch(fetchBudget());
    }, [dispatch])

    return (
        <div className="flex ">  
            <Sidebar budgetState={budgetState} setBudgetState={setBudgetState} />
            <div>
                <TransparentHeader />
            </div>
            <div className="flex items-center mx-auto w-screen h-screen bg-auth-gradient">
                <div className="bg-white rounded-2xl mx-auto shadow-xl shadow-customPurple-700">
                    <div className="p-8">
                        {budgetState === 0 ? <Welcome onNext={handleNext} /> : <BudgetFormHandler onPrev={handlePrev} onNext={handleNext} />}
                    </div>
                </div>
            </div>
        </div>
    );
}