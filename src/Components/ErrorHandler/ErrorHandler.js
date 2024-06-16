// ErrorHandler.js
import React from "react";
import Icon from "../../Assets/Icon/Icon";
import Button from "../Button/Button";

const ErrorHandler = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className="flex flex-col w-full items-center">
      <p className="font-custom text-xs text-gray-500">Error: {error}</p>
      <Button
        type={"icon"}
        size={"small"}
        className="!text-red-500 !flex !items-center gap-1 font-normal"
        onClick={onRetry}
      >
        <Icon name={"arrow-counterclockwise"} className={"h-5 w-5"} />
        Muat Ulang
      </Button>
    </div>
  );
};

export default ErrorHandler;
