import React from "react";

const Layout = ({ children, className }) => {
  return <div className={`md:px-6 px-3 ${className}`}>{children}</div>;
};

export default Layout;
