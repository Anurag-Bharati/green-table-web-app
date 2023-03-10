import Cta from "@/components/landing/Cta";
import Reservation from "@/components/landing/Reservation";
import Reviews from "@/components/landing/Reviews";
import WaveDecor from "@/components/landing/WaveDecor";

export default function Home() {
  return (
    <main>
      <Reviews />
      <Reservation />
      <Cta />
      <WaveDecor />
    </main>
  );
}
