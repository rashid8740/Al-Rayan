import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "../contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Al-Rayaan - Tech Store",
  description: "Your one-stop shop for all things tech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
