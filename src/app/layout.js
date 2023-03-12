import "@/styles/globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "Green Table",
  description:
    "GreenTable is a cutting-edge, Smart ML-powered Restaurant management application that revolutionizes the way you run your restaurant. With advanced features like food demand prediction, online reservation and food ordering, online delivery, and secure online payment options, GreenTable streamlines your operations and enhances your customer experience. Experience intuitive real-time reservation management, allowing you to optimize your table availability and ensure seamless dining experiences. What sets GreenTable apart is the ability for customers to pre-reserve tables up to 30 days in advance, providing ultimate convenience and ensuring a memorable dining experience. Embrace the future of restaurant management with GreenTable, where sustainability, intelligence, and exceptional service come together.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
