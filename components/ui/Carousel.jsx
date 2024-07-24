import Image from "next/image";
import Title from "./Title";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div>
        <ul className="container mx-auto w-full text-start">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>
    ),
  };

  return (
    <div className="h-screen w-full -mt-[88px]">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative h-full w-full">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
      <Slider {...settings}>
        <div>
          <div className="mt-48 container mx-auto  text-white flex flex-col items-start gap-y-8">
            <Title addClass="text-5xl">Fast Food Restaurant</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Welcome to our fast food paradise! Enjoy mouth-watering burgers,
              crispy fries, and refreshing drinks, all crafted to perfection.
              Ideal for a quick meal. Join us today and savor the ultimate fast
              food experience!
            </p>
            <button className="btn-primary">Order Now</button>
          </div>
        </div>
        <div>
          <div className="mt-48 container mx-auto  text-white flex flex-col items-start gap-y-8">
            <Title addClass="text-5xl">Fast Food Restaurant</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Taste the best in fast food! Enjoy perfect burgers, crispy fries,
              and refreshing drinks. Ideal for a quick meal or a relaxed
              hangout.
            </p>
            <button className="btn-primary">Order Now</button>
          </div>
        </div>
        <div>
          <div className="mt-48 container mx-auto  text-white flex flex-col items-start gap-y-8">
            <Title addClass="text-6xl">Savor the Flavor Revolution!</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Step into fast food bliss! Our delicious burgers, crispy fries,
              and refreshing drinks are crafted to perfection. Ideal for a quick
              meal or a casual hangout. Join us today and enjoy the ultimate
              fast food experience!
            </p>
            <button className="btn-primary">Order Now</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
