import * as Yup from "yup";
export const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is Required")
    .min(3, "Must be at 3 character"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .min(10, "Must be at least 10 characters."),
  email: Yup.string().required("Email is required.").email("Email is invalid."),
  persons: Yup.string().required("Persons is required."),
  date: Yup.string().required("Date is required."),
});
