import React, { useEffect } from "react";
import "../../index.css";

const Tooltip = ({
  message,
  children,
  className,
  type,
  isVisible,
  setIsVisible,
}) => {
  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // 2000 milliseconds = 2 seconds
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <>
      {type === "hover" ? (
        <div className="group relative flex max-w-max flex-col items-center justify-center">
          {children}
          <div
            className={`${className} absolute z-30 left-1/2  ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 group-hover:scale-100`}
          >
            <div className="flex max-w-xs flex-col items-center shadow-lg">
              <div className="clip-bottom h-2 w-4 bg-gray-800"></div>
              <div className="rounded bg-gray-800 p-2 text-center text-xs text-white">
                {message}
              </div>
            </div>
          </div>
        </div>
      ) : type === "click" ? (
        <div
          className={`${className} absolute z-30 left-1/2 ml-auto mr-auto min-w-max -translate-x-1/2 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-500`}
        >
          <div className="flex max-w-xs flex-col items-center shadow-lg">
            <div className="clip-bottom h-2 w-4 bg-gray-800"></div>
            <div className="rounded bg-gray-800 p-2 text-center text-xs text-white">
              {message}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Tooltip;
