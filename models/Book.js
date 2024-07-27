import mongoose from "mongoose";
import { date } from "yup";

const BookSchema = new mongoose.Schema(
  {
    fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      person: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
  },
  { timestamps: true }
);

export default mongoose.models.Book ||
  mongoose.model("Book", BookSchema);