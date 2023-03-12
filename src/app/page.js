import Cta from "@/components/landing/Cta";
import Hero from "@/components/landing/Hero";
import Header from "@/components/landing/Navbar";
import Reservation from "@/components/landing/Reservation";
import Reviews from "@/components/landing/Reviews";
import Services from "@/components/landing/Services";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Reviews />
      <Reservation />
      <Cta />
    </main>
  );
}
