import ThemeToggle from "@/components/Theme/ThemeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed z-50 top-0 right-0 mt-4 mr-4">
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
