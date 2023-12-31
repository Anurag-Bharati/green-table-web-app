import Content from "@/components/admin/Content";
import { Header } from "@/components/admin/Header";

export default function Page() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-xl overflow-hidden">
      {/* Headers and Stuffs */}
      <div className="h-14 w-full bg-[#11111111] rounded-xl px-3 py-2">
        <Header />
      </div>

      {/* Body */}
      <div className="grow bg-[#11111111]  rounded-xl p-4 overflow-y-scroll max-h-[calc(100vh-6rem)] nice-scroll-bar ">
        <Content />
      </div>
    </div>
  );
}
