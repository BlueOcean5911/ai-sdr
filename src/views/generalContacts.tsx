"use client";

import ContactItem from "@/sections/contacts/ContactItem";
import { ContactInCadence } from "@/services/contactsService";

export default function GeneralContacts({
  contacts,
}: {
  contacts: ContactInCadence[];
}) {
  return (
    <>
      {/* Table */}
      <div className="flex flex-1 flex-col w-full py-2 align-middle overflow-auto">
        <div className="w-full h-full border rounded-md overflow-auto">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <ContactItem key={index} contact={contact} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No contacts found.</p>
          )}
        </div>
      </div>
    </>
  );
}
