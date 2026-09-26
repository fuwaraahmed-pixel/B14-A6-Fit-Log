import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { WorkoutProvider } from "./context/WorkoutContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FitLog - Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <WorkoutProvider>
          <Navbar />
          {children}
          {/* Toaster যোগ করা হলো যেন নোটিফিকেশন দেখায় */}
          <Toaster position="bottom-right" />
        </WorkoutProvider>
      </body>
    </html>
  );
}
