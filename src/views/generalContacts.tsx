"use client";

import ContactItem from "@/sections/contacts/ContactItem";
import { ContactInCadence } from "@/services/contactsService";

export default function GeneralContacts({
  contacts,
  pause,
  resume,
  onDeleteOne,
}: {
  contacts: ContactInCadence[];
  pause: (contactId: string, cadenceId: string) => void;
  resume: (contactId: string, cadenceId: string) => void;
  onDeleteOne: (id: string) => void;
}) {
  return (
    <>
      {/* Table */}
      <div className="flex flex-1 flex-col w-full align-middle overflow-auto">
        <div className="w-full h-full border rounded-md overflow-auto">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <ContactItem
                key={index}
                contact={contact}
                pause={pause}
                resume={resume}
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
