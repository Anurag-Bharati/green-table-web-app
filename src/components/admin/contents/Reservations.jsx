import { collection } from "firebase/firestore";
import ReservationCard, { NoReservationCard } from "../reuseable/ReservationCard";
import ReservationForm from "../reuseable/ReservationForm";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "@/config/firebase/firebase";

const Reservations = () => {
  const reservationRef = collection(firestore, "reservations");
  const [snapshot, loading, error] = useCollection(reservationRef);
  const data = snapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ?? [];

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2 max-h-[calc(100vh-8rem)] overflow-y-auto no-scroll-bar overflow-x-hidden">
        <p className="text-xl font-medium">Incoming Reservations</p>
        {data.filter((reservation) => reservation.status === "pending").length === 0 && (
          <NoReservationCard />
        )}
        {!loading &&
          data
            .filter((reservation) => reservation.status === "pending")
            .map((reservation, index) => <ReservationCard key={index} data={reservation} />)}
      </div>
      <div className="hidden xl:flex  flex-col gap-2 max-h-[calc(100vh-8rem)] overflow-y-auto no-scroll-bar overflow-x-hidden min-w-[200px]">
        <p className="text-xl font-medium">Past Reservations</p>
        {data.filter((reservation) => reservation.status !== "pending").length === 0 && (
          <NoReservationCard />
        )}
        {!loading &&
          data
            .filter((reservation) => reservation.status !== "pending")
            .map((reservation, index) => <ReservationCard key={index} data={reservation} />)}
      </div>
      <div className="flex flex-col gap-2 grow max-h-[calc(100vh-8rem)] overflow-y-auto no-scroll-bar overflow-x-hidden">
        <p className="text-xl font-medium ">Add Reservation</p>
        <div className="sticky top-0">
          <ReservationForm />
        </div>
      </div>
    </div>
  );
};

export default Reservations;
