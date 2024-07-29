import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0.0);
  const [preparingOrders, setPreparingOrders] = useState(0);
  const [onTheWayOrders, setOnTheWayOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [acceptedReservations, setAcceptedReservations] = useState(0);
  const [rejectedReservations, setRejectedReservations] = useState(0);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        const ordersData = res.data;
        setOrders(ordersData);

        // Toplam sipariş sayısı
        const totalOrderCount = ordersData.length;
        setTotalOrders(totalOrderCount);

        // Toplam ücret
        const totalOrderRevenue = ordersData.reduce(
          (acc, order) => acc + order.total,
          0
        );
        setTotalRevenue(totalOrderRevenue);

        // Sipariş durumlarına göre sayılar
        const preparingCount = ordersData.filter(
          (order) => order.status === 0
        ).length;
        const onTheWayCount = ordersData.filter(
          (order) => order.status === 1
        ).length;
        const deliveredCount = ordersData.filter(
          (order) => order.status === 2
        ).length;

        setPreparingOrders(preparingCount);
        setOnTheWayOrders(onTheWayCount);
        setDeliveredOrders(deliveredCount);
      } catch (err) {
        console.log(err);
      }
    };

    const getReservations = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reservation`
        );
        const reservationsData = res.data;
        setReservations(reservationsData);

        // Toplam rezervasyon sayısı
        const totalReservationCount = reservationsData.length;
        setTotalReservations(totalReservationCount);

        // Kabul edilen ve reddedilen rezervasyon sayıları
        const acceptedCount = reservationsData.filter(
          (reservation) => reservation.status === true
        ).length;
        const rejectedCount = reservationsData.filter(
          (reservation) => reservation.status === false
        ).length;

        setAcceptedReservations(acceptedCount);
        setRejectedReservations(rejectedCount);
      } catch (err) {
        console.log(err);
      }
    };

    getOrders();
    getReservations();
  }, []);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Dashboard</Title>
      <div className="overflow-auto max-h-[400px] w-full mt-5">
        <div className="p-6 bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Order Statistics */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Preparing Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{preparingOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">On The Way Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{onTheWayOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Delivered Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{deliveredOrders}</p>
            </div>
            {/* Reservation Statistics */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Reservations</h3>
              <p className="text-2xl font-bold text-gray-900">{totalReservations}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Accepted Reservations</h3>
              <p className="text-2xl font-bold text-gray-900">{acceptedReservations}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Rejected Reservations</h3>
              <p className="text-2xl font-bold text-gray-900">{rejectedReservations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
