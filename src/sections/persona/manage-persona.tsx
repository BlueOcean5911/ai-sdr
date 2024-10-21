import { employeeOptions, personaOptions } from "@/data/filter.data";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Select from "react-tailwindcss-select";

const persons = [
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
  {
    name: "John Doe",
    company: "ABC Inc.",
    location: "US",
  },
];

const employeeRange = [
  {
    id: "1",
    name: "1-10",
  },
  {
    id: "2",
    name: "11-50",
  },
  {
    id: "3",
    name: "51-100",
  },
  {
    id: "4",
    name: "101-500",
  },
  {
    id: "5",
    name: "501-1000",
  },
  {
    id: "6",
    name: "1001-5000",
  },
  {
    id: "7",
    name: "5001-10000",
  },
  {
    id: "8",
    name: "10001-50000",
  },
  {
    id: "9",
    name: "50001-100000",
  },
];

const keywords = [
  {
    id: "1",
    name: "marketing",
  },
];

export default function ManagePersona({
  type,
  persona: data,
  children,
}: {
  type: "create" | "edit";
  persona: any | null | undefined;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState(data);

  const [validation, setValidation] = useState({
    job: "",
    industry: "",
    location: "",
    employees: "",
  });

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const save = () => {
    close();
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
          <div className="flex h-full sm:w-full md:w-[720px] items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full h-5/6 rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 flex flex-col"
            >
              <DialogTitle as="h3" className="px-4 py-2">
                {type === "create" ? "Create Persona" : "Edit Persona"}
              </DialogTitle>
              <div className="px-4 py-2 filter flex flex-1 gap-4 bg-gray-100 overflow-auto">
                <div className="flex flex-col gap-4 flex-1 overflow-auto">
                  <div className="flex flex-col gap-2">
                    <label>
                      Persona Name
                      <span className="text-blue-900 mb-2">*</span>
                    </label>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500  sm:text-sm sm:leading-6"
                      type="text"
                      placeholder="e.g. Marketing Leaders"
                      value={persona?.name}
                      onChange={(e) =>
                        setPersona({ ...persona, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>
                      Job Title
                      {/* <span className="text-blue-900 mb-2">*</span> */}
                    </label>
                    <Select
                      value={persona?.title}
                      onChange={(value) =>
                        setPersona({
                          ...persona,
                          title: value,
                        })
                      }
                      options={personaOptions}
                      isSearchable={true}
                      primaryColor={"indigo"}
                      classNames={{
                        menuButton: (value) => {
                          const isDisabled = value?.isDisabled;
                          return `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                            isDisabled
                              ? "bg-gray-200"
                              : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                          }`;
                        },
                        menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                        listItem: (value) => {
                          const isSelected = value?.isSelected;
                          return `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                            isSelected
                              ? `text-white bg-blue-500`
                              : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                          }`;
                        },
                        searchBox:
                          "text-sm w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                        searchIcon:
                          "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
                      }}
                    ></Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>
                      Industry & Keywords
                      {/* <span className="text-blue-900 mb-2">*</span> */}
                    </label>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500  sm:text-sm sm:leading-6"
                      type="text"
                      placeholder="e.g. Marketing Leaders"
                      value={persona?.keyword}
                      onChange={(e) =>
                        setPersona({ ...persona, keyword: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>
                      Location
                      {/* <span className="text-blue-900 mb-2">*</span> */}
                    </label>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500  sm:text-sm sm:leading-6"
                      type="text"
                      placeholder="e.g. Marketing Leaders"
                      value={persona?.location}
                      onChange={(e) =>
                        setPersona({ ...persona, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>
                      Employees
                      {/* <span className="text-blue-900 mb-2">*</span> */}
                    </label>
                    <Select
                      value={persona?.employeeRange}
                      onChange={(value) =>
                        setPersona({
                          ...persona,
                          employeeRange: value,
                        })
                      }
                      options={employeeOptions}
                      isSearchable={true}
                      primaryColor={"indigo"}
                      classNames={{
                        menuButton: (value) => {
                          const isDisabled = value?.isDisabled;
                          return `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                            isDisabled
                              ? "bg-gray-200"
                              : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                          }`;
                        },
                        menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                        listItem: (value) => {
                          const isSelected = value?.isSelected;
                          return `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                            isSelected
                              ? `text-white bg-blue-500`
                              : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                          }`;
                        },
                        searchBox:
                          "text-sm w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                        searchIcon:
                          "absolute w-4 h-4 mt-2.5 pb-0.5 ml-1.5 text-gray-500",
                      }}
                    ></Select>
                  </div>
                </div>
                <div className="results flex flex-col flex-1 gap-1 h-full overflow-auto">
                  <h3 className="px-2">Results</h3>
                  <div className="flex flex-col flex-1 border border-gray-300 rounded-md bg-white overflow-y-auto">
                    {persons.map((person, id) => (
                      <div
                        key={id}
                        className="px-4 py-2 flex flex-col gap-1 rounded-md border border-gray-100 hover:bg-gray-200"
                      >
                        <h4 className="font-bold text-gray-600">
                          {person.name}
                        </h4>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">{person.company}</p>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-3 h-3 stroke-gray-500" />
                            <span className="text-sm">{person.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 flex gap-4 rounded-md bg-gray-100">
                <Button
                  className="p-1 px-4 flex flex-1 justify-center border-2 border-gray-300 rounded-md hover:bg-gray-200"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  className="p-1 px-4 flex-1 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                  onClick={save}
                >
                  Save
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
