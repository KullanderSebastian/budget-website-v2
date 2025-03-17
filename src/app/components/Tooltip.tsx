import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { setShowTooltip, toggleTooltip } from "../store/TooltipSlice";

interface TooltipProps {
    text: string;
}

export default function InfoToolTip({ text }: TooltipProps) {
    const dispatch = useDispatch<AppDispatch>();
    const showTooltip = useSelector((state: RootState) => state.tooltip.showTooltip);

    return (
        <div>
            {showTooltip && (
                <div>
                    {text}
                </div>
            )}
        </div>
    );
}