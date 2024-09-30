import type { Metadata } from "next";
import { space_grotesk, roboto } from "@/utils/fonts";
import { ToastContainer, toast } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "AIVIO",
  description: "AI-Powered Sales Development Representative",
  icons: {
    icon: "/favicon.ico", // Default icon
    shortcut: "/favicon.ico", // Shortcut icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto}>
        <NextTopLoader color="#4571B6" />
        <main className="font-roboto h-dvh flex">
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
