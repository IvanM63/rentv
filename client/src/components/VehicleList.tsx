import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface VehicleListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  items: Vehicle[];
  onChanges: (value: Vehicle) => void;
}

const VehicleList: React.FC<VehicleListProps> = (props) => {
  const [selected, setSelected] = useState(props.items[0]);

  React.useEffect(() => {
    props.onChanges(selected);
    //console.log(selected);
  }, [selected]);
  return (
    <div className="flex flex-col w-full z-50">
      <strong className="text-text text-base font-[600]">{props.title}</strong>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaAngleDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {props.items.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-200 text-blue-900" : "text-other"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <FaAngleDown className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default VehicleList;

interface Vehicle {
  id: number;
  uuid: string;
  name: string;
  brand: string;
  type: string;
  status: string;
  fuel_consumption: string;
  last_service_date: string;
}
