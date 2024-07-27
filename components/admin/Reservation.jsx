import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../ui/Title";
import ReservationItems from "./ReservationItems";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [undefinedOrNullReservations, setUndefinedOrNullReservations] =
    useState([]);
  const [trueReservations, setTrueReservations] = useState([]);
  const [falseReservations, setFalseReservations] = useState([]);

  const status = ["preparing", "on the way", "delivered"];

  useEffect(() => {
    const getReservations = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reservation`
        );
        setReservations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReservations();
  }, []);

  useEffect(() => {
    const now = new Date();

    const sortedReservations = reservations
      .filter((reservation) => new Date(reservation.date) > now) // Saatten sonraki olanları filtrele yani geçmiş olanları gizle
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Tarihe göre sıralama

    const filterReservations = () => {
      const undefinedOrNullReservations = sortedReservations.filter(
        (reservation) =>
          reservation.status === undefined || reservation.status === null
      );
      const trueReservations = sortedReservations.filter(
        (reservation) => reservation.status === true
      );
      const falseReservations = sortedReservations.filter(
        (reservation) => reservation.status === false
      );

      setUndefinedOrNullReservations(undefinedOrNullReservations);
      setTrueReservations(trueReservations);
      setFalseReservations(falseReservations);
    };

    filterReservations();
  }, [reservations]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Reservations</Title>
      <div className="flex gap-6 flex-wrap mt-8">
        {undefinedOrNullReservations.length > 0 ? (
          undefinedOrNullReservations.map((undefinedOrNullReservation) => (
            <ReservationItems
              key={undefinedOrNullReservation._id}
              undefinedOrNullReservation={undefinedOrNullReservation}
              setReservations={setReservations}
            />
          ))
        ) : (
          <h3>No booking requests</h3>
        )}
      </div>
      <div className="overflow-x-auto w-full mt-5">
        <Title addClass="text-[40px]">Upcoming Reservations</Title>
        <table className="w-full text-sm text-center text-gray-500 xl:min-w-[1000px] mt-4">
       { trueReservations.length>0?(  <thead className="text-xs text-gray-400 uppercase bg-lime-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                CUSTOMER
              </th>
              <th scope="col" className="py-3 px-6">
                EMAIL
              </th>
              <th scope="col" className="py-3 px-6">
                PHONE
              </th>
              <th scope="col" className="py-3 px-6">
                PERSONS
              </th>
              <th scope="col" className="py-3 px-6">
                DATE
              </th>
              <th scope="col" className="py-3 px-6">
                TABLE NUMBER
              </th>
            </tr>
          </thead>):""}
          <tbody>
            {trueReservations.length > 0 ?
              (trueReservations.map((trueReservation) => (
                <tr
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                  key={trueReservation._id}
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-x-1 ">
                    {trueReservation.fullName}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {trueReservation.email}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {trueReservation.phoneNumber}
                  </td>

                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {trueReservation.persons}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {formatDate(trueReservation.date)}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {trueReservation.tableNumber && "-"}
                  </td>
                </tr>)
              )):(
                <h3>There is no upcoming reservation</h3>
              )}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto w-full mt-5">
        <Title addClass="text-[40px]">Rejected Reservations</Title>
        <table className="w-full text-sm text-center text-gray-500 xl:min-w-[1000px] mt-4">
       {falseReservations.length>0?(<thead className="text-xs text-gray-400 uppercase bg-red-900">
            <tr>
              <th scope="col" className="py-3 px-6">
                CUSTOMER
              </th>
              <th scope="col" className="py-3 px-6">
                EMAIL
              </th>
              <th scope="col" className="py-3 px-6">
                PHONE
              </th>
              <th scope="col" className="py-3 px-6">
                PERSONS
              </th>
              <th scope="col" className="py-3 px-6">
                DATE
              </th>
              <th scope="col" className="py-3 px-6">
                TABLE NUMBER
              </th>
            </tr>
          </thead>):""}
          <tbody>
            {falseReservations.length > 0 ?
              (falseReservations.map((falseReservation) => (
                <tr
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                  key={falseReservation._id}
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-x-1 ">
                    {falseReservation.fullName}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {falseReservation.email}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {falseReservation.phoneNumber}
                  </td>

                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {falseReservation.persons}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {formatDate(falseReservation.date)}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {falseReservation.tableNumber || "-"}
                  </td>
                </tr>)
              )):(
                <h3>There is no rejected reservation</h3>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservation;
