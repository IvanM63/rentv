import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface InputFieldCustomProps {
  title: string;
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  type?: string;
  options?: React.OptionHTMLAttributes<HTMLOptionElement>[];
}

const InputFieldCustom: React.FC<InputFieldCustomProps> = (props) => {
  const baseStyle =
    "w-full p-2 transition-all duration-300 text-sm overflow-auto rounded-md border-none text-black focus:outline-none focus:ring-2 focus:ring-green- ";
  return (
    <div>
      <span className="font-semibold text-sm">{props.title}</span>
      <div className="border relative border-gray-400 rounded-md  ">
        {!props.type || props.type === "text" ? (
          <input
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className={baseStyle + "bg-transparent"}
            type="text"
            required
          />
        ) : props.type === "select" ? (
          <select
            className={baseStyle}
            onChange={(e) => props.onChange(e.target.value)}
            value={props.value}
          >
            {props.options?.map((option, optionIdx) => {
              return (
                <option key={optionIdx} {...option}>
                  {option.value}
                </option>
              );
            })}
          </select>
        ) : props.type === "textarea" ? (
          <textarea
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className={baseStyle + "bg-transparent"}
            rows={5}
          />
        ) : null}
      </div>

      <div className="flex absolute right-4 top-3 ">
        <FaSearch size={18} />
      </div>
    </div>
  );
};

export default InputFieldCustom;
