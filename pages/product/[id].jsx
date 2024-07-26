import Title from "@/components/ui/Title";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import axios from "axios";

const Index = ({ food }) => {
  console.log(food)
  const [prices, setPrices] = useState(food.prices);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(food?.extraOptions);
  const [extras, setExtras] = useState([]);
  const cart = useSelector((state) => state.cart);
  const findCart = cart.products.find((item) => item._id === food._id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (food.discount) {
      const discountedPrice = prices[size] * (1 - food.discount / 100);
      setPrice(discountedPrice);
    } else {
      setPrice(prices[size]);
    }
  }, [size, prices, food.discount]);

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };
  const handleChange = (e, item) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...food, extras, price, quantity: 1 }));
  };

  return (
    <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap">
      <div className="relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto">
        <Image
          src={food?.img}
          alt=""
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className="md:flex-1 md:text-start text-center">
        <Title addClass="text-6xl">{food?.title}</Title>
        <div className="my-4">
          {food.discount ? (
            <div className="flex">
              <span className="line-through text-red-500 mr-2 font-bold">
                ${prices[size]}
              </span>
              <span className="text-primary text-2xl font-bold">
                ${price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-primary text-2xl font-bold">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-sm my-4 md:pr-24">{food?.desc}</p>
        <div>
          {food.category === "pizza" && (
            <>
              <h4 className="text-xl font-bold">Choose the size</h4>
              <div className="flex items-center gap-x-20 md:justify-start justify-center">
                <div
                  className="relative w-8 h-8 cursor-pointer"
                  onClick={() => handleSize(0)}
                >
                  <Image src="/images/size.png" alt="" fill />
                  <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                    Small
                  </span>
                </div>

                <div
                  className="relative w-12 h-12 cursor-pointer"
                  onClick={() => handleSize(1)}
                >
                  <Image src="/images/size.png" alt="" fill />
                  <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                    Medium
                  </span>
                </div>
                <div
                  className="relative w-16 h-16 cursor-pointer"
                  onClick={() => handleSize(2)}
                >
                  <Image src="/images/size.png" alt="" fill />
                  <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                    Large
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-x-4 my-6 md:justify-start justify-center">
          {extraItems.map((item) => (
            <label className="flex items-center gap-x-1" key={item._id}>
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                onChange={(e) => handleChange(e, item)}
              />
              <span className="text-sm font-semibold">{item.text}</span>
            </label>
          ))}
        </div>
        <button
          className="btn-primary"
          onClick={handleClick}
          disabled={findCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );

  return {
    props: {
      food: res.data ? res.data : null,
    },
  };
};

export default Index;
