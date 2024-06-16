import React from "react";

const Button = ({
  type,
  size,
  icon,
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Determine button classes based on type
  let buttonClasses = "rounded-full font-custom font-bold focus:outline-none";
  switch (type) {
    case "fill":
      buttonClasses +=
        " bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-white";
      break;
    case "outline":
      buttonClasses += " border border-blue-500 text-blue-500 ";
      break;
    case "link":
      buttonClasses += " text-blue-500 hover:underline";
      break;
    case "icon":
      buttonClasses += " text-blue-500 p-2";
      break;
    default:
      buttonClasses +=
        " bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-white";
  }

  // Determine button size classes
  switch (size) {
    case "small":
      buttonClasses += " px-3 py-1 text-sm";
      break;
    case "medium":
      buttonClasses += " px-4 py-2 text-base";
      break;
    case "large":
      buttonClasses += " px-5 py-3 text-lg";
      break;
    default:
      buttonClasses += " px-6 py-2 text-base";
  }

  return (
    <button
      className={`${className} ${buttonClasses} `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon && !children && icon}
      {children && children}
    </button>
  );
};

export default Button;
