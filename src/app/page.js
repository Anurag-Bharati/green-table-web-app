import Cta from "@/components/landing/Cta";
import Reservation from "@/components/landing/Reservation";
import Reviews from "@/components/landing/Reviews";
import Services from "@/components/landing/Services";

export default function Home() {
  return (
    <main>
      <Services />
      <Reviews />
      <Reservation />
      <Cta />
    </main>
  );
}
