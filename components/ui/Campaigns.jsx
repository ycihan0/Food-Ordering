import Image from "next/image";
import Title from "./Title";
import { MdShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useRouter } from "next/router";

const CampaignItem = ({ product }) => {
  const router = useRouter();
  return (
    <div className="bg-secondary rounded-md py-5 px-[15px] flex items-center gap-x-4 mr-5">
      <div className="relative md:w-44 md:h-44 w-36 h-36 after:content-['']   border-[5px] border-primary rounded-full overflow-hidden bg-slate-100">
        <Image
          src={product.img}
          alt={product.title}
          fill
          className="hover:scale-105 transition-all"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="text-white">
        <Title addClass="text-2xl">{product.title}</Title>
        <div className="font-dancing my-1">
          <span className="text-[40px]">{product.discount}%</span>
          <span className="text-sm inline-block ml-1">Off</span>
        </div>
        <button className="btn-primary flex items-center gap-x-2" onClick={()=>{router.push(`/product/${product?._id}`)}}>
          Order Now <MdShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

const Campaigns = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        const filteredProducts = res.data.filter((product) => product.discount);
        const sortedProducts = filteredProducts.sort(
          (a, b) => b.discount - a.discount
        );
        setProducts(sortedProducts);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div>
        <ul className="">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-20 ">
      {products.length > 0 && 
       ( <Slider {...settings} >
          {products.map((product) => (
            <CampaignItem key={product._id} product={product} />
          ))}
          </Slider>)
      }  
    </div>
    );
};

export default Campaigns;
