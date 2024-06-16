import axios from "axios";
import React, { useState } from "react";
import Icon from "../../Assets/Icon/Icon";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

const CardVideo = ({
  video_id,
  name,
  category,
  images,
  id,
  count_view,
  handleRefreshVideo,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoDesc, setVideoDesc] = useState(false);
  const [countViewLoading, setCountViewLoading] = useState(false);

  const handleVideo = async () => {
    setCountViewLoading(true);
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/api/tutorial-and-tips/${id}`, {
          data: {
            count_view: count_view + 1,
          },
        })
        .then((res) => {
          console.log(res.data);
          setShowVideo(!showVideo);
        });
      setCountViewLoading(false);
    } catch (error) {
      console.log(error);
      setCountViewLoading(false);
    }
  };
  return (
    <>
      {countViewLoading === true ? (
        "Loading..."
      ) : (
        <div
          onClick={handleVideo}
          onMouseEnter={() => setVideoDesc(true)}
          onMouseLeave={() => setVideoDesc(false)}
          className={`overflow-hidden relative flex w-full justify-center items-center rounded-xl bg-black cursor-pointer shadow-md hover:shadow-2xl`}
        >
          <span
            className={`absolute z-10 font-custom left-0 top-0 rounded-br-lg bg-gray-100 px-2 py-1 text-sm font-semibold underline decoration-4 ${
              category === "Tips"
                ? "decoration-red-500"
                : "decoration-yellow-500"
            }`}
          >
            {category}
          </span>
          {videoDesc && (
            <div className="w-full h-full absolute z-10 bg-gradient-to-b from-transparent to-black flex items-end px-4 py-2">
              <div className="flex items-center w-full justify-between">
                <p className="text-white w-full font-custom text-lg font-semibold">
                  {name}
                </p>
                <Icon name={"play-btn"} className={"h-10 w-10 text-white"} />
              </div>
            </div>
          )}

          <img src={images} alt={name} className={`h-full w-full`} />
        </div>
      )}

      {showVideo && (
        <Modal
          handleClose={() => {
            setShowVideo(!showVideo);
            handleRefreshVideo();
          }}
        >
          <div className="flex flex-col gap-2 md:flex-row w-full h-full justify-center p-4 md:p-0">
            <div
              style={{ aspectRatio: "auto" }}
              className="flex items-center justify-center w-full"
            >
              <iframe
                className="h-[25vh] w-full md:h-full"
                src={`https://www.youtube.com/embed/${video_id}`}
                title={`https://www.youtube.com/embed/${video_id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <Button
              type={"icon"}
              className={"!p-0 !h-full !items-start md:!flex hidden"}
              onClick={() => setShowVideo(!showVideo)}
            >
              <Icon name={"x"} className={"h-10 w-10 text-white "} />
            </Button>

            <Button
              type={"link"}
              className={"!p-0 md:!hidden !flex !justify-end"}
              onClick={() => setShowVideo(!showVideo)}
            >
              Tutup Video
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CardVideo;
