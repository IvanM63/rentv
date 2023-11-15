import React, { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpand = () => {
    setExpanded(!expanded);
    //console.log(expanded);
  };
  return (
    <React.Fragment>
      <div className="flex flex-row min-h-screen">
        <Sidebar expanded={expanded} />
        <div className="flex w-screen  flex-col">
          <Header onClick={handleExpand} />
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
