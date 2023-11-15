import React, { ReactNode, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { FaCar, FaHome, FaUser, FaDatabase } from "react-icons/fa";
import { FaGear, FaUserAstronaut } from "react-icons/fa6";
import { ThunkDispatch } from "@reduxjs/toolkit";

const Sidebar = ({ expanded }: { expanded: boolean }) => {
  const location = useLocation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const userRole = user ? user.role : null;

  useEffect(() => {
    if (user) {
      console.log("Logged in as " + userRole);
    }
  }, [userRole]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className=" flex ">
      <nav
        className={`flex flex-col flex-wrap h-full border-r shadow-md transition-all duration-200
        ${expanded ? " w-72 p-8" : "w-16 p-2"}
      `}
      >
        <div className="flex flex-row items-center">
          <h1
            className={`font-bold ml-2 transition-all duration-300 text-other
          ${expanded ? "text-4xl" : "text-[0] "}`}
          >
            RentV
          </h1>
        </div>
        <div className="flex border-b">
          <ul className="flex-1 my-4">
            <li>
              <NavLink to={"/dashboard"}>
                <SidebarItem
                  icon={
                    <FaHome
                      className={
                        location.pathname === "/dashboard"
                          ? "fill-white"
                          : "fill-primary"
                      }
                      size={24}
                    />
                  }
                  text={expanded ? "Dashboard" : ""}
                  active={location.pathname === "/dashboard"}
                  expanded={expanded}
                />
              </NavLink>
            </li>
            <li>
              <NavLink to={"/request-rent"}>
                <SidebarItem
                  icon={
                    <FaCar
                      className={
                        location.pathname === "/request-rent"
                          ? "fill-white"
                          : "fill-primary"
                      }
                      size={24}
                    />
                  }
                  text={expanded ? "Request Rent" : ""}
                  active={location.pathname === "/request-rent"}
                  expanded={expanded}
                />
              </NavLink>
            </li>
            <li>
              <NavLink to={"/supervisor"}>
                <SidebarItem
                  icon={
                    <FaUserAstronaut
                      className={
                        location.pathname === "/supervisor"
                          ? "fill-white"
                          : "fill-primary"
                      }
                      size={24}
                    />
                  }
                  text={expanded ? "Supervisor" : ""}
                  active={location.pathname === "/supervisor"}
                  expanded={expanded}
                />
              </NavLink>
            </li>
            <li>
              <NavLink to={"/booking-list"}>
                <SidebarItem
                  icon={
                    <FaDatabase
                      className={
                        location.pathname === "/booking-list"
                          ? "fill-white"
                          : "fill-primary"
                      }
                      size={24}
                    />
                  }
                  text={expanded ? "Booking List" : ""}
                  active={location.pathname === "/booking-list"}
                  expanded={expanded}
                />
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex border-b">
          <ul className="flex-1 my-4">
            <li>
              <NavLink to={"/setting"}>
                <SidebarItem
                  icon={<FaUser className={"fill-white"} size={24} />}
                  text={expanded ? userRole : ""}
                  active={true}
                  expanded={expanded}
                />
              </NavLink>
              <li>
                <button className="w-full" onClick={logout}>
                  <SidebarItem
                    icon={<FaGear className={"fill-white"} size={24} />}
                    text={expanded ? "Logout" : ""}
                    active={true}
                    expanded={expanded}
                  />
                </button>
              </li>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export const SidebarItem = ({
  icon,
  text,
  active,
  expanded,
  color,
}: {
  icon: ReactNode;
  text?: string;
  active: boolean;
  expanded: boolean;
  color?: string;
}) => {
  return (
    <div
      className={`flex flex-row items-center my-4 p-2 rounded-lg cursor-pointer transition-colors duration-300
    ${active ? "text-white bg-primary" : "text-primary hover:bg-blue-200 "}
    ${!text ? "" : ""}
    `}
    >
      {icon}
      {text ? <span className="ml-2 text-base">{text}</span> : ""}
    </div>
  );
};

export default Sidebar;
