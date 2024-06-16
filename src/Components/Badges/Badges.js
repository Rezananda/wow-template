import React from "react";

const Badges = ({ size, className, children }) => {
  switch (size) {
    case "large":
      return (
        <p
          className={`${className} flex items-center justify-center px-4 py-2 text-lg font-custom bg-gray-100 rounded border border-gray-300`}
        >
          {children}
        </p>
      );
    case "medium":
      return (
        <p
          className={`${className} flex items-center justify-center px-3 py-1 font-custom bg-gray-100 rounded border border-gray-300`}
        >
          {children}
        </p>
      );
    case "small":
      return (
        <p
          className={`${className} flex items-center justify-center px-2 text-sm font-custom bg-gray-100 rounded border border-gray-300`}
        >
          {children}
        </p>
      );

    default:
      <p
        className={`${className} flex items-center justify-center px-3 py-1 font-custom bg-gray-300 rounded border border-gray-500`}
      >
        {children}
      </p>;
  }
};

export default Badges;
