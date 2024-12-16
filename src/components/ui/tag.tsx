const Tag: React.FC<{ children: React.ReactNode; color: string }> = ({
  children,
  color,
}) => (
  <span className={`px-2 py-1 ${color} rounded-full text-xs`}>{children}</span>
);

export default Tag;
