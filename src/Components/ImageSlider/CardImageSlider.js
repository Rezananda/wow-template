import React, { useRef, useState } from "react";
import Icon from "../../Assets/Icon/Icon";
import { useFavorites } from "../../Context/FavoritesProvider";
import Button from "../Button/Button";
import Tooltip from "../Tooltip/Tooltip";

const CardImageSlider = ({
  images,
  id,
  count_like,
  handleViewDetail,
  handleShowModal,
}) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const { toggleFavorite, isFavorite, favoriteLoading } = useFavorites();

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

  return (
    <div
      className="w-full relative cursor-pointer "
      onMouseEnter={() => setFullScreen(true)}
      onMouseLeave={() => setFullScreen(false)}
    >
      <div className="relative w-full mx-auto">
        <div
          className={`overflow-hidden flex w-full h-[180px] justify-center items-center rounded-t-xl `}
          ref={sliderRef}
        >
          <div
            className="flex transition-transform duration-300 "
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onClick={handleViewDetail}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image.attributes.url}
                alt={`Slide ${index}`}
                className={`flex-shrink-0 w-full `}
              />
            ))}
          </div>
          {fullScreen && (
            <>
              <div className="hidden items-center gap-2 absolute top-1.5 right-1.5 md:flex">
                <Tooltip
                  message={`Favoritkan`}
                  className={"top-5"}
                  type={"hover"}
                >
                  {favoriteLoading === true ? (
                    <span className="font-custom text-xs">Loading..</span>
                  ) : (
                    <Button
                      type={"icon"}
                      className="flex items-center justify-center !p-2 !rounded !bg-white hover:!bg-gray-200"
                      onClick={() => toggleFavorite(id, count_like)}
                    >
                      {isFavorite(id) ? (
                        <Icon name={"heartFill"} className={"h-4 w-4"} />
                      ) : (
                        <Icon name={"heart"} className={"h-4 w-4"} />
                      )}
                    </Button>
                  )}
                </Tooltip>
                <Tooltip message={`Bagikan`} className={"top-5"} type={"hover"}>
                  <Button
                    onClick={handleShowModal}
                    type={"icon"}
                    className="flex items-center justify-center !p-2 !rounded !bg-white hover:!bg-gray-200"
                  >
                    <Icon name={"share"} className={"h-4 w-4"} />
                  </Button>
                </Tooltip>
              </div>
              {images.length > 1 && (
                <div className="absolute top-1/2 left-1 transform -translate-y-1/2">
                  <button
                    onClick={handlePrev}
                    className="p-2 disabled:opacity-50 hover:text-gray-300 backdrop-blur-sm bg-gray-400/50 rounded-full"
                    disabled={currentIndex === 0}
                  >
                    <Icon name={"arrowLeft"} className={"h-5 w-5"} />
                  </button>
                </div>
              )}
              {images.length > 1 && (
                <div className="absolute top-1/2 right-1 transform -translate-y-1/2">
                  <button
                    onClick={handleNext}
                    className="p-2  disabled:opacity-50 hover:text-gray-300 backdrop-blur-sm bg-gray-400/50 rounded-full"
                    disabled={currentIndex === images.length - 1}
                  >
                    <Icon name={"arrowRight"} className={"h-5 w-5"} />
                  </button>
                </div>
              )}
            </>
          )}

          {/* mobile */}
          <>
            <div className="flex items-center gap-2 absolute top-1.5 right-1.5 md:hidden">
              <Tooltip
                message={`Favoritkan`}
                className={"top-5"}
                type={"hover"}
              >
                {favoriteLoading === true ? (
                  <span className="font-custom text-xs">Loading..</span>
                ) : (
                  <Button
                    type={"icon"}
                    className="flex items-center justify-center !p-2 !rounded !bg-white hover:!bg-gray-200"
                    onClick={() => toggleFavorite(id, count_like)}
                  >
                    {isFavorite(id) ? (
                      <Icon name={"heartFill"} className={"h-4 w-4"} />
                    ) : (
                      <Icon name={"heart"} className={"h-4 w-4"} />
                    )}
                  </Button>
                )}
              </Tooltip>
              <Tooltip message={`Bagikan`} className={"top-5"} type={"hover"}>
                <Button
                  onClick={handleShowModal}
                  type={"icon"}
                  className="flex items-center justify-center !p-2 !rounded !bg-white hover:!bg-gray-200"
                >
                  <Icon name={"share"} className={"h-4 w-4"} />
                </Button>
              </Tooltip>
            </div>
            {images.length > 1 && (
              <div className="absolute top-1/2 left-1 transform -translate-y-1/2">
                <button
                  onClick={handlePrev}
                  className="p-2 disabled:opacity-50 hover:text-gray-300 backdrop-blur-sm bg-gray-400/50 rounded-full"
                  disabled={currentIndex === 0}
                >
                  <Icon name={"arrowLeft"} className={"h-5 w-5"} />
                </button>
              </div>
            )}
            {images.length > 1 && (
              <div className="absolute top-1/2 right-1 transform -translate-y-1/2">
                <button
                  onClick={handleNext}
                  className="p-2  disabled:opacity-50 hover:text-gray-300 backdrop-blur-sm bg-gray-400/50 rounded-full"
                  disabled={currentIndex === images.length - 1}
                >
                  <Icon name={"arrowRight"} className={"h-5 w-5"} />
                </button>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default CardImageSlider;
