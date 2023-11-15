"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";

interface MyButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  color: string;
  onClick?: () => void;
  disabled?: boolean;
}

const MyButton: React.FC<MyButtonProps> = (props) => {
  return (
    <div
      className={`flex flex-row rounded-md p-2 text-white items-center text-md
          justify-center space-x-2 transition-all duration-200
         active:text-gray-100 active:shadow-inner 
           ${props.color}
           ${props.disabled ? "opacity-50" : "active:scale-95 cursor-pointer"} 
           `}
    >
      {props.icon}
      <button
        disabled={props.disabled ? props.disabled : false}
        onClick={props.onClick!}
      >
        {props.title}
      </button>
    </div>
  );
};

export default MyButton;
