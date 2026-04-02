import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drip & Garlic — The Shawarma Joint Your City Needed",
  description:
    "Unapologetically bold shawarma. Wrapped tight. Dripping right. Open late in Brooklyn, NY.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0A0A0A] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}