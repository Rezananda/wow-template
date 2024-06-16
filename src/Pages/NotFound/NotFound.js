import React from "react";
import Navbar from "../../Components/Navbar/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center font-custom text-gray-500 font-semibold -mt-20">
        <div className="flex flex-col justify-center items-center gap-2">
          <img
            width={64}
            height={64}
            src="https://img.icons8.com/pastel-glyph/64/page-not-found--v2.png"
            alt="page-not-found--v2"
          />
          Halaman Tidak Ditemukan
        </div>
      </div>
    </>
  );
};

export default NotFound;
