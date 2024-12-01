"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from 'next-auth/react';
import { RootState, AppDispatch } from "@/app/store/store";
import { setFieldValue, setSubmitting } from "@/app/store/SigninSlice";
import InputComponent from '@/app/components/InputComponent';
import ButtonComponent from '@/app/components/ButtonComponet';

const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid credentials. Please try again",
    AccessDenied: "You do not have permission to sign in.",
    Configuration: "There is a configuration issue with the sign-in provider.",
    Default: "An error occurred. Please try again later.",
}

export default function SignIn() {
    const dispatch = useDispatch<AppDispatch>();
    const { email, password, isSubmitting } = useSelector((state: RootState) => state.signin);
    const searchParams = useSearchParams();
    const error = searchParams?.get("error");

    const getErrorMessage = (error: string | null) => {
        return errorMessages[error || "Default"] || errorMessages.Default;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            dispatch(setSubmitting(true));
            const result = await signIn("credentials", {
                email,
                password,
                callbackUrl: "/dashboard",
            });


        } finally {
            dispatch(setSubmitting(false));
        }
    }

    return (
        <div className="flex items-center h-screen w-screen bg-auth-gradient">
            <div className="w-1/3 bg-white rounded-2xl mx-auto shadow-xl shadow-customPurple-700 p-8">
            <h1 className="text-2xl font-bold text-headerGray">Sign in</h1>
            <p className="text-sm text-textGray mb-8">Enter your account details or sign in with Google</p>
                {error && <div className="text-errorRed -mt-4">{getErrorMessage(error)}</div>}
                <form onSubmit={handleSubmit}>
                    <InputComponent 
                        label="Email"
                        value={email}
                        onChange={(e) => dispatch(setFieldValue({ field: "email", value: e.target.value }))}
                        type=""
                    />
                    <InputComponent 
                        label="Password"
                        value={password}
                        onChange={(e) => dispatch(setFieldValue({ field: "password", value: e.target.value }))}
                        type=""
                    />
                    <ButtonComponent 
                        type="submit"
                        title="Sign in with Email"
                    />
                </form>
                <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} id="google-signin" className="google-signin-btn mt-4">
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
                    Sign in with Google
                </button>
                <div className="text-center mt-4">
                    <p>Don't have an account? <a className="text-customPurple-1300 underline hover:no-underline" href="/auth/signup">Sign up</a></p>
                    <p>Forgot your password? <a className="text-customPurple-1300 underline hover:no-underline" href="/auth/request-reset-password">Click here</a></p>    
                </div>
            </div>
        </div>
    );
}