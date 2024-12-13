"use client";

import SortableHeader from "@/components/ui/SortableHeader";
import ContactItem from "@/sections/contacts/ContactItem";
import { ContactInCadence } from "@/services/contactsService";
import { LEAD_STAGE } from "@/types/enums";

export default function GeneralContacts({
  contacts,
  pause,
  resume,
  remove,
  finish,
}: {
  contacts: ContactInCadence[];
  pause: (contactId: string, cadenceId: string) => void;
  resume: (contactId: string, cadenceId: string) => void;
  remove: (contactId: string, cadenceId: string) => void;
  finish: (contactId: string, cadenceId: string, leadStage: LEAD_STAGE) => void;
}) {
  return (
    <>
      {/* Table */}
      <div className="flex flex-1 flex-col w-full align-middle border rounded-md overflow-auto">
        <table className="flex-1 w-full">
          <thead className="sticky top-0 z-10 bg-gray-50 shadow-md">
            <tr>
              <th></th>
              <th>
                <SortableHeader
                  label="to"
                  value="To"
                  orderBy={""}
                  isAscending={true}
                  handleChangeSort={() => {}}
                />
              </th>
              <th>
                <SortableHeader
                  label="status"
                  value="status"
                  orderBy={""}
                  isAscending={true}
                  handleChangeSort={() => {}}
                />
              </th>
              <th>
                <SortableHeader
                  label="step"
                  value="step"
                  orderBy={""}
                  isAscending={true}
                  handleChangeSort={() => {}}
                />
              </th>
              <th>
                <SortableHeader
                  label="title & company"
                  value="titleAndCompany"
                  orderBy={""}
                  isAscending={true}
                  handleChangeSort={() => {}}
                />
              </th>
              <th>
                <SortableHeader
                  label="created At"
                  value="createdAt"
                  orderBy={""}
                  isAscending={true}
                  handleChangeSort={() => {}}
                />
              </th>
              <th>
                <SortableHeader
                  label="owner"
                  value="ownerId"
                  orderBy={""}
                  isAscending={true}
                  handleChangeSort={() => {}}
                />
              </th>
              <th className="py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <ContactItem
                  key={index}
                  contact={contact}
                  pause={pause}
                  resume={resume}
                  remove={remove}
                  finish={finish}
                />
              ))
            ) : (
              <div className="w-full h-full flex-center">
                <p className="text-gray-900 text-sm">No contacts found.</p>
              </div>
            )}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
