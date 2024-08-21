// app/personas/[id]/page.tsx

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <>{id}</>;
};

export default Page;
