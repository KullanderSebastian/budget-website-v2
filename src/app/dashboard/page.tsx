"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { setIsLoading } from "@/app/store/dashboardSlice";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.dashboard.isLoading);
    
    useEffect(() => {
        const checkBudgetSetup = async () => {
            dispatch(setIsLoading(true));

            const session = await getSession();
            const hasSetupBudget = (session?.user as { hasSetupBudget: boolean })?.hasSetupBudget;

            if (!hasSetupBudget) {
                router.push("/setup-budget");
            } else {
                dispatch(setIsLoading(false));
            }
        };

        checkBudgetSetup();
    }, [dispatch, router]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <h1>Welcome to dashboard</h1>
    );
}