import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppUtilsProvider } from "@/context/AppUtils";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Next App With Supabase Aplication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppUtilsProvider>
      <div className="wrapper">
        <Navbar />
        <main className="main">
          <Toaster />
          {children}
        </main>
        <Footer />
      </div>
      </AppUtilsProvider>
      </body>
    </html>
  );
}
