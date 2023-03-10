import ReservePatternL from "@svgs/inline/reserve-pattern-l.svg";
import ReservePatternR from "@svgs/inline/reserve-pattern-r.svg";
import ArrowDown from "@svgs/inline/arrow-down.svg";
import styles from "@/styles/landing/reservation.module.scss";
import ReservationForm from "./ReservationForm";
const Reservation = () => {
  return (
    <section className="relative pb-[6em] pt-[2em] max-w-none bg-[#94d82d] w-full mx-auto overflow-x-hidden">
      <div className={styles.patternWrapper}>
        <ReservePatternL />
        <ReservePatternR />
      </div>
      <header className="relative mx-auto text-center max-w-2xl px-4 mb-14 z-10">
        <h2 className="text-md uppercase font-bold bg-[#ffffff55] px-4 py-1 rounded-full inline-block text-clr letter-spacing select-none">
          Reserve A Table
        </h2>
        <p className="text-5xl font-bold text-clr-alt my-[0.5em]">We&apos;ve Got You Covered</p>
        <p className="text-2xl letter-spacing">
          Why wait for your meal? Book a table in advance and save time! You can make reservations
          up to 3 months in advance.
        </p>
        <p className="text-2xl letter-spacing py-2">We&apos;re excited to see you soon!</p>
        <div className={`hidden sm:block ${styles.arrowDown}`}>
          <ArrowDown />
        </div>
      </header>
      <div className="relative z-10 mx-8 sm:mx-10">
        <ReservationForm />
      </div>
    </section>
  );
};

export default Reservation;
