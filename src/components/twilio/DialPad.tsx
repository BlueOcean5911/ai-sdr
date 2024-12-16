import React, { useState } from "react";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import { X } from "lucide-react";

interface DialPadProps {
  onDial: (phoneNumber: string) => void;
  onClose: () => void;
}

const DialPad: React.FC<DialPadProps> = ({ onDial, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleNumberClick = (num: string) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleDelete = () => {
    const position = phoneNumber.length - 1;
    setPhoneNumber((prev) => prev.substring(0, position));
  };

  const handleDial = () => {
    onDial(phoneNumber);
    setPhoneNumber("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-semibold">Enter the number</h4>
          <button
            onClick={onClose}
            className="right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 mb-4 border text-center text-xl"
          />

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
              <button
                key={num}
                className="w-16 h-16 text-xl border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDial}
              className="w-16 h-16 p-4 border rounded-lg hover:bg-gray-100"
            >
              <PhoneIcon className="w-8 h-8 text-green-500" />
            </button>
            <button
              onClick={() => handleNumberClick("+")}
              className="w-16 h-16 p-4 border rounded-lg hover:bg-gray-100"
            >
              +
            </button>
            <button
              onClick={handleDelete}
              className="w-16 h-16 p-4 border rounded-lg hover:bg-gray-100"
            >
              <BackspaceIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialPad;
