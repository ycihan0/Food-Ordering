import { sendReservationConfirmationEmail, sendReservationRejectionEmail } from "@/util/mail";
import Book from "../../../models/Book";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  if (method === "PUT") {
    try {
      const { status, tableNumber } = req.body;
      const updatedReservation = await Book.findByIdAndUpdate(
        id,
        { status, tableNumber },  
        {
          new: true, 
          runValidators: true, 
        }
      );

      if (!updatedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      if (status) {
        await sendReservationConfirmationEmail(updatedReservation.email, updatedReservation);
      } else {
        await sendReservationRejectionEmail(updatedReservation.email, updatedReservation);
      }
      
      // Başarıyla güncellendiğinde yanıt ver
      res.status(200).json(updatedReservation);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating reservation" });
    }
  } 
};

export default handler;
