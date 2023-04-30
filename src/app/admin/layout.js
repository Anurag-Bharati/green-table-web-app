import Aside from "@/components/admin/Aside";
import Main from "@/components/admin/Main";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Aside />
          <Main>{children}</Main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
