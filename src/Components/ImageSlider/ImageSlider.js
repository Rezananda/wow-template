import React, { useEffect, useRef, useState } from "react";
import Icon from "../../Assets/Icon/Icon";
import "../../index.css";

const ImageSlider = ({ images }) => {
  const sliderRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const checkFullScreen = () => {
    setIsFullscreen(document.fullscreenElement === sliderRef.current);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", checkFullScreen);
    return () => {
      document.removeEventListener("fullscreenchange", checkFullScreen);
    };
  }, []);

  const handleFullScreen = (elem) => {
    if (isFullscreen === false) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div
      className="w-full relative border border-gray-300 rounded-lg shadow-md"
      onMouseEnter={() => setFullScreen(true)}
      onMouseLeave={() => setFullScreen(false)}
    >
      <div className="relative w-full mx-auto ">
        <div
          className={`overflow-hidden flex w-full justify-center items-center`}
          ref={sliderRef}
        >
          <div
            className="flex transition-transform duration-300 "
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image.attributes.url}
                alt={`Slide ${index}`}
                className={` flex-shrink-0 rounded-lg ${
                  isFullscreen && imageHeight > 520 ? "h-screen" : "w-full"
                }`}
                onLoad={(e) => setImageHeight(e.target.clientHeight)}
              />
            ))}
          </div>
          {fullScreen && (
            <>
              <div
                className={`absolute top-2 left-2 backdrop-blur-sm font-custom flex items-center bg-gray-400/50 rounded px-2 hover:text-white`}
              >
                {currentIndex + 1} / {images.length}
              </div>
              <div
                className={`absolute top-2 right-2 backdrop-blur-sm font-custom flex items-center bg-gray-400/50 rounded p-2 hover:text-white`}
              >
                <button
                  onClick={() => handleFullScreen(sliderRef.current)}
                  className=" hover:text-gray-300"
                >
                  <Icon
                    name={
                      isFullscreen === true
                        ? `arrows-angle-contract`
                        : `arrows-angle-expand`
                    }
                    className={"h-5 w-5"}
                  />
                </button>
              </div>
            </>
          )}
          {fullScreen && images.length > 1 && (
            <>
              <div className="absolute top-1/2 left-1 transform -translate-y-1/2">
                <button
                  onClick={handlePrev}
                  className="p-2 disabled:opacity-50 hover:text-gray-300 backdrop-blur-sm bg-gray-400/50 rounded-full"
                  disabled={currentIndex === 0}
                >
                  <Icon name={"arrowLeft"} className={"h-5 w-5"} />
                </button>
              </div>
              <div className="absolute top-1/2 right-1 transform -translate-y-1/2">
                <button
                  onClick={handleNext}
                  className="p-2  disabled:opacity-50 hover:text-gray-300 backdrop-blur-sm bg-gray-400/50 rounded-full"
                  disabled={currentIndex === images.length - 1}
                >
                  <Icon name={"arrowRight"} className={"h-5 w-5"} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
