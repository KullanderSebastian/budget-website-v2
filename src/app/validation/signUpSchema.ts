import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
    name: yup
        .string()
        .when("$step", {
            is: 1,
            then: (schema) => schema.min(2, "Name must be at least 2 characters").required("Name is required"),
            otherwise: (schema) => schema.strip(),
        }),
    email: yup
        .string()
        .when("$step", {
            is: 1,
            then: (schema) => schema.email("Invalid email address").required("Email is required"),
            otherwise: (schema) => schema.strip(),
        }),
    password: yup
        .string()
        .when("$step", {
            is: 3,
            then: (schema) =>
                schema
                    .required("Password is required")
                    .min(8, "Password must be at least 8 characters")
                    .matches(/\d/, "Password must contain at least one number"),
            otherwise: (schema) => schema.strip(),
        }),
    confirmPassword: yup
        .string()
        .when("$step", {
            is: 3,
            then: (schema) =>
                schema
                    .required("Please confirm your password")
                    .oneOf([yup.ref("password")], "Passwords must match"),
            otherwise: (schema) => schema.strip(),
        }),
});