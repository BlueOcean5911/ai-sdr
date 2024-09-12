export default function NavTitle({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h3 className="title px-20 md:px-6">{children}</h3>
    </>
  );
}
