import * as yup from "yup";

const userNameRules = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const signUpSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup
    .string("Enter your first name")
    .matches(userNameRules, { message: "Enter a valid first name" })
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .matches(userNameRules, { message: "Enter a valid last name" })
    .required("Last name is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters long")
    .matches(passwordRules, {
      message:
        "Your password should contain at least 8 characters, one uppercase and one lowercase, one number and a !,@,#,$,%",
    })
    .required("Password is required"),
});

export const logInSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
