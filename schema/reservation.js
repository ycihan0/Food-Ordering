import * as Yup from "yup";

// Geçerli tarih ve saat
const currentDate = new Date();

// Sabah 9:00
const startTime = new Date();
startTime.setHours(9, 0, 0, 0);

// Gece 11:00
const endTime = new Date();
endTime.setHours(23, 0, 0, 0);

// Minimum tarih (geçerli tarihten 1 dakika sonrası)
const minDate = new Date(currentDate.getTime() + 1 * 60 * 1000); // 1 dakika eklenmiş tarih

export const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is Required")
    .min(3, "Must be at least 3 characters"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .min(10, "Must be at least 10 characters."),
  email: Yup.string()
    .required("Email is required.")
    .email("Email is invalid."),
  persons: Yup.number()
    .required("Persons is required.")
    .positive("Persons must be a positive number."),
  date: Yup.date()
    .required("Date is required.")
    .min(minDate, `Date must be later than ${minDate.toLocaleString()}`)
    .test("time-range", "Please select a time between 09:00 and 23:00", (value) => {
      if (!value) return false;
      
      const selectedDate = new Date(value);

      // Saat aralığını kontrol et
      const selectedHours = selectedDate.getHours();
      return selectedHours >= startTime.getHours() && selectedHours <= endTime.getHours();
    }),
});
