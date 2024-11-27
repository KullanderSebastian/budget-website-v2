import React from "react";

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
            <label className="font-bold text-textGray">{label}</label>
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