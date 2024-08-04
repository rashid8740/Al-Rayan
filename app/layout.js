import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Al-Rayaan - Tech Store",
  description: "Your one-stop shop for all things tech",
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
