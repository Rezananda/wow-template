import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Label from "../../Components/Label/Label";
import Layout from "../../Components/Layout/Layout";
import Navbar from "../../Components/Navbar/Navbar";
import Button from "../../Components/Button/Button";
import Icon from "../../Assets/Icon/Icon";
import Badges from "../../Components/Badges/Badges";
import Modal from "../../Components/Modal/Modal";
import { useFavorites } from "../../Context/FavoritesProvider";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import Card from "../../Components/Card/Card";
import Tooltip from "../../Components/Tooltip/Tooltip";
import Footer from "../../Components/Footer/Footer";
import { getErrorMessage } from "../../Utils/errorUtils";
import ErrorHandler from "../../Components/ErrorHandler/ErrorHandler";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

const DetailTemplate = () => {
  const [searchParams] = useSearchParams();
  const [detailTemplate, setDetailTemlate] = useState({
    id: "",
    attributes: {
      template_name: "",
      count_view: "",
      count_like: "",
      count_canva_open: "",
      count_google_open: "",
      template_category: { data: { attributes: { desc: "" } } },
      template_image: {
        data: [{ id: "", attributes: { url: "", name: "" } }],
      },
      tutorial_and_tips: { data: [] },
    },
  });
  const [category, setCategory] = useState([]);
  const [showAccordion, setShowAccordion] = useState({
    deskripsi: false,
    download: false,
    video: false,
  });

  const [filter, setFilter] = useState(
    JSON.parse(searchParams.get("filter")) || {}
  );
  const [loadingDetailTemplate, setLoadingDetailTemplate] = useState(false);
  const [showModal, setShowModal] = useState({
    download: false,
    share: { show: false, url: "" },
    video: { show: false, url: "" },
  });
  const { toggleFavorite, isFavorite } = useFavorites();
  const [relatedTemplate, setRelatedTemplate] = useState([]);
  const [copy, setCopy] = useState(false);
  const [error, setError] = useState(null);
  const [countTemplateLoading, setCountTemplateLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const newFilter = JSON.parse(searchParams.get("filter")) || {};
    setFilter(newFilter);
  }, [searchParams]);

  const handleDetailTemplate = useCallback(async () => {
    setLoadingDetailTemplate(true);
    setError(null);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/templates/${filter.id}?filter[template_name][$eq]=${filter.name}&populate=*`
        )
        .then((val) => {
          const combinedArray = [
            ...(val.data.data.attributes.template_colors.data !== [] &&
              val.data.data.attributes.template_colors.data),
            ...(val.data.data.attributes.template_styles.data !== [] &&
              val.data.data.attributes.template_styles.data),
            ...(val.data.data.attributes.template_purposes.data !== [] &&
              val.data.data.attributes.template_purposes.data),
          ];

          const newArray = combinedArray.map((el) => ({
            name: el.attributes.name,
            id: el.id,
          }));

          newArray.push(
            val.data.data.attributes.template_category.data.attributes.desc !==
              null && {
              name: val.data.data.attributes.template_category.data.attributes
                .desc,
              id: val.data.data.attributes.template_category.data.id,
            }
          );

          setDetailTemlate(val.data.data);

          setCategory(newArray);

          return axios.get(
            `${process.env.REACT_APP_API_URL}/api/templates?sort[0]=count_view:desc&filters[template_category][$eq]=${val.data.data.attributes.template_category.data.id}&filters[id][$ne]=${val.data.data.id}&pagination[pageSize]=4&populate=*`
          );
        })
        .then((response) => {
          setRelatedTemplate(response.data.data);
        });
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoadingDetailTemplate(false);
    }
  }, [filter.id, filter.name]);

  useEffect(() => {
    handleDetailTemplate();
  }, [handleDetailTemplate]);

  const handleCountTemplate = async (type) => {
    setCountTemplateLoading(true);
    try {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/api/templates/${filter.id}`, {
          data:
            type === "canva"
              ? {
                  count_canva_open:
                    detailTemplate.attributes.count_canva_open + 1,
                }
              : {
                  count_google_open:
                    detailTemplate.attributes.count_google_open + 1,
                },
        })
        .then(() => null);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    } finally {
      setCountTemplateLoading(false);
    }
  };

  return (
    <div className="bg-slate-50">
      <Navbar />
      <Layout className={"md:block hidden"}>
        {error !== null ? (
          <ErrorHandler error={error} onRetry={handleDetailTemplate} /> //error handle
        ) : (
          <>
            {loadingDetailTemplate ? (
              <p>Loading..</p>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row">
                  <div className="basis-8/12">
                    <Breadcrumb
                      templateName={detailTemplate.attributes.template_name}
                    />
                    <div className="flex items-center justify-between py-3">
                      <Label
                        type={"section-title"}
                        className={"w-full truncate"}
                      >
                        {detailTemplate.attributes.template_name}
                      </Label>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 border rounded-full border-gray-400 w-fit">
                          <Icon
                            name={"eye-fill"}
                            className={"h-5 w-5 text-gray-400"}
                          />
                          <p className="text-gray-400 font-custom">
                            {detailTemplate.attributes.count_view}
                          </p>
                        </div>
                        <Button
                          type={"icon"}
                          className="flex items-center justify-center !p-3 !rounded-full backdrop-blur-sm bg-gray-400/20 hover:bg-gray-700/20"
                          onClick={() =>
                            toggleFavorite(
                              detailTemplate.id,
                              detailTemplate.attributes.count_like
                            )
                          }
                        >
                          {isFavorite(detailTemplate.id) ? (
                            <Icon name={"heartFill"} className={"h-5 w-5"} />
                          ) : (
                            <Icon name={"heart"} className={"h-5 w-5"} />
                          )}
                        </Button>
                        <Button
                          type={"icon"}
                          className="flex items-center justify-center !p-3 rounded-full backdrop-blur-sm bg-gray-400/20 hover:bg-gray-700/20"
                          onClick={() =>
                            setShowModal({
                              ...showModal,
                              share: {
                                show: !showModal.share.show,
                                url: window.location.href,
                              },
                            })
                          }
                        >
                          <Icon name={"share"} className={"h-5 w-5"} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {category
                        .map((el, index) => (
                          <Link
                            key={index}
                            to={{
                              pathname: "/all-template",
                              search: `?${createSearchParams({
                                filter: JSON.stringify([
                                  {
                                    type: "Kategori Template",
                                    key: "template_category",
                                    value: {
                                      name: el.name,
                                      id: el.id,
                                    },
                                  },
                                ]),
                              })}`,
                            }}
                            target={"_blank"}
                          >
                            <Button
                              key={index}
                              type={"icon"}
                              size={"medium"}
                              className={"!p-0 !font-normal"}
                            >
                              <Badges
                                size={"medium"}
                                className={
                                  "!rounded-full !gap-2 hover:!bg-gray-200"
                                }
                              >
                                {el.name}{" "}
                                <Icon
                                  name={"Box-arrow-up-right"}
                                  className={"h-4 w-4"}
                                />
                              </Badges>
                            </Button>
                          </Link>
                        ))
                        .reverse()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-4 h-full">
                  <div className="basis-8/12 flex flex-col gap-4 h-full">
                    <ImageSlider
                      images={detailTemplate.attributes.template_image.data}
                    />
                    <div className="w-full rounded-lg border border-gray-300 overflow-hidden shadow-md">
                      <div
                        className="flex w-full items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer"
                        onClick={() =>
                          setShowAccordion({
                            ...showAccordion,
                            deskripsi: !showAccordion.deskripsi,
                          })
                        }
                      >
                        <Label type={"section-desc"} className={"font-bold"}>
                          Deskripsi
                        </Label>
                        <Button type={"icon"} className={"!p-0"}>
                          {showAccordion.deskripsi ? (
                            <Icon name={"chevronDown"} className={"h-6 w-6"} />
                          ) : (
                            <Icon name={"chevronUp"} className={"h-6 w-6"} />
                          )}
                        </Button>
                      </div>
                      {!showAccordion.deskripsi && (
                        <div className="px-4 py-2">
                          <Label type={"section-desc"}>
                            {detailTemplate.attributes.template_description}
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="basis-4/12 flex flex-col gap-3">
                    <div className="w-full rounded-lg border border-gray-300 overflow-hidden shadow-md">
                      <div
                        className="flex w-full items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer"
                        onClick={() =>
                          setShowAccordion({
                            ...showAccordion,
                            download: !showAccordion.download,
                          })
                        }
                      >
                        <Label type={"section-desc"} className={"font-bold"}>
                          Buka{" "}
                          <span>
                            {
                              detailTemplate.attributes.template_category.data
                                .attributes.desc
                            }
                          </span>{" "}
                          Melalui
                        </Label>
                        <Button type={"icon"} className={"!p-0"}>
                          {showAccordion.download ? (
                            <Icon name={"chevronDown"} className={"h-6 w-6"} />
                          ) : (
                            <Icon name={"chevronUp"} className={"h-6 w-6"} />
                          )}
                        </Button>
                      </div>
                      {!showAccordion.download && (
                        <>
                          {countTemplateLoading === true ? (
                            "Loading.."
                          ) : (
                            <ul className="divide-y p-2 w-full">
                              {detailTemplate.attributes.template_canva_url !==
                                null && (
                                <li className="w-full p-1 hover:bg-gray-200 hover:rounded">
                                  <Button
                                    type={"link"}
                                    size={"large"}
                                    clas
                                    onClick={() => {
                                      handleCountTemplate("canva");
                                      window.open(
                                        detailTemplate.attributes
                                          .template_canva_url,
                                        "_blank"
                                      );
                                      setShowModal({
                                        ...showModal,
                                        download: !showModal.download,
                                      });
                                    }}
                                    className={
                                      "!flex !items-center !w-full !justify-between !py-1 !no-underline !px-1"
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <Icon
                                        name={"canva"}
                                        className={"h-10 w-10 md:block hidden"}
                                      />
                                      Canva{" "}
                                    </div>
                                    <Icon
                                      name={"Box-arrow-up-right"}
                                      className={"h-4 w-4"}
                                    />
                                  </Button>
                                </li>
                              )}
                              {detailTemplate.attributes.template_google_url !==
                                null && (
                                <li className="w-full p-1 hover:bg-gray-200 hover:rounded">
                                  <Button
                                    type={"link"}
                                    size={"large"}
                                    onClick={() => {
                                      handleCountTemplate("google");
                                      window.open(
                                        detailTemplate.attributes
                                          .template_google_url,
                                        "_blank"
                                      );
                                      setShowModal({
                                        ...showModal,
                                        download: !showModal.download,
                                      });
                                    }}
                                    className={
                                      "!flex !items-center !w-full !justify-between !gap-2 !py-1 !no-underline !px-1"
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <Icon
                                        name={
                                          detailTemplate.attributes
                                            .template_category.data.attributes
                                            .desc === "Presentasi"
                                            ? "google-slide"
                                            : detailTemplate.attributes
                                                .template_category.data
                                                .attributes.desc === "Excel"
                                            ? "google-sheet"
                                            : detailTemplate.attributes
                                                .template_category.data
                                                .attributes.desc === "Dokumen"
                                            ? "google-doc"
                                            : ""
                                        }
                                        className={"h-10 w-10"}
                                      />
                                      Google Slide{" "}
                                    </div>
                                    <Icon
                                      name={"Box-arrow-up-right"}
                                      className={"h-4 w-4"}
                                    />
                                  </Button>
                                </li>
                              )}
                            </ul>
                          )}
                        </>
                      )}
                    </div>
                    {detailTemplate.attributes.tutorial_and_tips.data.length >
                      0 && (
                      <div className="w-full rounded-lg border border-gray-300 overflow-hidden shadow-md">
                        <div
                          className="flex w-full items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer"
                          onClick={() =>
                            setShowAccordion({
                              ...showAccordion,
                              video: !showAccordion.video,
                            })
                          }
                        >
                          <Label type={"section-desc"} className={"font-bold"}>
                            Tonton Video Terkait
                          </Label>
                          <Button type={"icon"} className={"!p-0"}>
                            {showAccordion.video ? (
                              <Icon
                                name={"chevronDown"}
                                className={"h-6 w-6"}
                              />
                            ) : (
                              <Icon name={"chevronUp"} className={"h-6 w-6"} />
                            )}
                          </Button>
                        </div>
                        {!showAccordion.video && (
                          <>
                            <ul className="divide-y p-2 w-full">
                              {detailTemplate.attributes.tutorial_and_tips.data
                                .slice(
                                  0,
                                  showAll
                                    ? detailTemplate.attributes
                                        .tutorial_and_tips.data.length
                                    : 4
                                )
                                .map((el, index) => (
                                  <li
                                    key={index}
                                    className=" hover:bg-gray-200 hover:rounded-lg p-1"
                                  >
                                    <Button
                                      onClick={() =>
                                        setShowModal({
                                          ...showModal,
                                          video: {
                                            show: !showModal.video.show,
                                            url: `https://www.youtube.com/embed/${el.attributes.video_id}`,
                                          },
                                        })
                                      }
                                      type={"link"}
                                      size={"medium"}
                                      className={
                                        "!flex !items-center !no-underline !gap-2 !w-full !justify-between !text-start !px-1"
                                      }
                                    >
                                      <p className="!font-normal !w-full !truncate">
                                        {index + 1}. {el.attributes.video_name}
                                      </p>
                                      <Icon
                                        name={"play-btn"}
                                        className={"h-7 w-7"}
                                      />
                                    </Button>
                                  </li>
                                ))}
                            </ul>
                            {detailTemplate.attributes.tutorial_and_tips.data
                              .length > 4 && (
                              <div className="flex w-full justify-center">
                                {!showAll ? (
                                  <Button
                                    onClick={() => setShowAll(!showAll)}
                                    type={"link"}
                                    size={"medium"}
                                  >
                                    Lainnya
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => setShowAll(!showAll)}
                                    type={"link"}
                                    size={"medium"}
                                  >
                                    Tutup
                                  </Button>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Layout>

      {/* Mobile */}
      <Layout className={"block md:hidden"}>
        {error !== null ? (
          <ErrorHandler error={error} onRetry={handleDetailTemplate} /> //error handle
        ) : (
          <>
            {loadingDetailTemplate ? (
              <p>Loading..</p>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 justify-between">
                      <div className="flex items-center gap-2 px-3 py-1 border rounded-full border-gray-400 w-fit">
                        <Icon
                          name={"eye-fill"}
                          className={"h-5 w-5 text-gray-400"}
                        />
                        <p className="text-gray-400 font-custom">
                          {detailTemplate.attributes.count_view}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type={"icon"}
                          className="flex items-center justify-center !p-3 !rounded-full backdrop-blur-sm bg-gray-400/20 hover:bg-gray-700/20"
                          onClick={() =>
                            toggleFavorite(
                              detailTemplate.id,
                              detailTemplate.attributes.count_like
                            )
                          }
                        >
                          {isFavorite(detailTemplate.id) ? (
                            <Icon name={"heartFill"} className={"h-5 w-5"} />
                          ) : (
                            <Icon name={"heart"} className={"h-5 w-5"} />
                          )}
                        </Button>
                        <Button
                          type={"icon"}
                          className="flex items-center justify-center !p-3 rounded-full backdrop-blur-sm bg-gray-400/20 hover:bg-gray-700/20"
                          onClick={() =>
                            setShowModal({
                              ...showModal,
                              share: {
                                show: !showModal.share.show,
                                url: window.location.href,
                              },
                            })
                          }
                        >
                          <Icon name={"share"} className={"h-5 w-5"} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-4 h-full">
                  <div className="flex flex-col gap-4 h-full">
                    <ImageSlider
                      images={detailTemplate.attributes.template_image.data}
                    />
                    <Label type={"section-title"} className={"w-full truncate"}>
                      {detailTemplate.attributes.template_name}
                    </Label>
                    <div className="flex flex-wrap items-center gap-2">
                      {category
                        .map((el, index) => (
                          <Link
                            key={index}
                            to={{
                              pathname: "/all-template",
                              search: `?${createSearchParams({
                                filter: JSON.stringify([
                                  {
                                    type: "Kategori Template",
                                    key: "template_category",
                                    value: {
                                      name: el.name,
                                      id: el.id,
                                    },
                                  },
                                ]),
                              })}`,
                            }}
                            target={"_blank"}
                          >
                            <Button
                              key={index}
                              type={"icon"}
                              size={"medium"}
                              className={"!p-0 !font-normal"}
                            >
                              <Badges
                                size={"medium"}
                                className={
                                  "!rounded-full !gap-2 hover:!bg-gray-200"
                                }
                              >
                                {el.name}{" "}
                                <Icon
                                  name={"Box-arrow-up-right"}
                                  className={"h-4 w-4"}
                                />
                              </Badges>
                            </Button>
                          </Link>
                        ))
                        .reverse()}
                    </div>
                    <div className="w-full rounded-lg border border-gray-300 overflow-hidden shadow-md">
                      <div
                        className="flex w-full items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer"
                        onClick={() =>
                          setShowAccordion({
                            ...showAccordion,
                            download: !showAccordion.download,
                          })
                        }
                      >
                        <Label type={"section-desc"} className={"font-bold"}>
                          Buka{" "}
                          <span>
                            {
                              detailTemplate.attributes.template_category.data
                                .attributes.desc
                            }
                          </span>{" "}
                          Melalui
                        </Label>
                        <Button type={"icon"} className={"!p-0"}>
                          {showAccordion.download ? (
                            <Icon name={"chevronDown"} className={"h-6 w-6"} />
                          ) : (
                            <Icon name={"chevronUp"} className={"h-6 w-6"} />
                          )}
                        </Button>
                      </div>
                      {!showAccordion.download && (
                        <>
                          {countTemplateLoading === true ? (
                            "Loading.."
                          ) : (
                            <ul className="divide-y p-2 w-full">
                              {detailTemplate.attributes.template_canva_url !==
                                null && (
                                <li className="w-full p-1 hover:bg-gray-200 hover:rounded">
                                  <Button
                                    type={"link"}
                                    size={"large"}
                                    clas
                                    onClick={() => {
                                      handleCountTemplate("canva");
                                      window.open(
                                        detailTemplate.attributes
                                          .template_canva_url,
                                        "_blank"
                                      );
                                      setShowModal({
                                        ...showModal,
                                        download: !showModal.download,
                                      });
                                    }}
                                    className={
                                      "!flex !items-center !w-full !justify-between !py-1 !no-underline !px-1"
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <img
                                        src="https://img.icons8.com/?size=100&id=lAWjO4LexGga&format=png&color=000000"
                                        alt="canva"
                                        className="h-10 w-10 block md:hidden"
                                      />
                                      Canva{" "}
                                    </div>
                                    <Icon
                                      name={"Box-arrow-up-right"}
                                      className={"h-4 w-4"}
                                    />
                                  </Button>
                                </li>
                              )}
                              {detailTemplate.attributes.template_google_url !==
                                null && (
                                <li className="w-full p-1 hover:bg-gray-200 hover:rounded">
                                  <Button
                                    type={"link"}
                                    size={"large"}
                                    onClick={() => {
                                      handleCountTemplate("google");
                                      window.open(
                                        detailTemplate.attributes
                                          .template_google_url,
                                        "_blank"
                                      );
                                      setShowModal({
                                        ...showModal,
                                        download: !showModal.download,
                                      });
                                    }}
                                    className={
                                      "!flex !items-center !w-full !justify-between !gap-2 !py-1 !no-underline !px-1"
                                    }
                                  >
                                    <div className="flex items-center gap-2">
                                      <Icon
                                        name={
                                          detailTemplate.attributes
                                            .template_category.data.attributes
                                            .desc === "Presentasi"
                                            ? "google-slide"
                                            : detailTemplate.attributes
                                                .template_category.data
                                                .attributes.desc === "Excel"
                                            ? "google-sheet"
                                            : detailTemplate.attributes
                                                .template_category.data
                                                .attributes.desc === "Dokumen"
                                            ? "google-doc"
                                            : ""
                                        }
                                        className={"h-10 w-10"}
                                      />
                                      Google Slide{" "}
                                    </div>
                                    <Icon
                                      name={"Box-arrow-up-right"}
                                      className={"h-4 w-4"}
                                    />
                                  </Button>
                                </li>
                              )}
                            </ul>
                          )}
                        </>
                      )}
                    </div>
                    {detailTemplate.attributes.tutorial_and_tips.data.length >
                      0 && (
                      <div className="w-full rounded-lg border border-gray-300 overflow-hidden shadow-md">
                        <div
                          className="flex w-full items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer"
                          onClick={() =>
                            setShowAccordion({
                              ...showAccordion,
                              video: !showAccordion.video,
                            })
                          }
                        >
                          <Label type={"section-desc"} className={"font-bold"}>
                            Tonton Video Terkait
                          </Label>
                          <Button type={"icon"} className={"!p-0"}>
                            {showAccordion.video ? (
                              <Icon
                                name={"chevronDown"}
                                className={"h-6 w-6"}
                              />
                            ) : (
                              <Icon name={"chevronUp"} className={"h-6 w-6"} />
                            )}
                          </Button>
                        </div>
                        {!showAccordion.video && (
                          <>
                            <ul className="divide-y p-2 w-full">
                              {detailTemplate.attributes.tutorial_and_tips.data
                                .slice(
                                  0,
                                  showAll
                                    ? detailTemplate.attributes
                                        .tutorial_and_tips.data.length
                                    : 4
                                )
                                .map((el, index) => (
                                  <li
                                    key={index}
                                    className=" hover:bg-gray-200 hover:rounded-lg p-1"
                                  >
                                    <Button
                                      onClick={() =>
                                        setShowModal({
                                          ...showModal,
                                          video: {
                                            show: !showModal.video.show,
                                            url: `https://www.youtube.com/embed/${el.attributes.video_id}`,
                                          },
                                        })
                                      }
                                      type={"link"}
                                      size={"medium"}
                                      className={
                                        "!flex !items-center !no-underline !gap-2 !w-full !justify-between !text-start !px-1"
                                      }
                                    >
                                      <p className="!font-normal !w-full">
                                        {index + 1}. {el.attributes.video_name}
                                      </p>
                                      <Icon
                                        name={"play-btn"}
                                        className={"h-7 w-7"}
                                      />
                                    </Button>
                                  </li>
                                ))}
                            </ul>
                            {detailTemplate.attributes.tutorial_and_tips.data
                              .length > 4 && (
                              <div className="flex w-full justify-center">
                                {!showAll ? (
                                  <Button
                                    onClick={() => setShowAll(!showAll)}
                                    type={"link"}
                                    size={"medium"}
                                  >
                                    Lainnya
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => setShowAll(!showAll)}
                                    type={"link"}
                                    size={"medium"}
                                  >
                                    Tutup
                                  </Button>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    <div className="w-full rounded-lg border border-gray-300 overflow-hidden shadow-md">
                      <div
                        className="flex w-full items-center justify-between px-4 py-2 bg-gray-100 cursor-pointer"
                        onClick={() =>
                          setShowAccordion({
                            ...showAccordion,
                            deskripsi: !showAccordion.deskripsi,
                          })
                        }
                      >
                        <Label type={"section-desc"} className={"font-bold"}>
                          Deskripsi
                        </Label>
                        <Button type={"icon"} className={"!p-0"}>
                          {showAccordion.deskripsi ? (
                            <Icon name={"chevronDown"} className={"h-6 w-6"} />
                          ) : (
                            <Icon name={"chevronUp"} className={"h-6 w-6"} />
                          )}
                        </Button>
                      </div>
                      {!showAccordion.deskripsi && (
                        <div className="px-4 py-2">
                          <Label type={"section-desc"}>
                            {detailTemplate.attributes.template_description}
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Layout>

      <div className="flex flex-col mt-8 w-full shadow-inner bg-gray-100 px-6 py-8 items-center justify-center">
        <Label
          type={"section-title"}
          className={"font-bold !w-full md:!text-start !text-start"}
        >
          Template Lainnya
        </Label>
        <div className="grid md:grid-cols-4 gap-4 mt-4">
          {relatedTemplate?.map((val, index) => (
            <Card
              route={`/template?${createSearchParams({
                filter: JSON.stringify({
                  id: val.id,
                  name: val.attributes.template_name,
                }),
              })}`}
              id={val.id}
              key={index}
              category={val.attributes.template_category.data.attributes.desc}
              images={val.attributes.template_image.data}
              title={val.attributes.template_name}
              description={val.attributes.template_description}
              count_view={val.attributes.count_view}
              template_canva_url={val.attributes.template_canva_url}
              template_google_url={val.attributes.template_google_url}
              count_video={val.attributes.tutorial_and_tips.data.length}
            />
          ))}
        </div>
      </div>
      <Footer />

      {(showModal.download || showModal.share.show) && (
        <Modal>
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white">
            <div className="px-6 py-4 flex flex-col gap-2">
              <h3 className="text-3xl font-semibold font-custom">
                {showModal.download
                  ? "Terima Kasih! 🎉"
                  : "Yuk bagikan template ini"}
              </h3>
              <div className="flex flex-col space-y-4">
                {showModal.download ? (
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
                      <span className="text-blue-500">template</span>. Kami
                      senang bisa membantu kamu menemukan{" "}
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
                ) : (
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
                )}
              </div>
            </div>
            <div className="flex items-center justify-end p-4 gap-2">
              {showModal.download && (
                <Button
                  type={"fill"}
                  size={"medium"}
                  onClick={() => navigate("/all-template")}
                >
                  Cari Template Lainnya
                </Button>
              )}
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
      {showModal.video.show && (
        <Modal
          handleClose={() =>
            setShowModal({
              ...showModal,
              video: !showModal.video,
            })
          }
        >
          <div className="flex flex-col gap-2 md:flex-row w-full h-full justify-center p-4 md:p-0">
            <div
              style={{ aspectRatio: "auto" }}
              className="flex items-center justify-center w-full"
            >
              <iframe
                className="h-[25vh] w-full md:h-full"
                src={showModal.video.url}
                title={showModal.video.url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <Button
              type={"icon"}
              className={"!p-0 !h-full !items-start md:!flex hidden"}
              onClick={() =>
                setShowModal({
                  ...showModal,
                  video: {
                    show: !showModal.video.show,
                  },
                })
              }
            >
              <Icon name={"x"} className={"h-10 w-10 text-white"} />
            </Button>
            <Button
              type={"link"}
              className={"!p-0 md:!hidden !flex !justify-end"}
              onClick={() =>
                setShowModal({
                  ...showModal,
                  video: {
                    show: !showModal.video.show,
                  },
                })
              }
            >
              Tutup Video
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DetailTemplate;
