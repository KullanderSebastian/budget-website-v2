import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { SignupState } from "../store/SignupSlice";
import { BudgetState } from "../store/budgetSlice";

interface DynamicInputFieldProps {
    slice: keyof RootState;
    category?: string;
    source: keyof SignupState | string;
    subcategory?: string;
    label: string;
    type?: string;
    required?: boolean;
}

const DynamicInputField: React.FC<DynamicInputFieldProps> = ({ slice, category, source, subcategory, label, type="text", required=true }) => {
    const dispatch = useDispatch<AppDispatch>();

    const value = useSelector((state: RootState) => {
        const currentState = state[slice];

        if (slice === "signup") {
            const signupState = currentState as SignupState;
            if (typeof source === "string" && source in signupState) {
                const fieldValue = signupState[source as keyof SignupState];
                return typeof fieldValue === "string" || typeof fieldValue === "number" ? fieldValue : "";
            }
        }
    
        if (slice === "budget" && category) {
            const budgetState = currentState as BudgetState;
            const sourceValue = budgetState[category]?.[source];
    
            if (subcategory && typeof sourceValue === "object" && sourceValue !== null) {
                const subValue = sourceValue[subcategory];
                return typeof subValue === "number" ? subValue.toString() : "";
            }
    
            if (typeof sourceValue === "number") {
                return sourceValue.toString();
            }
    
            return "";
        }

        return "";
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        dispatch({
            type: `${slice}/setFieldValue`,
            payload: { category, source, subcategory, value: newValue },
        });
    };

    return (
        <div>
            <label>{label}</label>
            <input 
                type={type}
                value={value || ""}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                required={required}
            />
        </div>
    );
};

export default DynamicInputField;