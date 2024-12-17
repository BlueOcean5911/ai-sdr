import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Phone, Plus, Delete, X } from "lucide-react";

interface DialPadProps {
  isOpen: boolean;
  onClose: () => void;
  onDial: (phoneNumber: string) => void;
}

const DialPad: React.FC<DialPadProps> = ({ isOpen, onClose, onDial }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleNumberClick = (num: string) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleDial = () => {
    onDial(phoneNumber);
    setPhoneNumber("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Enter the number
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-primary border-r-0 border-l-0 border-t-0 text-lg rounded-none focus:border-blue-500 focus:ring-0"
              placeholder="Phone number"
            />

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  className="w-16 h-16 flex m-auto items-center justify-center text-2xl font-medium bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDial}
                className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Phone className="w-8 h-8 stroke-white" />
              </button>
              <button
                onClick={() => handleNumberClick("+")}
                className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full text-2xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus className="w-8 h-8 " />
              </button>
              <button
                onClick={handleDelete}
                className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Delete className="w-8 h-8" />
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DialPad;
