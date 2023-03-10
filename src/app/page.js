import Reservation from "@/components/landing/Reservation";
import Reviews from "@/components/landing/Reviews";
import WaveDecor from "@/components/landing/WaveDecor";

export default function Home() {
  return (
    <main>
      <Reviews />
      <Reservation />
      <WaveDecor />
    </main>
  );
}
