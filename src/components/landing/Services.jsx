import styles from "@/styles/landing/services.module.scss";
import WaveDecor from "./WaveDecor";
import DiningTableArt from "@svgs/art/dining-table.svg";
import GrabNGoArt from "@svgs/art/food-package.svg";
import DeliveryArt from "@svgs/art/delivery.svg";
import ReservationArt from "@svgs/art/reservation.svg";
import BellArt from "@svgs/art/bell.svg";
const Services = () => {
  return (
    <section id="services" className="relative">
      <div className="pt-4 ">
        <header className="relative mx-auto text-center max-w-2xl px-4 mb-14 z-10">
          <h2 className="text-md uppercase font-bold bg-[#111] px-4 py-1 rounded-full inline-block text-clr letter-spacing select-none">
            Our Services
          </h2>
          <p className="text-5xl font-bold text-clr-alt my-[0.5em]">Why We Are The Top Faves!</p>
          <p className="text-2xl letter-spacing">
            Whether you&apos;re planning the party of the year, a cocktail masterclass or a simple
            but stylish dinner with friends, you're in expert hands.
          </p>
        </header>
        <div>
          <div
            className={`grid md:max-w-[35em] lg:max-w-[45em] ${styles.gridTemplate} my-0 mx-auto mb-8 gap-4`}
          >
            <a
              href="#"
              accessibilityText="Dining & Buffet: Join us at the table"
              className="p-5 bg-zinc-700 rounded-xl hover:scale-95 outline-stone-600 hover:outline-dashed focus:outline-dashed  transition duration-150"
            >
              <div className="flex flex-col justify-between items-start h-full">
                <p className="text-xl text-white">
                  Join Us
                  <br />
                  <span className="ml-5">At The</span>
                  <br />
                  Table
                </p>
                <DiningTableArt className="w-[100%] self-center h-auto" />
              </div>
            </a>
            <a
              href="#"
              accessibilityText="Order Takeaway: The Perfect Grab-n-go!"
              className="p-5 bg-[#fccc3e] rounded-xl hover:scale-95 outline-stone-600 hover:outline-dashed focus:outline-dashed  transition duration-150"
            >
              <div className="flex flex-col justify-between text-left h-full">
                <p className="text-xl">
                  The <br />
                  Perfect
                  <br />
                  Grab-n-go!
                </p>
                <GrabNGoArt className="w-[90%] self-center h-auto" />
              </div>
            </a>

            <a
              href="#"
              className="flex flex-col justify-between h-full p-5 row-span-2 bg-[#94d82d] rounded-xl hover:scale-95 outline-stone-600 hover:outline-dashed focus:outline-dashed  transition duration-150"
            >
              <p className="text-xl mb-4">
                Speedy
                <br />
                <span className="font-bold">DELIVERY</span>
                <br />
                To your doorsteps
              </p>
              <DeliveryArt className="w-[150%] self-start h-auto z-10" />
            </a>
            <div className="flex col-span-2">
              <a
                href="#"
                className="flex justify-between items-center px-5 pt-5 flex-1 bg-stone-600 text-white rounded-xl hover:scale-95 outline-stone-600 hover:outline-dashed focus:outline-dashed  transition duration-150"
              >
                <div className="text-xl pb-5">
                  <p className="flex-1">Reservations</p>
                  <p className="whitespace-nowrap">17:00 - 23:00 PM</p>
                </div>
                <ReservationArt className="h-auto w-full self-end" />
              </a>
              <a
                href="#"
                className="flex relative w-[7em] ml-4 justify-center items-center flex-col p-5 text-xl text-center bg-cyan-400 rounded-xl hover:scale-95 outline-stone-600 hover:outline-dashed focus:outline-dashed  transition duration-150"
              >
                <BellArt className="w-full h-auto mb-1 mx-auto" />
                Punctual
              </a>
            </div>
          </div>
        </div>
      </div>
      <WaveDecor />
    </section>
  );
};

export default Services;
