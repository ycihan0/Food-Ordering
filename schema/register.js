import * as Yup from "yup";
export const registerSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is Required")
    .min(3, "Must be at 3 character"),
  email: Yup.string().required("Email is required.").email("Email is invalid."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character."
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .min(8, "Password must be at least 8 characters.")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
