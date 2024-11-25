"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/app/store/store";
import {
    setFieldValue,
    setTouchedField,
    setFormError,
    clearFormError,
    setError,
    resetForm
} from "@/app/store/SignupSlice";
import DynamicInputField from "@/app/components/DynamicInputField";
import { SignUpSchema } from "@/app/validation/signUpSchema";
import * as yup from "yup";

export default function Signup() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { name, email, password, confirmPassword, touchedFields, formErrors, error } = useSelector(
        (state: RootState) => state.signup
    );

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password != confirmPassword) {
            dispatch(setFormError({ field: "confirmPassword", message: "Passwords must match" }));
            return;
        }

        try {
            await SignUpSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false });

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
    
            if (res.ok) {
                dispatch(resetForm());
                router.push("/auth/signin");
            } else {
                const data = await res.json();
                dispatch(setError(data.message));
            }
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                err.inner.forEach((validationError) => {
                    const path = validationError.path as "name" | "email" | "password" | "confirmPassword";
                    dispatch(setFormError({ field: path, message: validationError.message }));
                });
            }
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSignup}>
                <DynamicInputField slice="signup" source="name" label="Name" type="text" />
                <DynamicInputField slice="signup" source="email" label="Email" type="email" />
                <DynamicInputField slice="signup" source="password" label="Password" type="password" />
                <DynamicInputField slice="signup" source="confirmPassword" label="Confirm Password" type="password" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
      );
}