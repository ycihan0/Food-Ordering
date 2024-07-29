import Book from "../../../models/Book";
import dbConnect from "../../../util/dbConnect";
import { sendReservationEmail } from "@/util/mail";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const products = await Book.find();
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
    }
  }

 
  if (method === "POST") {
    try {
      const reservationDetails = req.body; 
      const newReservation = await Book.create(reservationDetails);

      await sendReservationEmail(
        reservationDetails.email,
        reservationDetails
      );

      res.status(201).json({ message: "Reservation successful and email sent.", newReservation });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export default handler;
