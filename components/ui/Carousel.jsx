import Image from "next/image";
import React from "react";
import Title from "./Title";

const Carousel = () => {
  return (
    <div className="h-screen w-full container mx-auto -mt-[88px]">
      <div className="absolute top-0 left-0 w-full h-full">
      <div className="relative h-full w-full">
        <Image src="/images/hero.jpg" alt="" layout="fill" objectFit="cover" />
      </div>
      </div>
      <div className="relative text-white top-48 flex flex-col items-start gap-y-10">
        <Title addClass="text-6xl">Fast Food Restaurant</Title>
        <p className="text-sm sm:w-2/5 w-full">
          Welcome to our fast food paradise! Enjoy mouth-watering burgers,
          crispy fries, and refreshing drinks, all crafted to perfection. Ideal
          for a quick meal. Join us today and savor the ultimate fast food
          experience!
        </p>
        <button className="btn-primary">Order Now</button>
      </div>
    </div>
  );
};

export default Carousel;
