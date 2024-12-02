"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { setState, onNext, onPrev } from "@/app/store/BudgetStateSlice";
import Sidebar from "./components/layout/Sidebar";
import TransparentHeader from "../layout/TransparentHeader";
import Welcome from "./components/Welcome";
import Income from "./components/Income";
import VariableExpenses from "./components/VariableExpenses";
import Savings from "./components/Savings";
import DebtLoans from "./components/DebtLoans";
import DiscretionarySpending from "./components/DiscretionarySpending";
import Education from "./components/Education";
import Healthcare from "./components/Healthcare";
import BusinessExpenses from "./components/BusinessExpenses";
import PetExpenses from "./components/PetExpenses";
import Emergencies from "./components/Emergencies";
import CustomCategories from "./components/CustomCategories";


export default function SetupBudget() {
    const dispatch = useDispatch<AppDispatch>();
    const budgetState = useSelector((state: RootState) => state.budgetState.budgetState);

    const handlePrev = () => dispatch(onPrev());
    const handleNext = () => dispatch(onNext());

    const budgetSteps = [
        <Welcome onNext={handleNext}/>,
        <Income onPrev={handlePrev} onNext={handleNext} />,
        <VariableExpenses onPrev={handlePrev} onNext={handleNext} />,
        <Savings onPrev={handlePrev} onNext={handleNext} />,
        <DebtLoans onPrev={handlePrev} onNext={handleNext} />,
        <DiscretionarySpending onPrev={handlePrev} onNext={handleNext} />,
        <Education onPrev={handlePrev} onNext={handleNext} />,
        <Healthcare onPrev={handlePrev} onNext={handleNext} />,
        <BusinessExpenses onPrev={handlePrev} onNext={handleNext} />,
        <PetExpenses onPrev={handlePrev} onNext={handleNext} />,
        <Emergencies onPrev={handlePrev} onNext={handleNext} />,
        <CustomCategories onPrev={handlePrev} onNext={handleNext} />,
    ]

    const setBudgetState = (stateValue: number) => {
        dispatch(setState(stateValue));
    }

    return (
        <div className="flex ">  
            <Sidebar budgetState={budgetState} setBudgetState={setBudgetState} />
            <div>
                <TransparentHeader />
            </div>
            <div className="flex items-center mx-auto w-screen h-screen bg-auth-gradient">
                <div className="bg-white rounded-2xl mx-auto shadow-xl shadow-customPurple-700">
                    <div className="p-8">
                        {budgetSteps[budgetState]}
                    </div>
                </div>
            </div>
        </div>
    );
}