import type { Metadata } from "next";
import { roboto } from "@/utils/fonts";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

import MainProvider from "@/contexts";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIVIO",
  description: "AI-Powered Sales Development Representative",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  other: {
    "Content-Security-Policy": "upgrade-insecure-requests",
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
          <MainProvider>{children}</MainProvider>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </body>
    </html>
  );
}
