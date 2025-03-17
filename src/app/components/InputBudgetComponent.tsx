import React from "react";
import { RiInformation2Fill } from "react-icons/ri";
import Tooltip from "./Tooltip";

interface InputComponentProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    error?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
    label,
    value,
    onChange,
    onBlur,
    type = "text",
    required = false,
    error,
}) => {
    return (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <label className="font-bold text-textGray">{label}</label>
                <div className="text-2xl text-customPurple-1300 cursor-pointer hover:text-customPurple-1100">
                    <RiInformation2Fill />
                    <Tooltip text="test test test"/>
                </div>
            </div>
            <input
                className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-customPurple-1300 focus:ring-2 focus:ring-customPurple-300"
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
            />
            {error && <p className="text-errorRed text-xs">{error}</p>}
        </div>
    );
};

export default InputComponent;