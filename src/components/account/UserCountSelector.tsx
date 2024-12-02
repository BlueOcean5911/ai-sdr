interface UserCountSelectorProps {
  userCount: number;
  onChange: (count: number) => void;
}

export const UserCountSelector = ({
  userCount,
  onChange,
}: UserCountSelectorProps) => {
  const handleIncrement = () => onChange(userCount + 1);
  const handleDecrement = () => onChange(userCount > 1 ? userCount - 1 : 1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="max-w-md mx-auto flex flex-col gap-3">
        <label className="text-lg font-medium text-gray-700">
          How many users do you have?
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            className="p-2 border rounded-md hover:bg-gray-50 w-12 h-12"
            disabled={userCount <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={userCount}
            onChange={(e) =>
              onChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-24 text-center border rounded-md p-2 h-12 text-lg"
            min="1"
          />
          <button
            onClick={handleIncrement}
            className="p-2 border rounded-md hover:bg-gray-50 w-12 h-12"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
