import Input from "./form/Input";
import Title from "./ui/Title";

const Reservation = () => {
  return (
    <div className="container mx-auto py-12">
      <Title addClass="text-[40px] mb-10">Book A Table</Title>
      <div className="flex justify-between items-center flex-wrap gap-10">
        <div className="lg:flex-1 w-full">
          <div className="flex flex-col gap-y-3">
            <Input />
            <Input />
            <Input />
            <Input />
            <Input />
          </div>
          <button className="btn-primary mt-4">BOOK NOW</button>
        </div>
        <div className="lg:flex-1 !h-[384px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.9856920619463!2d28.97155367585938!3d41.02556897134813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e7a7777c43%3A0x4c76cf3dcc8b330b!2sGalata%20Kulesi!5e0!3m2!1str!2str!4v1717525405194!5m2!1str!2str"
            allowFullScreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="h-full w-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
