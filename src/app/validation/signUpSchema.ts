import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/\d/, 'Password must contain at least one number'),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
});