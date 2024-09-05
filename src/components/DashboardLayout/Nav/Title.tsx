export default function NavTitle({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h3 className="title px-4">{children}</h3>
    </>
  );
}
