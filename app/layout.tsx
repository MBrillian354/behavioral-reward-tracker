import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reward Tracker - Pelacak Reward Perilaku",
  description: "Sistem pelacak reward dan punishment untuk membangun kebiasaan baik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-[var(--md-surface)]">
        {children}
      </body>
    </html>
  );
}
