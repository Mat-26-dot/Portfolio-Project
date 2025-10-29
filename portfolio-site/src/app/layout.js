import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Chaos Cooking - Reduce Food Waste",
  description: "Transform your leftovers into delicious meals and reduce food waste",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
