import "./globals.css";
import type React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Age of Mythology Guide",
  description: "Your guide to Age of Mythology heroes and units",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto mt-8 px-4 flex-grow">
          {children}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  );
}
