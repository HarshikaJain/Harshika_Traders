import "./globals.css";
import Script from 'next/script';
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
        
        {/* Load Razorpay Standard Checkout SDK securely onto the browser frame */}
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}