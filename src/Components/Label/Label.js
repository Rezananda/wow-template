import React from "react";

const Label = ({ type, className, children }) => {
  switch (type) {
    case "headline":
      return (
        <span className={`${className} font-custom text-5xl font-semibold`}>
          {children}
        </span>
      );
    case "headline-description":
      return <p className={`${className} font-custom text-2xl`}>{children}</p>;
    case "card-title":
      return (
        <p className={`${className} font-custom text-xl font-semibold`}>
          {children}
        </p>
      );
    case "card-desc":
      return (
        <p
          className={`${className} font-custom text-lg line-clamp-3 text-gray-500`}
        >
          {children}
        </p>
      );
    case "section-title":
      return (
        <p className={`${className} font-custom text-3xl font-semibold`}>
          {children}
        </p>
      );
    case "section-desc":
      return <p className={`${className} font-custom text-xl`}>{children}</p>;

    default:
      return <p className={`${className} text-4xl font-bold`}>{children}</p>;
  }
};

export default Label;
