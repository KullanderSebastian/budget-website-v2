import { categories } from "@/app/data/categories";
import React from "react";

export default function Sidebar({ budgetState, setBudgetState }: { budgetState: number, setBudgetState: (stateValue: number) => void }) {
    const menuItems = Object.entries(categories)
        .filter(([_, category]) => category.hasRecurring)
        .map(([key, category], index) => ({
            label: category.label,
            stateValue: index + 1,
        }));

    return (
        <div className="h-screen w-[300px] relative bg-customPurple-1300">
            <div className="h-full flex flex-col justify-center space-y-4 font-bold text-complementary">
                <div key="Welcome" onClick={() => setBudgetState(0)} className={`pl-4 ${budgetState === 0 ? "border-l-4 border-complementary pl-8" : "border-l-4 border-customPurple-1300"}`}>
                    <div className="cursor-pointer whitespace-nowrap">Welcome</div>
                </div>

                {menuItems.map(({ label, stateValue }) => (
                    <div 
                        key={label} 
                        onClick={() => {setBudgetState(stateValue)}} 
                        className={`pl-4 ${budgetState === stateValue ? "border-l-4 border-complementary pl-8" : "border-l-4 border-customPurple-1300"}`
                    }>
                        <div className="cursor-pointer whitespace-nowrap">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}








