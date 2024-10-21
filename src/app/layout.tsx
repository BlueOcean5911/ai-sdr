import type { Metadata } from "next";
import { roboto } from "@/utils/fonts";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head"; // Import Head component

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
      <Head>
        {/* Add the Content Security Policy meta tag here */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <body className={roboto}>
        <NextTopLoader color="#4571B6" />
        <main className="font-roboto h-dvh flex">
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </main>
        <ToastContainer autoClose={2000} />
      </body>
    </html>
  );
}
