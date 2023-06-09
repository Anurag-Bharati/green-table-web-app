import Aside from "@/components/admin/Aside";
import Main from "@/components/admin/Main";
import IntervalApiPinger from "@/config/IntervalPinger";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Aside />
          <Main>{children}</Main>
          <IntervalApiPinger />
        </div>
      </body>
    </html>
  );
};

export default Layout;
