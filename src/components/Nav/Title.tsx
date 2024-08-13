export default function NavTitle({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h2 className="title pl-8">{children}</h2>
    </>
  );
}
