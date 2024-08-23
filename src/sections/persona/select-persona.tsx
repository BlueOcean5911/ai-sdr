import Select from "@/components/Select/default";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { defaultPersonas } from "@/views/personas";
import CheckBox from "@/components/CheckBox";

export default function SelectPersona({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [personas, setPersonas] = useState(defaultPersonas);
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={open}>{children}</div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-500 opacity-75" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <div className="flex h-full sm:w-full w-5/6 items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full h-5/6 rounded-xl bg-white p-12 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <form
                  action="#"
                  method="GET"
                  className="relative hidden md:flex "
                >
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  />
                  <input
                    id="search-field"
                    name="search"
                    type="search"
                    placeholder="Search..."
                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  />
                </form>
                <div className="flex items-center gap-2">
                  <div className="btn-secondary p-2">Go back</div>
                  <div className="btn-primary p-2">Confirm Selection</div>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="mt-4 min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        Personal Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Job Titles
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Industry & Keywords
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Employees
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Lead Count
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white overflow-auto ">
                    {personas.map((item: any, id: any) => (
                      <tr
                        key={id}
                        className="even:bg-olive-green-100 hover:bg-gray-100 select-none"
                        // onClick={() => }
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                          <div className="flex items-center gap-2">
                            <CheckBox content="" id={item.id} key={item.id} />
                            {item.id}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {item.jobTitle}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.keywords}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.createdDate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.location}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.industrySize}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.leadCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}