import Image from "next/image";
import { useEffect, useState } from "react";
import Products from "@/components/admin/Products";
import Order from "../../components/admin/Order";
import Category from "@/components/admin/Category";
import Footer from "@/components/admin/Footer";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import AddProduct from "@/components/admin/AddProduct";
import Reservation from "@/components/admin/Reservation";
import Dashboard from "@/components/admin/Dashboard";
const Profile = () => {
  const [tabs, setTabs] = useState(0);
  const [isProductModal, setIsProductModal] = useState(false);
  const [reservations, setReservations] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    const getReservations = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reservation`
        );
        const reservationsData = res.data;
        const filteredReservations = reservationsData.filter(
          (reservation) =>
            reservation.status === null || reservation.status === undefined
        );
        setReservations(filteredReservations);
      } catch (err) {
        console.log(err);
      }
    };
    getReservations();
  }, []);

  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("/admin");
          toast.success("Admin Account Closed!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
          <Image
            src="/images/admin.png"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
            priority
            style={{ width: "auto", height: "auto" }}
          />
          <b className="text-2xl mt-1">Admin</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-dashboard"></i>
            <button className="ml-1 ">Dashboard</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-cutlery"></i>
            <button className="ml-1 ">Products</button>
          </li>
          <li
            className={`border  border-t-0  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className={`border  border-t-0  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 3 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(3)}
          >
            <i className="fa fa-table"></i>
            <button className="relative ml-1">
              Reservations{" "}
              {reservations.length > 0 && (
                <span className="px-[5px] text-[15px] ml-1 rounded-full bg-red-500 absolute  text-white inline-flex items-center justify-center font-bold">
                  {reservations.length}
                </span>
              )}
            </button>
          </li>
          <li
            className={`border border-t-0  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 4 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(4)}
          >
            <i className="fa fa-ellipsis-h"></i>
            <button className="ml-1">Categories</button>
          </li>
          <li
            className={`border border-t-0  w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 5 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(5)}
          >
            <i className="fa fa-window-maximize"></i>
            <button className="ml-1">Footer</button>
          </li>
          <li
            className={`border border-t-0  w-full p-3 cursor-pointer hover:bg-danger hover:text-white transition-all}`}
            onClick={closeAdminAccount}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Dashboard />}
      {tabs === 1 && <Products />}
      {tabs === 2 && <Order />}
      {tabs === 3 && <Reservation />}
      {tabs === 4 && <Category />}
      {tabs === 5 && <Footer />}
      {isProductModal && <AddProduct setIsProductModal={setIsProductModal} />}
      <button
        className="btn-primary !w-12 !h-12 !p-0 fixed bottom-14 right-10 text-4xl"
        onClick={() => setIsProductModal(true)}
      >
        +
      </button>
    </div>
  );
};

export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Profile;
