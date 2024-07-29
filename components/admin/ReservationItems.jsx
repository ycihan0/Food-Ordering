import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const ReservationItems = ({ undefinedOrNullReservation }) => {
  const [tableNumber, setTableNumber] = useState("");
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleAccept = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/reservation/${undefinedOrNullReservation._id}`,
        { status: true, tableNumber: tableNumber }
      );

      if (res.status === 200) {
        toast.success("Successfully accepted");
        
      }
    } catch (err) {
      console.error("Failed to update reservation status:", err);
    }
  };

  const handleReject = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/reservation/${undefinedOrNullReservation._id}`,
        { status: false, tableNumber: tableNumber }
      );
      if (res.status === 200) {
        toast.success("Successfully rejected");
      }
    } catch (err) {
      console.error("Failed to update reservation status:", err);
    }
  };

  return (
    <div className="card p-6 mb-6 shadow-lg border rounded-lg bg-slate-100  max-w-80">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {undefinedOrNullReservation.fullName}
      </h3>
      <p className="text-gray-600">
        <span className="font-medium">Email:</span>
        {undefinedOrNullReservation.email}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Phone:</span>
        {undefinedOrNullReservation.phoneNumber}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Persons:</span>
        {undefinedOrNullReservation.persons}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Date:</span>
        {formatDate(undefinedOrNullReservation.date)}
      </p>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Table Number:
        </label>
        <input
          type="number"
          className="input input-bordered w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          onChange={(e) => setTableNumber(e.target.value)}
        />
      </div>
      <div className="flex gap-4 mt-6">
        <button
          className="btn btn-success flex-1 py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600 transition duration-150"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="btn btn-error flex-1 py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-150"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ReservationItems;
