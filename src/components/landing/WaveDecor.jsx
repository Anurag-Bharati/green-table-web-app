import WaveSvg from "@svgs/inline/wave-curve.svg";
import ForkSvg from "@svgs/inline/fork.svg";
import SpoonSvg from "@svgs/inline/spoon.svg";
import KnifeSvg from "@svgs/inline/knife.svg";

const WaveDecor = () => {
  return (
    <div className="wave-decoration relative">
      <WaveSvg className="fill-[#eeeeee]" />
      <div className="absolute bottom-[2em] left-0 right-0 flex justify-center">
        <ForkSvg className="w-[4em] mx-1" />
        <KnifeSvg className="w-[4em] mx-1" />
        <SpoonSvg className="w-[4em] mx-1" />
      </div>
    </div>
  );
};

export default WaveDecor;
