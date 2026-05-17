import "./globals.css";
import Navbar from "../components/Navbar";
import { SanityLive } from "../sanity/lib/live"; // Add this import

export const metadata = {
  title: "Harshika Traders",
  description: "Ratlam's Premier Mobile & Electronics Store",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white dark:bg-slate-950">
        <Navbar />
        {children}
        <SanityLive /> {/* Add this right before the closing body tag */}
      </body>
    </html>
  );
}