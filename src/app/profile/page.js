import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/profile/Hero";
import MyOrders from "@/components/profile/MyOrders";
import MyReservations from "@/components/profile/MyReservations";

export default function Profile() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MyOrders />
      <MyReservations />
    </main>
  );
}
