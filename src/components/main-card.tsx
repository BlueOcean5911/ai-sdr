// components/main-card.tsx

const MainCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative p-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col">{children}</div>
      </div>
    </>
  );
};

export default MainCard;
