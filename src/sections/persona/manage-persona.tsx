import Select from "@/components/extends/Select/default";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

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
              className="w-full h-5/6 rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 flex flex-col"
            >
              <DialogTitle as="h2">
                {type === "create" ? "Create Persona" : "Edit Persona"}
              </DialogTitle>
              <div className="filter flex gap-2 flex-1 overflow-auto mt-2">
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
                      <span className="text-blue-900 mb-2">*</span>
                    </label>
                    <input
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500  sm:text-sm sm:leading-6"
                      type="text"
                      placeholder="e.g. Marketing Leaders"
                      value={persona?.job}
                      onChange={(e) =>
                        setPersona({ ...persona, job: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>
                      Industry & Keywords
                      <span className="text-blue-900 mb-2">*</span>
                    </label>
                    <Select data={keywords} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>
                      Location
                      <span className="text-blue-900 mb-2">*</span>
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
                      <span className="text-blue-900 mb-2">*</span>
                    </label>
                    <Select data={employeeRange} />
                  </div>
                </div>
                <div className="results flex flex-col flex-1 h-full overflow-auto">
                  <h3 className="px-2">Results</h3>
                  <div className="border-b-2 border-gray-100" />
                  <div className=" p-2 flex flex-col flex-1 overflow-y-auto">
                    {persons.map((person, id) => (
                      <div
                        key={id}
                        className="border-2 border-gray-100 m-1 p-2 rounded-md hover:shadow-md"
                      >
                        <h4 className="font-bold text-gray-600">
                          {person.name}
                        </h4>
                        <p className="text-sm">{person.company}</p>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-3 h-3 stroke-gray-500" />
                          <span className="text-sm">{person.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <Button
                  className="btn-secondary p-2 px-4 flex-1"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button className="btn-primary p-2 px-4 flex-1" onClick={save}>
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
