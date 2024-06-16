import React, { useState } from "react";
import Label from "../Label/Label";
import Icon from "../../Assets/Icon/Icon";
import Button from "../Button/Button";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Tooltip from "../Tooltip/Tooltip";
import CardImageSlider from "../ImageSlider/CardImageSlider";
import Modal from "../Modal/Modal";

const Card = ({
  images,
  title,
  category,
  description,
  route,
  id,
  count_view,
  count_like,
  template_canva_url,
  template_google_url,
  count_video,
}) => {
  const navigate = useNavigate();
  const [updateCountViewLoading, setUpdateCountViewLoading] = useState(false);
  const [showModal, setShowModal] = useState({
    download: false,
    share: { show: false, url: "" },
  });
  const [copy, setCopy] = useState(false);

  const handleViewDetail = async () => {
    setUpdateCountViewLoading(true);
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/api/templates/${id}`, {
          data: {
            count_view: count_view + 1,
          },
        })
        .then(() => {
          navigate(route);
        });
      setUpdateCountViewLoading(false);
    } catch (error) {
      console.log(error);
      setUpdateCountViewLoading(false);
    }
  };

  return (
    <>
      {updateCountViewLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col bg-white font-custom border border-gray-200 h-fit rounded-xl shadow-md hover:shadow-2xl">
          <CardImageSlider
            images={images}
            id={id}
            handleViewDetail={() => handleViewDetail()}
            handleShowModal={() =>
              setShowModal({
                ...showModal,
                share: {
                  show: !showModal.share.show,
                  url:
                    window.location.href +
                    `template?${createSearchParams({
                      filter: JSON.stringify({
                        id: id,
                        name: title,
                      }),
                    })}`,
                },
              })
            }
            count_like={count_like}
          />
          <div className="p-4 flex flex-col gap-4 ">
            <div className="flex flex-col gap-2">
              <Label type={"card-title"} className={"truncate"}>
                {title}
              </Label>
              <Label type={"card-desc"} className={"!line-clamp-3"}>
                {description}{" "}
              </Label>
              <div className="flex w-full justify-end">
                <Button
                  type={"link"}
                  size={"medium"}
                  className={"!p-0 flex items-center gap-1"}
                  onClick={() => handleViewDetail()}
                >
                  Lihat Detail{" "}
                  <Icon name={"arrowRight"} className={"h-4 w-4"} />
                </Button>
              </div>
            </div>
            <div className="flex w-full items-center">
              <div className="flex flex-col gap-1">
                <p className="flex items-center gap-1 text-gray-500 text-sm over text-nowrap">
                  <Icon name={"play-btn"} className={"h-4 w-4"} /> {count_video}{" "}
                  video
                </p>
                <p
                  className={`underline decoration-4 font-custom font-semibold ${
                    category === "Presentasi"
                      ? "decoration-orange-500"
                      : category === "Dokumen"
                      ? "decoration-blue-500"
                      : category === "Excel"
                      ? "decoration-green-500"
                      : ""
                  }`}
                >
                  {category}
                </p>
              </div>

              <div className="flex w-full gap-2 justify-end">
                {template_canva_url !== null && (
                  <Tooltip
                    message={`Buka Canva`}
                    className={"top-10"}
                    type={"hover"}
                  >
                    <Button
                      type={"icon"}
                      onClick={() => {
                        window.open(template_canva_url, "__blank");
                        setShowModal({
                          ...showModal,
                          download: !showModal.download,
                        });
                      }}
                      className="flex items-center justify-center !p-2 rounded-full backdrop-blur-sm bg-gray-400/20"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=lAWjO4LexGga&format=png&color=000000"
                        alt="canva"
                        className="h-10 w-10 block md:hidden"
                      />
                      <Icon name={"canva"} className={"md:block hidden h-10 w-10"} />
                    </Button>
                  </Tooltip>
                )}
                {template_google_url !== null && (
                  <Tooltip
                    message={`Buka Google ${
                      category === "Presentasi"
                        ? "Slides"
                        : category === "Excel"
                        ? "Sheets"
                        : category === "Dokumen"
                        ? "Docs"
                        : ""
                    }`}
                    type={"hover"}
                    className={"top-10"}
                  >
                    <Button
                      onClick={() => {
                        window.open(template_google_url, "__blank");
                        setShowModal({
                          ...showModal,
                          download: !showModal.download,
                        });
                      }}
                      type={"icon"}
                      className="flex items-center justify-center !p-2 rounded-full backdrop-blur-sm bg-gray-400/20"
                    >
                      <Icon
                        name={
                          category === "Presentasi"
                            ? "google-slide"
                            : category === "Excel"
                            ? "google-sheet"
                            : category === "Dokumen"
                            ? "google-doc"
                            : ""
                        }
                        className={"h-10 w-10"}
                      />
                    </Button>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal.download && (
        <Modal
          handleClose={() =>
            setShowModal({
              ...showModal,
              share: {
                show: false,
                url: window.location.href,
              },
            })
          }
        >
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white">
            <div className="px-6 py-4 flex flex-col gap-2">
              <h3 className="text-3xl font-semibold font-custom">
                Terima Kasih! 🎉
              </h3>
              <div className="flex flex-col space-y-4">
                <>
                  <p className=" text-lg font-custom flex-shrink-0">
                    Terima kasih telah mencari dan mendownload{" "}
                    <span className="font-semibold text-blue-500">
                      Template
                    </span>{" "}
                    di{" "}
                    <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      WOW
                    </span>
                    <span className="text-blue-500">template</span>. Kami senang
                    bisa membantu kamu menemukan{" "}
                    <span className="font-semibold text-blue-500">
                      Template
                    </span>{" "}
                    yang sempurna untuk kebutuhanmu! ❤️
                  </p>
                  <p className=" text-base text-gray-500 leading-relaxed font-custom">
                    Kamu dapat mendukung kami agar terus bisa menghadirkan
                    template-template berkualitas melalui{" "}
                    <span className="font-mono clear-start text-yellow-500 font-semibold">
                      SAWERIA
                    </span>{" "}
                    /{" "}
                    <span className="font-mono text-red-500 font-semibold">
                      trakteer
                    </span>
                  </p>
                </>
              </div>
            </div>
            <div className="flex items-center justify-end p-4 gap-2">
              <Button
                type={"fill"}
                size={"medium"}
                onClick={() => navigate("/all-template")}
              >
                Cari Template Lainnya
              </Button>

              <Button
                type={"outline"}
                size={"medium"}
                onClick={() =>
                  showModal.download
                    ? setShowModal({
                        ...showModal,
                        download: !showModal.download,
                      })
                    : setShowModal({
                        ...showModal,
                        share: {
                          show: !showModal.share.show,
                          url: window.location.href,
                        },
                      })
                }
              >
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showModal.share.show && (
        <Modal>
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white z-30">
            <div className="px-6 py-4 flex flex-col gap-4">
              <h3 className="text-3xl font-semibold font-custom">
                Yuk bagikan template ini
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col w-full gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type={"text"}
                      value={showModal.share.url}
                      readOnly
                      className="px-4 py-2 rounded bg-gray-100 border border-gray-300 font-custom text-gray-500"
                    />

                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(showModal.share.url);
                        setCopy(!copy);
                      }}
                      type={"outline"}
                      size={"medium"}
                      className={`!rounded-lg !relative ${
                        copy && "bg-blue-50"
                      }`}
                    >
                      Salin
                      {copy && (
                        <Tooltip
                          message={"Tersalin!"}
                          className={"top-8"}
                          type={"click"}
                          isVisible={copy}
                          setIsVisible={setCopy}
                        />
                      )}
                    </Button>
                  </div>
                  <div className="flex w-full justify-center items-center gap-4">
                    <Tooltip
                      className={"top-10"}
                      type={"hover"}
                      message={"Bagikan ke Whatsapp"}
                    >
                      <Button
                        type={"icon"}
                        className="flex items-center justify-center !p-2 rounded-full backdrop-blur-sm bg-gray-400/20"
                      >
                        <Icon name={"whatsapp"} className={"h-12 w-12"} />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      className={"top-10"}
                      type={"hover"}
                      message={"Bagikan ke Telegram"}
                    >
                      <Button
                        type={"icon"}
                        className="flex items-center justify-center !p-2 rounded-full backdrop-blur-sm bg-gray-400/20"
                      >
                        <Icon name={"telegram"} className={"h-12 w-12"} />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      className={"top-10"}
                      type={"hover"}
                      message={"Bagikan ke Telegram"}
                    >
                      <Button
                        type={"icon"}
                        className="flex items-center justify-center !p-3 rounded-full backdrop-blur-sm bg-gray-400/20"
                      >
                        <Icon name={"email"} className={"h-10 w-10"} />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-4 gap-2">
              <Button
                type={"outline"}
                size={"medium"}
                onClick={() =>
                  showModal.download
                    ? setShowModal({
                        ...showModal,
                        download: !showModal.download,
                      })
                    : setShowModal({
                        ...showModal,
                        share: {
                          show: !showModal.share.show,
                          url: window.location.href,
                        },
                      })
                }
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

export default Card;
