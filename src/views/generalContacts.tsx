"use client";

import ContactItem from "@/sections/contacts/ContactItem";
import {
  ContactInCadence,
  updateCadenceState,
} from "@/services/contactsService";

export default function GeneralContacts({
  contacts,
  handleUpdateCadenceState,
  onDeleteOne,
}: {
  contacts: ContactInCadence[];
  handleUpdateCadenceState: (id: string, status: string) => void;
  onDeleteOne: (id: string) => void;
}) {
  return (
    <>
      {/* Table */}
      <div className="flex flex-1 flex-col w-full py-2 align-middle overflow-auto">
        <div className="w-full h-full border rounded-md overflow-auto">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <ContactItem
                key={index}
                contact={contact}
                handleUpdate={(id: string, status: string) => {
                  handleUpdateCadenceState(id, status);
                }}
                onDelete={(id: string) => onDeleteOne(id)}
              />
            ))
          ) : (
            <div className="w-full h-full flex-center">
              <p className="text-gray-900 text-sm">No contacts found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
