import AuthLayout from "@/layouts/AuthLayout";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthLayout>
      <Suspense>{children}</Suspense>
    </AuthLayout>
  );
}
