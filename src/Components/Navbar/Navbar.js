import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../../Assets/Icon/Icon";
import Logo from "../../Assets/Icon/Logo";
import { useFavorites } from "../../Context/FavoritesProvider";
import { ScrollContext } from "../../Context/ScrollProvider";
import { getErrorMessage } from "../../Utils/errorUtils";
import Button from "../Button/Button";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import SearchBar from "../Input/SearchBar";
import Layout from "../Layout/Layout";
import Menu from "../Menu/Menu";
import SideMenu from "../Menu/SideMenu";
import Modal from "../Modal/Modal";

const Navbar = () => {
  const [showExplore, setShowExplore] = useState({
    template: false,
    tutorial: false,
  });
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const location = useLocation();
  const [filterTemplate, setFilterTemplate] = useState({
    data: [
      {
        attributes: {
          desc: "",
        },
      },
    ],
  });

  const [filterTutorialAndTip, setFilterTutorialAndTip] = useState({
    data: [
      {
        attributes: {
          desc: "",
        },
      },
    ],
  });

  const { favorites } = useFavorites();
  const isScrolled = useContext(ScrollContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavbar = async () => {
    setLoadingFilter(true);
    setError(null);
    try {
      const endpoints = [
        `${process.env.REACT_APP_API_URL}/api/template-categories?populate=*`,
        `${process.env.REACT_APP_API_URL}/api/tutorial-and-tip-categories?populate=*`,
      ];
      await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        axios.spread(
          ({ data: templateCategory }, { data: tutorialAndTipsCategory }) => {
            setFilterTemplate(templateCategory);
            setFilterTutorialAndTip(tutorialAndTipsCategory);
          }
        )
      );
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoadingFilter(false);
    }
  };

  useEffect(() => {
    handleNavbar();
  }, []);

  return (
    <>
      <div className="flex w-full bg-blue-200 p-2 md:hidden items-center gap-2 text-blue-500">
        <Icon name={"exclamation-circle"} className={"h-8 w-8"} />
        <p className="font-custom text-xs ">
          Akses pada Browser laptop / desktop untuk pengalaman yang lebih
          maksimal
        </p>
      </div>
      <nav
        className={` py-4 font-custom sticky top-0 z-20 ${
          isScrolled && "shadow-lg backdrop-blur-sm bg-white/30"
        }`}
      >
        <Layout>
          {/* <div className="flex flex-row"> */}
          <div className="flex items-center justify-between w-full">
            <ul className="flex items-center space-x-10">
              <li>
                <a href="/" className="items-center">
                  <Logo />
                </a>
              </li>
              <li className="relative hidden md:flex">
                <div
                  className={" flex items-center gap-1 cursor-pointer "}
                  onMouseEnter={() =>
                    setShowExplore({
                      ...showExplore,
                      template: !showExplore.template,
                    })
                  }
                  onMouseLeave={() =>
                    setShowExplore({
                      ...showExplore,
                      template: !showExplore.template,
                    })
                  }
                >
                  <span
                    className="text-black text-lg font-medium"
                    onClick={() => navigate("/all-template")}
                  >
                    Template
                  </span>

                  {showExplore.template ? (
                    <Icon name={"chevronUp"} className={"h-5 w-5 text-black"} />
                  ) : (
                    <Icon
                      name={"chevronDown"}
                      className={"h-5 w-5 text-black"}
                    />
                  )}
                  {showExplore.template && (
                    <>
                      {error !== null ? (
                        <div className="flex flex-col absolute top-full w-max shadow-md bg-white rounded-lg">
                          <ul className="p-2 space-y-1 divide-y">
                            <ErrorHandler
                              error={error}
                              onRetry={handleNavbar}
                            />
                          </ul>
                        </div> //error handle
                      ) : (
                        <>
                          {loadingFilter ? (
                            <p>Loading...</p>
                          ) : (
                            <div className="flex flex-col absolute top-full w-max shadow-md bg-white rounded-lg">
                              <ul className="p-2 space-y-1 divide-y">
                                {filterTemplate.data.map((el, index) => (
                                  <Menu
                                    key={index}
                                    item={el}
                                    showExplore={showExplore}
                                    setShowExplore={setShowExplore}
                                  />
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </li>
              <li className="relative hidden md:flex">
                <div
                  onMouseEnter={() =>
                    setShowExplore({
                      ...showExplore,
                      tutorial: !showExplore.tutorial,
                    })
                  }
                  onMouseLeave={() =>
                    setShowExplore({
                      ...showExplore,
                      tutorial: !showExplore.tutorial,
                    })
                  }
                  className={"flex items-center gap-1 cursor-pointer "}
                >
                  <span
                    className="text-black text-lg font-medium"
                    onClick={() => navigate("/all-video")}
                  >
                    Video
                  </span>

                  {showExplore.tutorial ? (
                    <Icon name={"chevronUp"} className={"h-5 w-5 text-black"} />
                  ) : (
                    <Icon
                      name={"chevronDown"}
                      className={"h-5 w-5 text-black"}
                    />
                  )}
                  {showExplore.tutorial && (
                    <>
                      {error !== null ? (
                        <div className="flex flex-col absolute top-full w-max shadow-md bg-white rounded-lg">
                          <ul className="p-2 space-y-1 divide-y">
                            <ErrorHandler
                              error={error}
                              onRetry={handleNavbar}
                            />
                          </ul>
                        </div> //error handle
                      ) : (
                        <>
                          {loadingFilter ? (
                            <p>Loading...</p>
                          ) : (
                            <div className="flex flex-col absolute top-full w-max shadow-md bg-white rounded-lg">
                              <ul className="p-2 space-y-1 divide-y">
                                {filterTutorialAndTip.data.map((el, index) => (
                                  <Menu
                                    key={index}
                                    item={el}
                                    showExplore={showExplore}
                                    setShowExplore={setShowExplore}
                                  />
                                ))}
                                <li className="hover:no-underline hover:bg-gray-100 hover:rounded-md hover:w-full p-2">
                                  <Button
                                    type={"link"}
                                    size={"medium"}
                                    onClick={() => {
                                      navigate("/all-video");
                                      setShowExplore({
                                        ...showExplore,
                                        video: false,
                                      });
                                    }}
                                    className={`!flex py-1 !items-center !gap-2 !font-semibold hover:!no-underline !text-black `}
                                  >
                                    Lihat Semua{" "}
                                    <Icon
                                      name={"arrowRight"}
                                      className={"h-4 w-4"}
                                    />
                                  </Button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </li>
            </ul>
            <ul className="items-center gap-4 flex">
              {/* <li>
                  <a
                    href={`${process.env.REACT_APP_HREF}/create-template`}
                    className={`p-0 text-lg text-black hover:!text-blue-500 hover:underline`}
                  >
                    Ingin dibuatkan template?
                  </a>
                </li> */}
              {location.pathname !== "/" && (
                <li className="relative hidden md:flex">
                  <Button
                    type={`icon`}
                    className={`!p-0 !flex `}
                    onClick={() => setShowSearchBar(true)}
                  >
                    <div className="rounded-full p-3 flex items-center justify-center backdrop-blur-sm bg-blue-200 hover:bg-blue-300">
                      <Icon name={"search"} className={"h-5 w-5 text-black"} />
                    </div>
                  </Button>
                </li>
              )}
              <li>
                <Button
                  type={`icon`}
                  className={`!p-0 !relative !hidden md:!flex`}
                  onClick={() => navigate("/favorite")}
                >
                  {favorites.length > 0 && (
                    <span className="absolute flex h-3 w-3 rounded-full bg-blue-400 top-0 right-0 z-10"></span>
                  )}
                  <div
                    className={`rounded-full relative inline-flex  p-3  items-center justify-center backdrop-blur-sm bg-blue-200 hover:bg-blue-300 `}
                  >
                    <Icon name={"heart"} className={"h-5 w-5 text-black"} />
                  </div>
                </Button>
              </li>
              <li className="relative md:hidden">
                <Button
                  type={`icon`}
                  className={`!p-0 !flex `}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="rounded-lg p-2 flex items-center justify-center backdrop-blur-sm bg-blue-200 hover:bg-blue-300">
                    <Icon name={"list"} className={"h-8 w-8 text-black"} />
                  </div>
                </Button>
              </li>
            </ul>
          </div>
          {/* </div> */}
        </Layout>
      </nav>
      {showSearchBar && (
        <Modal handleClose={() => setShowSearchBar(false)}>
          <div className="flex flex-col w-full">
            <div className="flex w-full justify-end">
              <Button
                type={"icon"}
                className={"!p-0 !text-white"}
                onClick={() => setShowSearchBar(false)}
              >
                <Icon name={"x"} className={"h-10 w-10"} />
              </Button>
            </div>
            <SearchBar
              className={"!drop-shadow-lg"}
              handleClose={() => setShowSearchBar(false)}
            />
          </div>
        </Modal>
      )}
      <SideMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        showExplore={showExplore}
        setShowExplore={setShowExplore}
        loadingFilter={loadingFilter}
        error={error}
        handleNavbar={handleNavbar}
        filterTutorialAndTip={filterTutorialAndTip}
        filterTemplate={filterTemplate}
      />
    </>
  );
};

export default Navbar;
