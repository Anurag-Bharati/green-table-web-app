import ReservationCard from "../reuseable/ReservationCard";
import ReservationForm from "../reuseable/ReservationForm";
const data = [
  {
    id: 1,
    name: "John Doe",
    email: "jhonDoe@email.com",
    phone: "08123456789",
    avatar: null,
  },
  {
    id: 1,
    name: "John Doe",
    email: "jhonDoe@email.com",
    phone: "08123456789",
    avatar: null,
  },
  {
    id: 1,
    name: "John Doe",
    email: "jhonDoe@email.com",
    phone: "08123456789",
    avatar: null,
  },
  {
    id: 1,
    name: "John Doe",
    email: "jhonDoe@email.com",
    phone: "08123456789",
    avatar: null,
  },
];
const Reservations = () => {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2 max-h-[calc(100vh-8rem)] overflow-y-auto no-scroll-bar overflow-x-hidden">
        <p className="text-xl font-medium">Incoming Reservations</p>
        {data.map((reservation, index) => (
          <ReservationCard key={index} data={reservation} />
        ))}
      </div>
      <div className="hidden xl:flex  flex-col gap-2 max-h-[calc(100vh-8rem)] overflow-y-auto no-scroll-bar overflow-x-hidden">
        <p className="text-xl font-medium">Past Reservations</p>
        {data.map((reservation, index) => (
          <ReservationCard key={index} data={reservation} varient="accepted" />
        ))}
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
