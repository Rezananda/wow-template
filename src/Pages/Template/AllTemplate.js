import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import Icon from "../../Assets/Icon/Icon";
import Badges from "../../Components/Badges/Badges";
import Button from "../../Components/Button/Button";
import Card from "../../Components/Card/Card";
import ErrorHandler from "../../Components/ErrorHandler/ErrorHandler";
import Footer from "../../Components/Footer/Footer";
import Label from "../../Components/Label/Label";
import Layout from "../../Components/Layout/Layout";
import Navbar from "../../Components/Navbar/Navbar";
import SideFilter from "../../Components/Templates/SideFilter";
import { getErrorMessage } from "../../Utils/errorUtils";

const AllTemplate = () => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState(
    JSON.parse(searchParams.get("filter")) || []
  );
  const [filterMobile, setFilterMobile] = useState(
    JSON.parse(searchParams.get("filter")) || []
  );
  const [sideFilter, setSideFilter] = useState([]);
  const [showFilter, setShowFilter] = useState([]);
  const [sort, setSort] = useState("sort[0]=template_name:asc");
  const [pagination, setPagination] = useState(
    `&pagination[page]=1&pagination[pageSize]=9&`
  );
  const [template, setTemplate] = useState({
    data: [],
    meta: { pagination: { page: 1 } },
  });
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [templateError, setTemplateError] = useState(null);
  const [filterError, setFilterError] = useState(null);
  const [isMenuOpenSort, setIsMenuOpenSort] = useState(false);
  const [isMenuOpenFilter, setIsMenuOpenFilter] = useState(false);
  const [selectedSort, setSelectedSort] = useState("sort[0]=template_name:asc");

  const handleTemplate = useCallback(async () => {
    setLoadingTemplate(true);
    setTemplateError(null);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/templates?${
            filter.length > 0
              ? `${filter
                  .map(
                    (el, index) =>
                      `filters[${el.key}][${
                        el.source ? "$contains" : "$eq"
                      }][${index}]=${el.source ? el.value.name : el.value.id}&`
                  )
                  .join("")}${sort}${pagination}populate=*`
              : `${sort}${pagination}populate=*`
          }`
        )
        .then((val) => {
          setTemplate(val.data);
        });
    } catch (error) {
      setTemplateError(getErrorMessage(error));
    } finally {
      setLoadingTemplate(false);
    }
  }, [filter, sort, pagination]);

  const handleTemplateMobile = async () => {
    setLoadingTemplate(true);
    setTemplateError(null);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/templates?${
            filterMobile.length > 0
              ? `${filterMobile
                  .map(
                    (el, index) =>
                      `filters[${el.key}][${
                        el.source ? "$contains" : "$eq"
                      }][${index}]=${el.source ? el.value.name : el.value.id}&`
                  )
                  .join("")}${sort}${pagination}populate=*`
              : `${sort}${pagination}populate=*`
          }`
        )
        .then((val) => {
          setTemplate(val.data);
        });
    } catch (error) {
      setTemplateError(getErrorMessage(error));
    } finally {
      setLoadingTemplate(false);
    }
  };

  const handleFilter = async () => {
    setLoadingFilter(true);
    setFilterError(null);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/template-categories?populate=*`
        )
        .then((val) => {
          const result = [];

          result.push({
            type: "Kategori",
            key: "template_category",
            value: val.data.data.map((e) => ({
              id: e.id,
              name: e.attributes.desc,
            })),
          });

          result.push({
            type: "Kegunaan",
            key: "template_purposes",
            value: val.data.data.flatMap(
              (e) =>
                e.attributes.template_purposes.data.length > 0 &&
                e.attributes.template_purposes.data.map((el) => ({
                  id: el.id,
                  name: el.attributes.name,
                }))
            ),
          });

          result.push({
            type: "Gaya",
            key: "template_styles",
            value: val.data.data.flatMap((e) =>
              e.attributes.template_styles.data.length > 0
                ? e.attributes.template_styles.data.map((el) => ({
                    id: el.id,
                    name: el.attributes.name,
                  }))
                : []
            ),
          });

          result.push({
            type: "Warna",
            key: "template_colors",
            value: val.data.data.flatMap((e) =>
              e.attributes.template_colors.data.length > 0
                ? e.attributes.template_colors.data.map((el) => ({
                    id: el.id,
                    name: el.attributes.name,
                  }))
                : []
            ),
          });

          setSideFilter(result);
          setShowFilter(
            result.map((el) => ({ key: el.key, show: true, another: false }))
          );
        });
    } catch (error) {
      setFilterError(getErrorMessage(error));
    } finally {
      setLoadingFilter(false);
    }
  };

  useEffect(() => {
    const newFilter = JSON.parse(searchParams.get("filter")) || [];
    setFilter(newFilter);
  }, [searchParams]);

  useEffect(() => {
    handleTemplate();
  }, [handleTemplate]);

  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <>
      <div className="bg-slate-50">
        <Navbar />
        <Layout className={"mb-6 hidden md:block"}>
          <div className="flex w-full justify-between items-center border-b border-gray-200 py-3">
            {filter.length > 0 ? (
              <>
                {filter.some((obj) => Object.keys(obj).includes("source")) ? (
                  <Label
                    type={"section-title"}
                    className={"!text-nowrap"}
                  >{`Cari Template: "${filter.map(
                    (el) => el.value.name
                  )}"`}</Label>
                ) : (
                  <Label
                    type={"section-title"}
                    className={"!text-nowrap"}
                  >{`Semua Template`}</Label>
                )}
              </>
            ) : (
              <Label
                type={"section-title"}
                className={"!text-nowrap"}
              >{`Semua Template`}</Label>
            )}
            <div className="flex items-center font-custom gap-2">
              <Label
                type={"card-desc"}
                className={"!text-nowrap !text-base"}
              >{`Urutkan berdasarkan:`}</Label>
              <span className="flex items-center px-4 py-2 rounded-lg bg-gray-100 border border-gray-300">
                <select
                  value={sort}
                  className="appearance-none bg-transparent focus:outline-none text-sm"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="sort[0]=template_name:asc">A - Z</option>
                  <option value="sort[0]=template_name:desc">Z - A</option>
                  <option value="sort[0]=publishedAt:desc">
                    Terakhir Dibuat
                  </option>
                  <option value="sort[0]=updatedAt:desc">
                    Terakhir Diubah
                  </option>
                  <option value="sort[0]=count_view:desc">
                    Terbanyak Dilihat
                  </option>
                  <option value="sort[0]=count_download:desc">
                    Terbanyak Diunduh
                  </option>
                </select>
                <Icon name={"chevronDown"} className={"h-5 w-5 text-black"} />
              </span>
            </div>
          </div>
          <div className="flex flex-row space-x-4 mt-2 relative">
            <div className="basis-1/6">
              <div className="flex items-center justify-between mb-2">
                <Label
                  type={"card-desc"}
                  className={"!text-lg !font-semibold !text-black"}
                >{`Filter`}</Label>
                <Button
                  type={"link"}
                  size={"small"}
                  className={`!font-normal ${
                    filter.length === 0 && "text-gray-400 hover:no-underline"
                  }`}
                  onClick={() => filter.length !== 0 && setFilter([])}
                >
                  Hapus
                </Button>
              </div>
              {filterError !== null ? (
                <ErrorHandler error={filterError} onRetry={handleFilter} /> //error handle
              ) : (
                <>
                  {loadingFilter ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="flex flex-col gap-2 font-custom border rounded-lg h-fit overflow-hidden divide-y bg-white">
                      {sideFilter.map((el, index) => (
                        <div
                          className="w-full flex flex-col gap-1 p-4"
                          key={index}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold truncate overflow-hidden">
                              {el.type}
                            </p>
                            <Button
                              type={"icon"}
                              className={"!p-0"}
                              onClick={() =>
                                setShowFilter(
                                  showFilter.map((val) =>
                                    val.key === el.key
                                      ? { ...val, show: !val.show }
                                      : val
                                  )
                                )
                              }
                            >
                              {showFilter.find((val) => val.key === el.key)
                                .show ? (
                                <Icon
                                  name={"chevronDown"}
                                  className={"h-4 w-4"}
                                />
                              ) : (
                                <Icon
                                  name={"chevronUp"}
                                  className={"h-4 w-4"}
                                />
                              )}
                            </Button>
                          </div>
                          {showFilter.find((val) => val.key === el.key)
                            .show && (
                            <>
                              {el.value
                                .slice(
                                  0,
                                  showFilter.find(
                                    (values) => values.key === el.key
                                  ).another
                                    ? el.value.length
                                    : 5
                                )
                                .map((val, index) => (
                                  <div
                                    className="flex items-center gap-1"
                                    key={index}
                                  >
                                    <input
                                      type={"checkbox"}
                                      checked={filter.some(
                                        (item) => val.name === item.value.name
                                      )}
                                      onChange={(e) =>
                                        e.target.checked
                                          ? setFilter([
                                              ...filter,
                                              {
                                                type: el.type,
                                                key: el.key,
                                                value: {
                                                  id: val.id,
                                                  name: val.name,
                                                },
                                              },
                                            ])
                                          : setFilter(
                                              filter.filter(
                                                (el) =>
                                                  el.value.name !== val.name ||
                                                  el.value.id !== val.id
                                              )
                                            )
                                      }
                                    />
                                    <p className="text-sm">{val.name}</p>
                                  </div>
                                ))}
                              {el.value.length > 5 &&
                              !showFilter.find((val) => val.key === el.key)
                                .another ? (
                                <Button
                                  type={"link"}
                                  size={"small"}
                                  className={"!p-0 !text-start"}
                                  onClick={() =>
                                    setShowFilter(
                                      showFilter.map((val) =>
                                        val.key === el.key
                                          ? { ...val, another: !val.another }
                                          : val
                                      )
                                    )
                                  }
                                >
                                  Lainnya
                                </Button>
                              ) : el.value.length > 5 ? (
                                <Button
                                  type={"link"}
                                  size={"small"}
                                  className={"!p-0 !text-start"}
                                  onClick={() =>
                                    setShowFilter(
                                      showFilter.map((val) =>
                                        val.key === el.key
                                          ? { ...val, another: !val.another }
                                          : val
                                      )
                                    )
                                  }
                                >
                                  Tutup
                                </Button>
                              ) : (
                                ""
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="basis-5/6">
              <div className="flex gap-2 mb-2">
                {filter.map((el, index) => (
                  <Badges
                    key={index}
                    size={"medium"}
                    className={
                      "!w-fit !rounded-full !flex !items-center !gap-1"
                    }
                  >
                    {el.value.name}
                    <Button
                      type={"icon"}
                      className={"!p-0"}
                      onClick={() =>
                        setFilter(
                          filter.filter((e) => e.value.id !== el.value.id)
                        )
                      }
                    >
                      <Icon name={"x"} className={"h-8 w-8"} />
                    </Button>
                  </Badges>
                ))}
              </div>
              {templateError !== null ? (
                <ErrorHandler error={templateError} onRetry={handleTemplate} /> //error handle
              ) : (
                <>
                  {loadingTemplate ? (
                    <div className="grid grid-cols-3 gap-4 animate-pulse">
                      {Array.from(Array(9), (e, i) => (
                        <div
                          key={i}
                          className="w-full h-[400px] rounded-lg bg-slate-200"
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 gap-4">
                        {template.data.length > 0 ? (
                          template?.data.map((val, index) => (
                            <Card
                              route={`/template?${createSearchParams({
                                filter: JSON.stringify({
                                  id: val.id,
                                  name: val.attributes.template_name,
                                }),
                              })}`}
                              key={index}
                              id={val.id}
                              category={
                                val.attributes.template_category.data.attributes
                                  .desc
                              }
                              images={val.attributes.template_image.data}
                              title={val.attributes.template_name}
                              description={val.attributes.template_description}
                              count_view={val.attributes.count_view}
                              count_like={val.attributes.count_view}
                              template_canva_url={
                                val.attributes.template_canva_url
                              }
                              template_google_url={
                                val.attributes.template_google_url
                              }
                              count_video={
                                val.attributes.tutorial_and_tips.data.length
                              }
                            />
                          ))
                        ) : (
                          <Label
                            type={"section-desc"}
                            className={"!text-nowrap"}
                          >
                            Template Tidak Ditemukan
                          </Label>
                        )}
                      </div>
                      {template.data.length > 0 && (
                        <div className="flex w-full justify-end gap-2">
                          <Button
                            type={"link"}
                            size={"medium"}
                            className={
                              template.meta.pagination.page === 1 &&
                              "!text-blue-300 hover:!no-underline"
                            }
                            onClick={() =>
                              template.meta.pagination.page === 1
                                ? ""
                                : setPagination(
                                    `&pagination[page]=${
                                      template.meta.pagination.page - 1
                                    }&pagination[pageSize]=8&`
                                  )
                            }
                          >
                            Prev
                          </Button>
                          <Button
                            type={"link"}
                            size={"medium"}
                            className={
                              template.meta.pagination.page ===
                                template.meta.pagination.pageCount &&
                              "!text-blue-300 hover:!no-underline"
                            }
                            onClick={() =>
                              template.meta.pagination.page ===
                              template.meta.pagination.pageCount
                                ? ""
                                : setPagination(
                                    `&pagination[page]=${
                                      template.meta.pagination.page + 1
                                    }&pagination[pageSize]=8&`
                                  )
                            }
                          >
                            Next
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </Layout>

        {/* Mobile */}
        <Layout className={"mb-6 md:hidden block"}>
          <div className="flex justify-between w-full border-b border-gray-200 py-3">
            {filter.length > 0 ? (
              <>
                {filter.some((obj) => Object.keys(obj).includes("source")) ? (
                  <Label
                    type={"section-title"}
                    className={"!text-nowrap"}
                  >{`Cari Template: "${filter.map(
                    (el) => el.value.name
                  )}"`}</Label>
                ) : (
                  <Label
                    type={"section-title"}
                    className={"!text-nowrap"}
                  >{`Semua Template`}</Label>
                )}
              </>
            ) : (
              <Label
                type={"section-title"}
                className={"!text-nowrap"}
              >{`Semua Template`}</Label>
            )}

            <div className="flex items-center gap-3">
              <Button
                type={`icon`}
                className={`!p-0 !relative`}
                onClick={() => setIsMenuOpenSort(!isMenuOpenSort)}
              >
                {selectedSort !== "sort[0]=template_name:asc" && (
                  <span className="absolute flex h-2.5 w-2.5 rounded-full bg-blue-400 top-0 right-0 z-10"></span>
                )}
                <div className={`relative`}>
                  <Icon name={"sort-down"} className={"h-6 w-6 text-black"} />
                </div>
              </Button>
              <Button
                type={`icon`}
                className={`!p-0 !relative`}
                onClick={() => setIsMenuOpenFilter(!isMenuOpenFilter)}
              >
                {filterMobile.length > 0 && (
                  <span className="absolute flex h-2.5 w-2.5 rounded-full bg-blue-400 top-0 right-0 z-10"></span>
                )}
                <div className={`relative`}>
                  <Icon name={"funnel"} className={"h-6 w-6 text-black"} />
                </div>
              </Button>
            </div>
          </div>
          <div className="flex flex-row space-x-4 mt-2 relative">
            <div className="">
              <div className="flex gap-2 mb-2 flex-wrap">
                {filterMobile.map((el, index) => (
                  <Badges
                    key={index}
                    size={"medium"}
                    className={
                      "!w-fit !rounded-full !flex !items-center !gap-1"
                    }
                  >
                    {el.value.name}
                  </Badges>
                ))}
              </div>
              {templateError !== null ? (
                <ErrorHandler error={templateError} onRetry={handleTemplate} /> //error handle
              ) : (
                <>
                  {loadingTemplate ? (
                    <div className="grid grid-cols-1 gap-4 animate-pulse">
                      {Array.from(Array(9), (e, i) => (
                        <div
                          key={i}
                          className="w-full h-[400px] rounded-lg bg-slate-200"
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-4">
                        {template.data.length > 0 ? (
                          template?.data.map((val, index) => (
                            <Card
                              route={`/template?${createSearchParams({
                                filter: JSON.stringify({
                                  id: val.id,
                                  name: val.attributes.template_name,
                                }),
                              })}`}
                              key={index}
                              id={val.id}
                              category={
                                val.attributes.template_category.data.attributes
                                  .desc
                              }
                              images={val.attributes.template_image.data}
                              title={val.attributes.template_name}
                              description={val.attributes.template_description}
                              count_view={val.attributes.count_view}
                              count_like={val.attributes.count_view}
                              template_canva_url={
                                val.attributes.template_canva_url
                              }
                              template_google_url={
                                val.attributes.template_google_url
                              }
                              count_video={
                                val.attributes.tutorial_and_tips.data.length
                              }
                            />
                          ))
                        ) : (
                          <Label
                            type={"section-desc"}
                            className={"!text-nowrap"}
                          >
                            Template Tidak Ditemukan
                          </Label>
                        )}
                      </div>
                      {template.data.length > 0 && (
                        <div className="flex w-full justify-end gap-2">
                          <Button
                            type={"link"}
                            size={"medium"}
                            className={
                              template.meta.pagination.page === 1 &&
                              "!text-blue-300 hover:!no-underline"
                            }
                            onClick={() =>
                              template.meta.pagination.page === 1
                                ? ""
                                : setPagination(
                                    `&pagination[page]=${
                                      template.meta.pagination.page - 1
                                    }&pagination[pageSize]=8&`
                                  )
                            }
                          >
                            Prev
                          </Button>
                          <Button
                            type={"link"}
                            size={"medium"}
                            className={
                              template.meta.pagination.page ===
                                template.meta.pagination.pageCount &&
                              "!text-blue-300 hover:!no-underline"
                            }
                            onClick={() =>
                              template.meta.pagination.page ===
                              template.meta.pagination.pageCount
                                ? ""
                                : setPagination(
                                    `&pagination[page]=${
                                      template.meta.pagination.page + 1
                                    }&pagination[pageSize]=8&`
                                  )
                            }
                          >
                            Next
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </Layout>
        <Footer />
      </div>

      {/* Sorting Mobile */}
      <SideFilter
        isMenuOpen={isMenuOpenSort}
        setIsMenuOpen={setIsMenuOpenSort}
        label={"Urutkan"}
      >
        <Button
          type={"link"}
          size={"medium"}
          className={`!font-normal !flex !justify-start !px-0 ${
            selectedSort === "sort[0]=template_name:asc" &&
            "text-gray-400 hover:no-underline"
          }`}
          onClick={() => setSelectedSort("sort[0]=template_name:asc")}
        >
          Reset
        </Button>
        <div className="flex flex-col gap-2 border rounded-lg px-4 py-2">
          <div className="flex items-center">
            <input
              id="sort[0]=template_name:asc"
              type="radio"
              name="radio-vertical-group"
              className="hidden checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500"
              checked={selectedSort === "sort[0]=template_name:asc"}
              onChange={(e) => setSelectedSort(e.target.id)}
            />
            <label
              htmlFor="sort[0]=template_name:asc"
              className="flex items-center cursor-pointer text-gray-600 text-xl font-normal"
            >
              <span
                className={`border border-gray-300 rounded-full mr-2 w-5 h-5 ${
                  selectedSort === "sort[0]=template_name:asc"
                    ? "bg-blue-500"
                    : ""
                }`}
              ></span>
              A - Z
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="sort[0]=template_name:desc"
              type="radio"
              name="radio-vertical-group"
              className="hidden checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500"
              checked={selectedSort === "sort[0]=template_name:desc"}
              onChange={(e) => setSelectedSort(e.target.id)}
            />
            <label
              htmlFor="sort[0]=template_name:desc"
              className="flex items-center cursor-pointer text-gray-600 text-xl font-normal"
            >
              <span
                className={`border border-gray-300 rounded-full mr-2 w-5 h-5 ${
                  selectedSort === "sort[0]=template_name:desc"
                    ? "bg-blue-500"
                    : ""
                }`}
              ></span>
              Z - A
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="sort[0]=publishedAt:desc"
              type="radio"
              name="radio-vertical-group"
              className="hidden checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500"
              checked={selectedSort === "sort[0]=publishedAt:desc"}
              onChange={(e) => setSelectedSort(e.target.id)}
            />
            <label
              htmlFor="sort[0]=publishedAt:desc"
              className="flex items-center cursor-pointer text-gray-600 text-xl font-normal"
            >
              <span
                className={`border border-gray-300 rounded-full mr-2 w-5 h-5 ${
                  selectedSort === "sort[0]=publishedAt:desc"
                    ? "bg-blue-500"
                    : ""
                }`}
              ></span>
              Terakhir Dibuat
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="sort[0]=updatedAt:desc"
              type="radio"
              name="radio-vertical-group"
              className="hidden checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500"
              checked={selectedSort === "sort[0]=updatedAt:desc"}
              onChange={(e) => setSelectedSort(e.target.id)}
            />
            <label
              htmlFor="sort[0]=updatedAt:desc"
              className="flex items-center cursor-pointer text-gray-600 text-xl font-normal"
            >
              <span
                className={`border border-gray-300 rounded-full mr-2 w-5 h-5 ${
                  selectedSort === "sort[0]=updatedAt:desc" ? "bg-blue-500" : ""
                }`}
              ></span>
              Terakhir Diubah
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="sort[0]=count_view:desc"
              type="radio"
              name="radio-vertical-group"
              className="hidden checked:bg-no-repeat checked:bg-center checked:border-blue-500 checked:bg-blue-500"
              checked={selectedSort === "sort[0]=count_view:desc"}
              onChange={(e) => setSelectedSort(e.target.id)}
            />
            <label
              htmlFor="sort[0]=count_view:desc"
              className="flex items-center cursor-pointer text-gray-600 text-xl font-normal"
            >
              <span
                className={`border border-gray-300 rounded-full mr-2 w-5 h-5 ${
                  selectedSort === "sort[0]=count_view:desc"
                    ? "bg-blue-500"
                    : ""
                }`}
              ></span>
              Terakhir Diunduh
            </label>
          </div>
        </div>
        <Button
          type={"fill"}
          size={"large"}
          className={"w-full mt-2"}
          onClick={() => {
            setIsMenuOpenSort(!isMenuOpenSort);
            setSort(selectedSort);
          }}
        >
          Terapkan
        </Button>
      </SideFilter>

      {/* Filter Mobile */}
      <SideFilter
        isMenuOpen={isMenuOpenFilter}
        setIsMenuOpen={setIsMenuOpenFilter}
        label={"Filter"}
      >
        <div>
          <Button
            type={"link"}
            size={"medium"}
            className={`!font-normal !px-0 ${
              filterMobile.length === 0 && "text-gray-400 hover:no-underline"
            }`}
            onClick={() => filterMobile.length !== 0 && setFilterMobile([])}
          >
            Reset
          </Button>
          {filterError !== null ? (
            <ErrorHandler error={filterError} onRetry={handleFilter} /> //error handle
          ) : (
            <>
              {loadingFilter ? (
                <p>Loading...</p>
              ) : (
                <div className="flex flex-col gap-2 font-custom border rounded-lg h-fit overflow-hidden divide-y bg-white">
                  {sideFilter.map((el, index) => (
                    <div className="w-full flex flex-col gap-1 p-4" key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-semibold truncate overflow-hidden">
                          {el.type}
                        </p>
                        <Button
                          type={"icon"}
                          className={"!p-0"}
                          onClick={() =>
                            setShowFilter(
                              showFilter.map((val) =>
                                val.key === el.key
                                  ? { ...val, show: !val.show }
                                  : val
                              )
                            )
                          }
                        >
                          {showFilter.find((val) => val.key === el.key).show ? (
                            <Icon name={"chevronDown"} className={"h-4 w-4"} />
                          ) : (
                            <Icon name={"chevronUp"} className={"h-4 w-4"} />
                          )}
                        </Button>
                      </div>
                      {showFilter.find((val) => val.key === el.key).show && (
                        <>
                          {el.value
                            .slice(
                              0,
                              showFilter.find((values) => values.key === el.key)
                                .another
                                ? el.value.length
                                : 5
                            )
                            .map((val, index) => (
                              <div
                                className="flex items-center gap-1"
                                key={index}
                              >
                                <input
                                  type={"checkbox"}
                                  checked={filterMobile.some(
                                    (item) => val.name === item.value.name
                                  )}
                                  onChange={(e) =>
                                    e.target.checked
                                      ? setFilterMobile([
                                          ...filterMobile,
                                          {
                                            type: el.type,
                                            key: el.key,
                                            value: {
                                              id: val.id,
                                              name: val.name,
                                            },
                                          },
                                        ])
                                      : setFilterMobile(
                                          filterMobile.filter(
                                            (el) =>
                                              el.value.name !== val.name ||
                                              el.value.id !== val.id
                                          )
                                        )
                                  }
                                />
                                <p className="text-xl">{val.name}</p>
                              </div>
                            ))}
                          {el.value.length > 5 &&
                          !showFilter.find((val) => val.key === el.key)
                            .another ? (
                            <Button
                              type={"link"}
                              size={"medium"}
                              className={"!p-0 !text-start"}
                              onClick={() =>
                                setShowFilter(
                                  showFilter.map((val) =>
                                    val.key === el.key
                                      ? { ...val, another: !val.another }
                                      : val
                                  )
                                )
                              }
                            >
                              Lainnya
                            </Button>
                          ) : el.value.length > 5 ? (
                            <Button
                              type={"link"}
                              size={"medium"}
                              className={"!p-0 !text-start"}
                              onClick={() =>
                                setShowFilter(
                                  showFilter.map((val) =>
                                    val.key === el.key
                                      ? { ...val, another: !val.another }
                                      : val
                                  )
                                )
                              }
                            >
                              Tutup
                            </Button>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <Button
                type={"fill"}
                size={"large"}
                className={"w-full mt-2"}
                onClick={() => {
                  setIsMenuOpenFilter(!isMenuOpenFilter);
                  handleTemplateMobile();
                }}
              >
                Terapkan
              </Button>
            </>
          )}
        </div>
      </SideFilter>
    </>
  );
};

export default AllTemplate;
