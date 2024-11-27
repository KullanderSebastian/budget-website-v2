import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignupState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    generatedPassword: string;
    touchedFields: Partial<Record<"name" | "email" | "password" | "confirmPassword", boolean>>;
    formErrors: Partial<Record<"name" | "email" | "password" | "confirmPassword", string>>;
    error: string;
    step: number;
}

const initialState: SignupState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    generatedPassword: "",
    touchedFields: {},
    formErrors: {},
    error: "",
    step: 1,
};

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setFieldValue: (state, action: PayloadAction<{ field: keyof Omit<SignupState, "touchedFields" | "formErrors" | "error" | "step">; value: string }>) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        setTouchedField: (state, action: PayloadAction<keyof SignupState>) => {
            state.touchedFields[action.payload as keyof typeof state.touchedFields] = true;
        },
        setFormError: (state, action: PayloadAction<{ field: keyof SignupState["formErrors"]; message: string }>) => {
            const { field, message } = action.payload;
            state.formErrors[field] = message;
        },
        clearFormError: (state, action: PayloadAction<keyof SignupState["formErrors"]>) => {
            delete state.formErrors[action.payload];
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        resetForm: () => initialState,
        nextStep: (state) => {
            state.step += 1;
        },
        prevStep: (state) => {
            state.step = Math.max(1, state.step - 1);
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
    },
});

export const {
    setFieldValue,
    setTouchedField,
    setFormError,
    clearFormError,
    setError,
    resetForm,
    nextStep,
    prevStep,
    setStep,
} = signupSlice.actions;

export default signupSlice.reducer;