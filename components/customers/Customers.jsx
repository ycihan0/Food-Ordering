import Title from "../ui/Title";
import CustomerItem from "./CustomerItem";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [comments, setComments] = useState([]);
 

  useEffect(() => {
    const getCustomerComment = async () => {
      try {
        const res = await axios.get('https://run.mocky.io/v3/ccbfcd11-b174-4742-9de8-d8e160abbbea');
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomerComment();
  }, []);

  function NextBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white"
        onClick={onClick}
      >
        <IoIosArrowForward />
      </button>
    );
  }

  function PrevBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white mr-2"
        onClick={onClick}
      >
        <IoIosArrowBack />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mb-20 mt-12">
      <Title addClass="text-[40px] text-center">What Says Our Customers</Title>
      <Slider {...settings}>
        {comments.map((comment, index)=><CustomerItem comment={comment} key={index}/>)}
        
      </Slider>
    </div>
  );
};

export default Customers;
