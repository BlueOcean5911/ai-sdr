import {
  ArrowPathIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import CheckBox from "@/components/extends/CheckBox";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { classNames } from "@/utils";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import router from "next/router";

const dataList = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    position: "Software Engineer",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    position: "Product Manager",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    position: "Data Analyst",
    status: "Active",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    position: "UX Designer",
    status: "Active",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    position: "Project Manager",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    email: "fiona.gallagher@example.com",
    position: "Marketing Specialist",
    status: "Active",
  },
  {
    id: 7,
    name: "George Costanza",
    email: "george.costanza@example.com",
    position: "Sales Executive",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Hannah Baker",
    email: "hannah.baker@example.com",
    position: "Content Writer",
    status: "Active",
  },
  {
    id: 9,
    name: "Ian Malcolm",
    email: "ian.malcolm@example.com",
    position: "Data Scientist",
    status: "Active",
  },
  {
    id: 10,
    name: "Julia Roberts",
    email: "julia.roberts@example.com",
    position: "HR Manager",
    status: "Inactive",
  },
  {
    id: 11,
    name: "Kevin Hart",
    email: "kevin.hart@example.com",
    position: "Finance Analyst",
    status: "Active",
  },
  {
    id: 12,
    name: "Laura Croft",
    email: "laura.croft@example.com",
    position: "Web Developer",
    status: "Active",
  },
  {
    id: 13,
    name: "Michael Scott",
    email: "michael.scott@example.com",
    position: "Office Manager",
    status: "Inactive",
  },
  {
    id: 14,
    name: "Nina Simone",
    email: "nina.simone@example.com",
    position: "Graphic Designer",
    status: "Active",
  },
  {
    id: 15,
    name: "Oscar Isaac",
    email: "oscar.isaac@example.com",
    position: "Network Engineer",
    status: "Active",
  },
  {
    id: 16,
    name: "Paula Abdul",
    email: "paula.abdul@example.com",
    position: "SEO Specialist",
    status: "Inactive",
  },
  {
    id: 17,
    name: "Quentin Tarantino",
    email: "quentin.tarantino@example.com",
    position: "Film Director",
    status: "Active",
  },
  {
    id: 18,
    name: "Rachel Green",
    email: "rachel.green@example.com",
    position: "Fashion Designer",
    status: "Inactive",
  },
  {
    id: 19,
    name: "Steve Rogers",
    email: "steve.rogers@example.com",
    position: "Military Advisor",
    status: "Active",
  },
  {
    id: 20,
    name: "Tina Fey",
    email: "tina.fey@example.com",
    position: "Comedy Writer",
    status: "Active",
  },
  {
    id: 21,
    name: "Uma Thurman",
    email: "uma.thurman@example.com",
    position: "Actress",
    status: "Inactive",
  },
  {
    id: 22,
    name: "Vin Diesel",
    email: "vin.diesel@example.com",
    position: "Stunt Coordinator",
    status: "Active",
  },
  {
    id: 23,
    name: "Will Smith",
    email: "will.smith@example.com",
    position: "Actor",
    status: "Active",
  },
  {
    id: 24,
    name: "Xena Warrior",
    email: "xena.warrior@example.com",
    position: "Warrior",
    status: "Inactive",
  },
  {
    id: 25,
    name: "Yoda Master",
    email: "yoda.master@example.com",
    position: "Jedi Master",
    status: "Active",
  },
  {
    id: 26,
    name: "Zoe Saldana",
    email: "zoe.saldana@example.com",
    position: "Actress",
    status: "Active",
  },
  {
    id: 27,
    name: "Aaron Paul",
    email: "aaron.paul@example.com",
    position: "Actor",
    status: "Inactive",
  },
  {
    id: 28,
    name: "Bella Hadid",
    email: "bella.hadid@example.com",
    position: "Model",
    status: "Active",
  },
  {
    id: 29,
    name: "Chris Evans",
    email: "chris.evans@example.com",
    position: "Actor",
    status: "Active",
  },
  {
    id: 30,
    name: "Dwayne Johnson",
    email: "dwayne.johnson@example.com",
    position: "Actor",
    status: "Inactive",
  },
];

const ManageStuff = () => {
  return (
    <>
      <div className="flex flex-1 gap-4">
        <div className="flex flex-1 overflow-auto">
          <div className="p-4 flex flex-col flex-1">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
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
                <div className="flex flex-4 gap-4">
                  <div className="btn-secondary flex-center gap-2 p-2">
                    <EllipsisVerticalIcon className="w-4 h-4" />
                    <span>Bulk Action</span>
                  </div>
                  <div className="btn-primary flex-center gap-2 p-2 cursor-pointer">
                    <PlusCircleIcon className="w-4 h-4 stroke-white" />
                    Add User
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="px-4 sm:px-6 lg:px-8 flex-1">
              <div className="flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Position
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {dataList.map((data, id) => (
                          <tr
                            key={id}
                            className="even:bg-blue-50 hover:bg-gray-100 "
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 rounded-l-md">
                              {data.name}
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                              {data.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {data.position}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span
                                className={classNames(
                                  "p-1 rounded-md text-white",
                                  data.status === "Active"
                                    ? "bg-blue-600"
                                    : "bg-orange-500"
                                )}
                              >
                                {data.status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap text-sm text-gray-500">
                              <Menu>
                                <MenuButton className="">
                                  <div className="p-1 border rounded-md hover:border-blue-600">
                                    <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
                                  </div>
                                </MenuButton>
                                <MenuItems
                                  anchor="bottom end"
                                  className="flex flex-col w-20 origin-top bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
                                >
                                  <MenuItem>
                                    <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                                      Edit
                                    </button>
                                  </MenuItem>
                                  <MenuItem>
                                    <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                                      Delete
                                    </button>
                                  </MenuItem>
                                </MenuItems>
                              </Menu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageStuff;
