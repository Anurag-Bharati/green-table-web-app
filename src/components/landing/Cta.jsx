import Link from "next/link";

const Cta = () => {
  return (
    <section className="relative overflow-hidden px-4 sm:px-10 md:px-20 pt-20 pb-10">
      <div className="absolute w-[15%] right-0 bottom-1/2 translate-y-1/2">
        {/* <Image src={...} alt="..." width={400} height={300} className="object-cover" /> */}
      </div>
      <div className="flex items-center justify-between text-center sm:text-left sm:p-12">
        <div>
          <p className="flex-1 mb-0 max-w-xl text-3xl sm:text-4xl font-medium">
            <span className="text-[#94d82d]">Hungry?</span> Order From{" "}
            <span className="text-[#fccc3e]">Our Menu</span> & Have It Delivered To You.
          </p>
          <div className="my-4">
            <Link
              href="/menu"
              passHref={true}
              className="py-3 px-3 bg-[#c0eb75] rounded-xl text-lg"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
