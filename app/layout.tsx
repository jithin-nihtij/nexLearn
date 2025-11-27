import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientWrapper from "@/provider/QueryClientWrapper";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "NexLearn",
  description: "Futuristic Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>
        <Toaster />
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </body>
    </html>
  );
}
