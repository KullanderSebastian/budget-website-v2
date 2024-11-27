"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/app/store/store";
import { setFieldValue, setFormError, clearFormError, resetForm, nextStep, prevStep } from "@/app/store/SignupSlice";
import InputComponent from "@/app/components/InputComponent";
import ButtonComponent from "@/app/components/ButtonComponet";
import { SignUpSchema } from "@/app/validation/signUpSchema";
import Link from "next/link";
import { PiCopy } from "react-icons/pi";
import * as yup from "yup";


export default function Signup() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { name, email, password, confirmPassword, generatedPassword, formErrors, error, step } = useSelector(
        (state: RootState) => state.signup
    );

    const handleNext = async () => {
        try {
            await SignUpSchema.validate(
                { name, email, password, confirmPassword },
                { abortEarly: false, context: { step } }
            );
    
            if (step === 1) {
                const res = await fetch("/api/auth/check-if-email-exists", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });
    
                if (!res.ok) {
                    const data = await res.json();
                    dispatch(setFormError({ field: "email", message: data.message }));
                    return;
                }
            }
    
            dispatch(nextStep());
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                err.inner.forEach((validationError) => {
                    dispatch(
                        setFormError({
                            field: validationError.path as keyof typeof formErrors,
                            message: validationError.message,
                        })
                    );
                });
            }
        }
    };

    const handlePrev = () => dispatch(prevStep());

    const handleBlur = (field: keyof typeof formErrors, value: string) => {
        try {
            SignUpSchema.validateSyncAt(field, { name, email, password, confirmPassword }, { context: { step } });
            dispatch(clearFormError(field));
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                dispatch(setFormError({ field, message: err.message }));
            }
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (step === 2) {
                await SignUpSchema.validate({ name, email }, { abortEarly: false });
            } else if (step === 3) {
                await SignUpSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false });
            }

            const payload = {
                name,
                email,
                password: step === 2 ? generatedPassword : password
            }

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                dispatch(resetForm());
                router.push("/auth/signin");
            } else {
                const data = await res.json();
                throw new Error(data.message || "Signup failed");
            }
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                err.inner.forEach((validationError) => {
                    const path = validationError.path as keyof typeof formErrors;
                    if (path) {
                        dispatch(setFormError({ field: path, message: validationError.message }));
                    }
                });
            } else {
                console.error("Unexpected signup error:", err);
            }

            return;
        }
    };

    const generateSecurePassword = (length = 16) => {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?/[]{}";
        const password = [];
        const crypto = window.crypto;

        for (let i = 0; i < length; i++) {
            const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % charset.length;
            password.push(charset[randomIndex]);
        }

        return password.join("");
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPassword)
            .then(() => {
                alert("Copied to clipboard");
            })
            .catch((err) => {
                console.error("Failed to copy: " + err);
            });
    };

    useEffect(() => {
        if (step === 2) {
            const generatedPassword = generateSecurePassword();
            dispatch(setFieldValue({ field: "generatedPassword", value: generatedPassword }));
        }
    }, [step]);

    return (
        <div className="flex items-center h-screen w-screen bg-auth-gradient">
            <div className="w-1/3 bg-white rounded-2xl mx-auto shadow-xl shadow-customPurple-700 p-8">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSignup}>
                    {step === 1 && (
                        <>  
                            <div className="flex items-center space-x-4 mb-8">
                                <p className="text-xs font-bold bg-customPurple-300 text-customPurple-1300 pl-2 pr-2 py-1 rounded">Step 1</p>
                                <h1 className="text-2xl font-bold text-textGray">Create your account</h1>
                            </div>
                            <InputComponent
                                label="Name"
                                value={name}
                                onChange={(e) => dispatch(setFieldValue({ field: "name", value: e.target.value }))}
                                onBlur={(e) => handleBlur("name", e.target.value)}
                                error={formErrors.name}
                            />
                            <InputComponent
                                label="Email"
                                value={email}
                                onChange={(e) => dispatch(setFieldValue({ field: "email", value: e.target.value }))}
                                onBlur={(e) => handleBlur("email", e.target.value)}
                                type="email"
                                error={formErrors.email}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="flex items-center space-x-4 mb-8">
                                <p className="text-xs font-bold bg-customPurple-300 text-customPurple-1300 pl-2 pr-2 py-1 rounded">Step 2</p>
                                <h1 className="text-2xl font-bold text-textGray">Set your password</h1>
                            </div>
                            <div className="flex items-center space-x-4 mb-8">
                                <p className="text-xs font-bold bg-customPurple-300 text-customPurple-1300 py-1 px-2 rounded">{email.charAt(0).toUpperCase()}</p>
                                <p className="text-textGray">{email}</p>
                            </div>

                            <div className="flex items-center justify-between bg-customPurple-300 p-2 rounded">
                                <p className="">{generatedPassword}</p>
                                <div onClick={copyToClipboard} className="text-2xl cursor-pointer p-1 rounded hover:bg-customPurple-700">
                                    <PiCopy />
                                </div>
                            </div>
                            <p className="text-xs text-textGray">We generated a strong password for you</p>

                            

                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="flex items-center space-x-4 mb-8">
                                <p className="text-xs font-bold bg-customPurple-300 text-customPurple-1300 pl-2 pr-2 py-1 rounded">Step 2</p>
                                <h1 className="text-2xl font-bold text-textGray">Set your password</h1>
                            </div>
                            <InputComponent
                                label="Password"
                                value={password}
                                onChange={(e) => dispatch(setFieldValue({ field: "password", value: e.target.value }))}
                                onBlur={(e) => handleBlur("password", e.target.value)}
                                type="password"
                                error={formErrors.password}
                            />
                            <InputComponent
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => dispatch(setFieldValue({ field: "confirmPassword", value: e.target.value }))}
                                onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
                                type="password"
                                error={formErrors.confirmPassword}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="mt-8">
                                <ButtonComponent 
                                    type="submit"
                                    title="Proceed with this password"
                                />
                            </div>

                            <div onClick={handleNext} className="w-full p-2 rounded-lg font-bold cursor-pointer text-center hover:bg-customPurple-100 mt-4">
                                <p className="text-customPurple-1300">Choose my own password</p>
                            </div>
                        </>
                    )}


                    {step < 2 && (
                        <>
                            <ButtonComponent 
                                type="button"
                                title="Start using Budget Planner"
                                onClick={handleNext}
                            />
                            <p className="mt-2">Already have an account? <Link href="/auth/signin" className="text-customPurple-1300 underline hover:no-underline">Sign in</Link></p>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <ButtonComponent
                                type="submit"
                                title="Submit"
                            />

                            <div className="mt-4"></div>

                            <div onClick={handlePrev} className="w-full p-2 rounded-lg font-bold cursor-pointer text-center hover:bg-customPurple-100 mt-4">
                                <p className="text-customPurple-1300">Go back</p>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}