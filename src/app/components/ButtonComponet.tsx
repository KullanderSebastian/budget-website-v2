import React from "react";

interface ButtonComponentInterface {
    type: "button" | "submit";
    title: string;
    onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentInterface> = ({ type, title, onClick }) => {
    return (
        <button
            className="w-full p-2 bg-customPurple-1300 rounded-lg text-white font-bold hover:bg-customPurple-1100 focus:ring-2 focus:ring-customPurple-300 focus:outline-none"
            type={type}
            onClick={onClick}
        >{title}</button>
    );
}

export default ButtonComponent;