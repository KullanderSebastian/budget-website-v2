import React from "react";

export default function Sidebar({ budgetState, setBudgetState }: { budgetState: number, setBudgetState: (stateValue: number) => void }) {
    const menuItems = [
        { label: "Welcome", stateValue: 0 },
        { label: "Income", stateValue: 1 },
        { label: "Fixed Expenses", stateValue: 2 },
        { label: "Variable Expenses", stateValue: 3 },
        { label: "Savings", stateValue: 4 },
        { label: "Debt & Loans", stateValue: 5 },
        { label: "Discretionary Spending", stateValue: 6 },
        { label: "Education", stateValue: 7 },
        { label: "Healthcare", stateValue: 8 },
        { label: "Business Expenses", stateValue: 9 },
        { label: "Pet Expenses", stateValue: 10 },
        { label: "Emergencies", stateValue: 11 },
        { label: "Custom Categories", stateValue: 12 },
    ];

    return (
        <div className="h-screen w-[300px] relative bg-customPurple-1300">
            <div className="h-full flex flex-col justify-center space-y-4 font-bold text-complementary">
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








