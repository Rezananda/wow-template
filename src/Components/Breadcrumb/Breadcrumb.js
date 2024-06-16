import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const Breadcrumb = ({ templateName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const crumbs = [
    { name: "Beranda", path: "/" },
    { name: "Template", path: "/all-template" },
    { name: templateName, path: location.pathname },
  ];
  return (
    <div className="flex space-x-2 text-gray-700 overflow-hidden">
      {crumbs.map((crumb, index) => (
        <span key={index} className="flex items-center space-x-2">
          {index !== 0 && <span>/</span>}
          {index !== crumbs.length - 1 ? (
            <Button
              type={"link"}
              onClick={() => navigate(crumb.path)}
              className={"!p-0 !font-normal"}
              size={"large"}
            >
              {crumb.name}
            </Button>
          ) : (
            <p className="text-lg truncate">{crumb.name}</p>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
