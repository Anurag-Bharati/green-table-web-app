import WaveBottom from "@svgs/inline/wave-bottom.svg";
import Bean from "@svgs/inline/bean.svg";
import ArrowUp from "@svgs/inline/arrow-up.svg";
const Reviews = () => {
  return (
    <section className="relative px-[10%] pb-[6em]">
      <WaveBottom />
      <div className="pt-4 pb-6">
        <header className="relative mx-auto text-center max-w-2xl px-4 mb-14 z-10">
          <h2 className="text-md uppercase font-bold bg-[#111] px-4 py-1 rounded-full inline-block text-clr letter-spacing select-none">
            Happy Guests
          </h2>
          <p className="text-5xl font-bold text-clr-alt my-[0.5em]">What They Are Saying</p>
          <p className="text-2xl letter-spacing">
            Exploring new tastes and sharing them with our fellow food enthusiasts is what truly{" "}
            <span className="text-amber-400">ignites</span> our passion at X
          </p>
        </header>
        <div className="flex items-start flex-col sm:flex-row m-0 sm:mx-auto">
          <div className="relative w-[40%] self-baseline mr-10 -ml-8">
            <Bean />
          </div>
        </div>
        <div className="h-20">{/* REVIEW GLIDER */}</div>
        <div>
          <div className="relative pb-4">
            <ArrowUp className="absolute bottom-4 left-[20%] w-48" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
