import * as Yup from "yup";
export const profileSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is Required")
    .min(3, "Must be at 3 character"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .min(10, "Must be at least 10 characters."),
  email: Yup.string().required("Email is required.").email("Email is invalid."),
  adress: Yup.string().required("Adress is required."),
  job: Yup.string().required("Job is required."),
  bio: Yup.string().required("Bio is required."),
});
