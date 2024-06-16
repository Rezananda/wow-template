import React from "react";

const Logo = () => {
  return (
    // <div className="flex flex-col gap-0.5">
    //   <div className="font-bold bg-gradient-to-b from-cyan-500 to-blue-500 px-2 text-white text-lg rounded-r-xl w-fit">
    //     BEST
    //   </div>
    //   <div className="bg-blue-500 px-1 py-1 text-sm text-white italic rounded-r-xl rounded-bl-xl">
    //     template
    //   </div>
    // </div>
    <>
      <div className="md:flex hidden items-end border-2 border-sky-500 p-0.5 gap-1">
        <p className="text-2xl font-custom font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-1">
          WOW
        </p>
        <p className="font-custom text-lg font-semibold text-sky-500">
          template
        </p>
      </div>
      <p className="md:hidden text-4xl font-custom font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-1 rounded">
        W
      </p>
    </>
  );
};

export default Logo;
