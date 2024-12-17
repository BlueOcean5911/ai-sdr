interface UserCountSelectorProps {
  userCount: number;
  onChange: (count: number) => void;
}

const UserCountSelector = ({ userCount, onChange }: UserCountSelectorProps) => {
  const handleIncrement = () => onChange(userCount + 1);
  const handleDecrement = () => onChange(userCount > 1 ? userCount - 1 : 1);

  return (
    <div className="p-2 flex flex-col md:flex-row justify-between items-center gap-3 border-b bg-white mb-4">
      <div>
        <label className="text-lg text-gray-700">Edtions & Users</label>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-base font-medium text-gray-700">
          How many users do you have?
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            className="p-1 border rounded-md hover:bg-gray-50 w-8 h-8"
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
            className="input-primary w-16 text-center border rounded-md p-1 h-8"
            min="1"
          />
          <button
            onClick={handleIncrement}
            className="p-1 border rounded-md hover:bg-gray-50 w-8 h-8"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCountSelector;
