export default function NavTitle({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h2 className="title">{children}</h2>
    </>
  );
}
