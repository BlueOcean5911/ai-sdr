import type { Metadata } from "next";
import { space_grotesk } from "@/utils/fonts";
import { ToastContainer, toast } from "react-toastify";

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
      <body className={space_grotesk}>
        <main className="font-space_grotesk h-dvh flex">
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
