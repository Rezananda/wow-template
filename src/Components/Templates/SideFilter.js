import React from "react";
import Icon from "../../Assets/Icon/Icon";
import Button from "../Button/Button";

const SideFilter = ({ isMenuOpen, setIsMenuOpen, label, children }) => {
  return (
    <div
      className={`fixed overflow-y-scroll font-custom top-0 left-0 w-full h-full z-30 bg-white shadow-lg transform transition-transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex flex-col">
        <div className="flex w-full items-center justify-between">
          <p className="text-black text-2xl font-medium py-2">{label}</p>
          <Button
            type={`icon`}
            className={`!p-0 !flex `}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={"x"} className={"h-10 w-10 text-black"} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SideFilter;
