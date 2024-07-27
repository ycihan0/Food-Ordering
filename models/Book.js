import mongoose from "mongoose";

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
    persons: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    fullName: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
