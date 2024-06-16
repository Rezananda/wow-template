// ScrollToTopButton.js
import React, { useContext, useState } from "react";
import Icon from "../../Assets/Icon/Icon";
import { ScrollContext } from "../../Context/ScrollProvider";
import Modal from "../Modal/Modal";
import Tooltip from "../Tooltip/Tooltip";
import Button from "./Button";

const ScrollToTopButton = () => {
  const isScrolled = useContext(ScrollContext);
  const [modal, setModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="fixed md:bottom-12 bottom-4 z-20 right-7 flex flex-col gap-2 items-center">
        {isScrolled && (
          <Button
            type={"icon"}
            size={"medium"}
            className={
              "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 !p-2"
            }
            onClick={scrollToTop}
          >
            <Icon name={"chevronUp"} className={"h-8 w-8 text-white"} />
          </Button>
        )}
        <div className="">
          <Tooltip
            message={`Donasi Sekarang!`}
            className={"mt-28"}
            type={"hover"}
          >
            <img
              src="https://substackcdn.com/image/fetch/w_96,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F01c81f8c-18c9-47d7-b7ad-c04058016626_225x225.png"
              className="h-16 w-16 hover:scale-125 ease-in duration-150 cursor-pointer"
              alt="saweria"
              onClick={() => setModal(!modal)}
            />
          </Tooltip>
        </div>
      </div>
      {modal && (
        <Modal>
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white">
            <div className="px-6 py-4 flex flex-col gap-2">
              <h3 className="text-3xl font-semibold font-custom">
                Dukunganmu sangat berarti untuk kami ❤️
              </h3>
              <div className="flex flex-col space-y-4">
                <>
                  <p className=" text-base text-gray-500 leading-relaxed font-custom">
                    Kamu dapat mendukung kami agar terus bisa menghadirkan
                    template-template berkualitas melalui{" "}
                    <span className="">
                      <a
                        className="text-orange-500"
                        href="https://saweria.co/rezananda26"
                        target={"_blank"}
                        without
                        rel="noreferrer"
                      >
                        https://saweria.co/rezananda26
                      </a>
                    </span>
                  </p>
                </>
              </div>
            </div>
            <div className="flex items-center justify-end p-4 gap-2">
              <Button
                type={"outline"}
                size={"medium"}
                onClick={() => setModal(!modal)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ScrollToTopButton;
