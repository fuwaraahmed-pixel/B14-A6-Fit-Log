import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { WorkoutProvider } from "./context/WorkoutContext";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";


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
          <Footer />
          <Toaster position="bottom-right"
            toastOptions={{
              success: {
                style: {
                  background: '#101010',
                  color: '#ccff00',
                  border: '1px solid #ccff00',
                }
              },
              error: {
                style: {
                  background: '#101010',
                  color: '#ff6600',
                  border: '1px solid #ff6600',
                }
              }
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}
