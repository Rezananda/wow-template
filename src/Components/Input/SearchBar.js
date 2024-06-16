import axios from "axios";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import Icon from "../../Assets/Icon/Icon";
import useOutsideClick from "../../Hooks/useOutsideClick";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../Utils/errorUtils";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

const SearchBar = ({ className, handleClose }) => {
  const [type, setType] = useState("Template");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchKey = useRef("");
  const navigate = useNavigate();
  const ref = useRef(null);
  const [error, setError] = useState(null);

  useOutsideClick(ref, () => {
    setShowSearch(false);
  });

  const handleSearchKey = async () => {
    setLoadingSearch(true);
    setError(null);
    try {
      if (type === "Template") {
        const endpoints = [
          `${process.env.REACT_APP_API_URL}/api/templates?filters[template_name][$contains]=${searchKey.current.value}&sort[0]=count_view&pagination[page]=1&pagination[pageSize]=10`,
          `${process.env.REACT_APP_API_URL}/api/template-categories?filters[desc][$contains]=${searchKey.current.value}&pagination[page]=1&pagination[pageSize]=5`,
          `${process.env.REACT_APP_API_URL}/api/template-colors?filters[name][$contains]=${searchKey.current.value}&pagination[page]=1&pagination[pageSize]=5`,
          `${process.env.REACT_APP_API_URL}/api/template-purposes?filters[name][$contains]=${searchKey.current.value}&pagination[page]=1&pagination[pageSize]=5`,
          `${process.env.REACT_APP_API_URL}/api/template-styles?filters[name][$contains]=${searchKey.current.value}&pagination[page]=1&pagination[pageSize]=5`,
        ];
        await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
          axios.spread(
            (
              { data: template },
              { data: templateCategory },
              { data: templateColors },
              { data: templatePurposes },
              { data: templateStyles }
            ) => {
              const result = [];

              result.push({
                type: "Template",
                key: "template_name",
                value: template.data.map((e) => ({
                  id: e.id,
                  name: e.attributes.template_name,
                })),
              });

              result.push({
                type: "Kategori",
                key: "template_category",
                value: templateCategory.data.map((e) => ({
                  id: e.id,
                  name: e.attributes.desc,
                })),
              });

              result.push({
                type: "Kegunaan",
                key: "template_purposes",
                value: templatePurposes.data.map((e) => ({
                  id: e.id,
                  name: e.attributes.name,
                })),
              });

              result.push({
                type: "Warna",
                key: "template_colors",
                value: templateColors.data.map((e) => ({
                  id: e.id,
                  name: e.attributes.name,
                })),
              });

              result.push({
                type: "Gaya",
                key: "template_styles",
                value: templateStyles.data.map((e) => ({
                  id: e.id,
                  name: e.attributes.name,
                })),
              });

              setSearchResult(result);
            }
          )
        );
      } else if (type === "Tips & Tutorial") {
        const endpoints = [
          `${process.env.REACT_APP_API_URL}/api/tutorial-and-tips?filters[video_name][$contains]=${searchKey.current.value}&sort[0]=count_view&pagination[page]=1&pagination[pageSize]=10`,
          `${process.env.REACT_APP_API_URL}/api/tutorial-and-tip-categories?filters[desc][$contains]=${searchKey.current.value}&pagination[page]=1&pagination[pageSize]=5`,
        ];
        await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
          axios.spread(({ data: video }, { data: videoCategory }) => {
            const result = [];

            result.push({
              type: "Video",
              key: "video_name",
              value: video.data.map((e) => ({
                id: e.id,
                name: e.attributes.video_name,
              })),
            });

            result.push({
              type: "Kategori",
              key: "tutorial_and_tip_category",
              value: videoCategory.data.map((e) => ({
                id: e.id,
                name: e.attributes.desc,
              })),
            });
            setSearchResult(result);
          })
        );
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <label className={`relative md:block font-custom ${className}`}>
      <div className="md:absolute hidden inset-y-0 left-0 p-1 md:flex items-center ">
        <span className="md:flex items-center text-base px-4 py-2 h-full rounded-l-full w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-white ">
          <select
            className="appearance-none bg-transparent focus:outline-none font-custom"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Template">Template</option>
            <option value="Tips & Tutorial">Tips & Tutorial</option>
          </select>
          <Icon name={"chevronDown"} className={"h-5 w-5 text-white"} />
        </span>
      </div>
      <input
        ref={searchKey}
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full md:w-[600px] border border-slate-300 rounded-full md:py-4 py-4 px-6 md:pl-44 md:pr-16 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Cari template..."
        type="text"
        name="search"
        onChange={() => handleSearchKey()}
        onFocus={() => setShowSearch(true)}
        onKeyDown={(e) => {
          e.key === "Enter" &&
            navigate({
              pathname: type === "Template" ? "/all-template" : "/all-video",
              search: `?${createSearchParams({
                filter: JSON.stringify([
                  {
                    source: "typing",
                    type: type === "Template" ? "Template" : "Video",
                    key: type === "Template" ? "template_name" : "video_name",
                    value: {
                      name: searchKey.current.value,
                    },
                  },
                ]),
              })}`,
            });
          e.key === "Enter" && handleClose();
        }}
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-6 pl-6">
        <span className="w-full">
          <Icon name={"search"} className={"h-5 w-5 text-black"} />
        </span>
      </span>
      {showSearch && (
        <div
          className={`flex flex-col absolute bg-white rounded-lg w-full z-50 shadow-xl ${
            searchKey.current.value !== "" && "max-h-[500px]"
          } overflow-y-auto`}
          ref={ref}
        >
          {error !== null ? (
            <ErrorHandler error={error} onRetry={handleSearchKey} /> //error handle
          ) : (
            <>
              {loadingSearch ? (
                <div className="py-3 px-4">
                  <p>Loading</p>
                </div>
              ) : (
                <>
                  {searchKey.current.value !== "" ? (
                    searchResult.filter((item) => item.value.length !== 0)
                      .length > 0 ? (
                      searchResult.map((el, inde) => (
                        <div key={inde}>
                          {el.value.length > 0 && (
                            <p className="p-3 text-lg font-semibold bg-gray-100">
                              {el.type}
                            </p>
                          )}
                          <ul className="divide-y">
                            {el.value.map((val, index) => (
                              <li
                                key={index}
                                className="hover:bg-gray-200 flex items-center justify-between px-5 py-3 cursor-pointer"
                                onClick={() => {
                                  navigate({
                                    pathname:
                                      type === "Template"
                                        ? "/all-template"
                                        : "/all-video",
                                    search: `?${createSearchParams({
                                      filter: JSON.stringify([
                                        {
                                          type: el.type,
                                          key:
                                            type === "Template"
                                              ? el.key === "template_name"
                                                ? "id"
                                                : el.key
                                              : el.key === "video_name"
                                              ? "id"
                                              : el.key,
                                          value: {
                                            id: val.id,
                                            name: val.name,
                                          },
                                        },
                                      ]),
                                    })}`,
                                  });
                                  handleClose();
                                }}
                              >
                                <Highlighter
                                  key={index}
                                  highlightClassName="items-center truncate font-semibold bg-blue-500"
                                  searchWords={[searchKey.current.value]}
                                  autoEscape={true}
                                  textToHighlight={val.name}
                                />
                                <Icon
                                  name={"search"}
                                  className={"h-4 w-4 text-gray-500"}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div className="px-4">
                        <div className="py-3">
                          <p className="truncate items-center text-grey-dark">
                            Pencarian Tidak Ditemukan
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="px-4">
                      <div className="py-3">
                        <p className="truncate items-center text-grey-dark">
                          Belum ada template yang dicari...
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </label>
  );
};

export default SearchBar;
