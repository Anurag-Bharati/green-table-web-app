"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";
import { GrGoogle } from "react-icons/gr";
import { useSearchParams } from "next/navigation";

function AuthPage() {
  const searchParams = useSearchParams();
  const [state, setState] = useState({ loading: false });
  const handleGoogleSignIn = async () => {
    setState({ loading: true });
    await signIn("google", {
      callbackUrl: searchParams.get("callbackUrl") || "/",
      redirect: false,
    });
    setState({ loading: false });
  };
  return (
    <section className="relative isolate text-white overflow-hidden p-4 min-h-screen mx-auto md:px-10 max-w-7xl lg:px-8 scroll-mt-32 flex flex-col justify-center items-center">
      <div className="-translate-y-1/2">
        <div className="p-4 flex flex-col justify-center items-center mb-9">
          <Image
            src="/assets/svgs/logo/logo.svg"
            height={300}
            width={300}
            className="w-24 h-24"
            alt="..."
          />
          <h1 className="text-black text-2xl">GREENTABLE</h1>
        </div>
        <div className="p-4 bg-gray-200 rounded-xl">
          <button
            type="button"
            className="w-full block bg-black border-2 hover:bg-white focus:text-black focus:bg-white text-white hover:text-black font-semibold rounded-lg px-4 py-3 border-white transition duration-300"
            onClick={handleGoogleSignIn}
          >
            <div className="flex items-center justify-center">
              {state.loading ? (
                <BiLoader className="animate-spin h-5 w-5" />
              ) : (
                <GrGoogle className="h-4 w-4" />
              )}
              <span className="ml-4 ">Log in with Google</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
