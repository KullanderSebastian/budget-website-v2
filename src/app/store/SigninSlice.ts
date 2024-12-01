import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SigninState {
    email: string;
    password: string;
    isSubmitting: boolean;
}

const initialState: SigninState = {
    email: "",
    password: "",
    isSubmitting: false,
};

const signinSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
        setFieldValue: (state, action: PayloadAction<{ field: keyof Omit<SigninState, "isSubmitting" | "error">; value: string }>
        ) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        setSubmitting: (state, action: PayloadAction<boolean>) => {
            state.isSubmitting = action.payload;
        },
        resetForm: () => initialState,
    }
});

export const { setFieldValue, setSubmitting, resetForm } = signinSlice.actions;

export default signinSlice.reducer;