import {
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import CheckBox from "@/components/extends/CheckBox";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { classNames } from "@/utils";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import router from "next/router";
import ToggleButton from "@/components/extends/Button/ToggleButton";

const dataList = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    position: "Software Engineer",
    status: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    position: "Product Manager",
    status: false,
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    position: "Data Analyst",
    status: true,
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    position: "UX Designer",
    status: true,
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    position: "Project Manager",
    status: false,
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    email: "fiona.gallagher@example.com",
    position: "Marketing Specialist",
    status: true,
  },
  {
    id: 7,
    name: "George Costanza",
    email: "george.costanza@example.com",
    position: "Sales Executive",
    status: false,
  },
  {
    id: 8,
    name: "Hannah Baker",
    email: "hannah.baker@example.com",
    position: "Content Writer",
    status: true,
  },
  {
    id: 9,
    name: "Ian Malcolm",
    email: "ian.malcolm@example.com",
    position: "Data Scientist",
    status: true,
  },
  {
    id: 10,
    name: "Julia Roberts",
    email: "julia.roberts@example.com",
    position: "HR Manager",
    status: false,
  },
  {
    id: 11,
    name: "Kevin Hart",
    email: "kevin.hart@example.com",
    position: "Finance Analyst",
    status: true,
  },
  {
    id: 12,
    name: "Laura Croft",
    email: "laura.croft@example.com",
    position: "Web Developer",
    status: true,
  },
  {
    id: 13,
    name: "Michael Scott",
    email: "michael.scott@example.com",
    position: "Office Manager",
    status: false,
  },
  {
    id: 14,
    name: "Nina Simone",
    email: "nina.simone@example.com",
    position: "Graphic Designer",
    status: true,
  },
  {
    id: 15,
    name: "Oscar Isaac",
    email: "oscar.isaac@example.com",
    position: "Network Engineer",
    status: true,
  },
  {
    id: 16,
    name: "Paula Abdul",
    email: "paula.abdul@example.com",
    position: "SEO Specialist",
    status: false,
  },
  {
    id: 17,
    name: "Quentin Tarantino",
    email: "quentin.tarantino@example.com",
    position: "Film Director",
    status: true,
  },
  {
    id: 18,
    name: "Rachel Green",
    email: "rachel.green@example.com",
    position: "Fashion Designer",
    status: false,
  },
  {
    id: 19,
    name: "Steve Rogers",
    email: "steve.rogers@example.com",
    position: "Military Advisor",
    status: true,
  },
  {
    id: 20,
    name: "Tina Fey",
    email: "tina.fey@example.com",
    position: "Comedy Writer",
    status: true,
  },
  {
    id: 21,
    name: "Uma Thurman",
    email: "uma.thurman@example.com",
    position: "Actress",
    status: false,
  },
  {
    id: 22,
    name: "Vin Diesel",
    email: "vin.diesel@example.com",
    position: "Stunt Coordinator",
    status: true,
  },
  {
    id: 23,
    name: "Will Smith",
    email: "will.smith@example.com",
    position: "Actor",
    status: true,
  },
  {
    id: 24,
    name: "Xena Warrior",
    email: "xena.warrior@example.com",
    position: "Warrior",
    status: false,
  },
  {
    id: 25,
    name: "Yoda Master",
    email: "yoda.master@example.com",
    position: "Jedi Master",
    status: true,
  },
  {
    id: 26,
    name: "Zoe Saldana",
    email: "zoe.saldana@example.com",
    position: "Actress",
    status: true,
  },
  {
    id: 27,
    name: "Aaron Paul",
    email: "aaron.paul@example.com",
    position: "Actor",
    status: false,
  },
  {
    id: 28,
    name: "Bella Hadid",
    email: "bella.hadid@example.com",
    position: "Model",
    status: true,
  },
  {
    id: 29,
    name: "Chris Evans",
    email: "chris.evans@example.com",
    position: "Actor",
    status: true,
  },
  {
    id: 30,
    name: "Dwayne Johnson",
    email: "dwayne.johnson@example.com",
    position: "Actor",
    status: false,
  },
];

const ManageStuff = () => {
  return (
    <>
      <div className="p-4 flex flex-1 flex-col gap-2 rounded-md bg-white overflow-auto">
        <div className="flex justify-between items-center">
          <form action="#" method="GET" className="relative hidden md:flex ">
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
          <div className="flex gap-4">
            <div className="px-2 py-1.5 flex justify-center items-center gap-2 border-2 border-gray-300 rounded-md hover:bg-gray-200">
              <EllipsisVerticalIcon className="w-4 h-4" />
              <span className="text-sm">Bulk Action</span>
            </div>
            <div className="p-2 flex-center gap-2 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer">
              <PlusCircleIcon className="w-4 h-4 stroke-white" />
              <span className="text-sm text-white">Add User</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-1 overflow-auto">
          <table className="w-full divide-y divide-gray-300">
            <thead className="bg-white sticky top-0 z-10">
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
            <tbody className="bg-white overflow-auto">
              {dataList.map((data, id) => (
                <tr key={id} className="even:bg-blue-50 hover:bg-gray-300">
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
                    <ToggleButton
                      checked={data.status}
                      handleChange={() => {}}
                    />
                  </td>
                  <td className="whitespace-nowrap text-sm text-gray-500">
                    <Menu>
                      <MenuButton className="">
                        <div className="p-1 border rounded-md hover:bg-white">
                          <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
                        </div>
                      </MenuButton>
                      <MenuItems
                        anchor="bottom end"
                        className="flex flex-col w-20 origin-top bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
                      >
                        <MenuItem>
                          <button className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100">
                            {data.status === true ? "Disable" : "Active"}
                          </button>
                        </MenuItem>
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
    </>
  );
};

export default ManageStuff;
