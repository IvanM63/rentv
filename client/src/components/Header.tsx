import { on } from "events";
import React from "react";

import { FaBars, FaMoon, FaSearch } from "react-icons/fa";

export default function Header({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-row w-full p-8 items-cente ">
      <div className="flex flex-1 flex-row items-center ">
        <HeaderItem onClick={onClick}>
          <FaBars className=" fill-other" size={24} />
        </HeaderItem>

        <HeaderItem>
          <FaSearch className="fill-other" size={24}></FaSearch>
        </HeaderItem>
      </div>

      <div className="flex flex-1 flex-row justify-end items-center">
        <HeaderItem>
          <FaMoon className="fill-other" size={24} />
        </HeaderItem>
        <HeaderItem>
          <img
            src="https://avatars.githubusercontent.com/u/55942632?v=4"
            alt="avatar"
            className="rounded-full w-10 h-10"
          />
        </HeaderItem>
      </div>
    </div>
  );
}

const HeaderItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  //console.log(React.Children.count(children));
  return (
    <div
      onClick={onClick}
      className="flex hover:bg-blue-100 rounded-xl w-10 h-10 justify-center 
      items-center cursor-pointer transition-all duration-200"
    >
      {children}
    </div>
  );
};
