import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignupState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    touchedFields: Partial<Record<"name" | "email" | "password" | "confirmPassword", boolean>>;
    formErrors: Partial<Record<"name" | "email" | "password" | "confirmPassword", string>>;
    error: string;
}

const initialState: SignupState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    touchedFields: {},
    formErrors: {},
    error: "",
};

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setFieldValue: (state, action: PayloadAction<{ source: keyof SignupState; value: string }>) => {
            const { source, value } = action.payload;
            state[source] = value;
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
    },
});

export const {
    setFieldValue,
    setTouchedField,
    setFormError,
    clearFormError,
    setError,
    resetForm,
} = signupSlice.actions;

export default signupSlice.reducer;