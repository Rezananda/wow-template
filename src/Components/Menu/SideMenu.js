import { useNavigate } from "react-router-dom";
import Icon from "../../Assets/Icon/Icon";
import Button from "../Button/Button";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import SearchBar from "../Input/SearchBar";
import Menu from "./Menu";

const SideMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  showExplore,
  setShowExplore,
  loadingFilter,
  error,
  handleNavbar,
  filterTutorialAndTip,
  filterTemplate,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`fixed overflow-y-scroll font-custom top-0 left-0 w-full h-full z-30 bg-white shadow-lg transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <Button
              type={`icon`}
              className={`!p-0 !relative !flex`}
              onClick={() => navigate("/favorite")}
            >
              <div
                className={`rounded-lg relative inline-flex  p-3  items-center justify-center backdrop-blur-sm bg-blue-200 hover:bg-blue-300 `}
              >
                <Icon name={"heart"} className={"h-6 w-6 text-black"} />
              </div>
            </Button>
            <Button
              type={`icon`}
              className={`!p-0 !flex `}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={"x"} className={"h-10 w-10 text-black"} />
            </Button>
          </div>
          <SearchBar />
          <ul className="w-full flex flex-col gap-2 px-2">
            <li>
              <div
                className={
                  "flex flex-col md:flex-row items-center cursor-pointer "
                }
              >
                <div
                  className="flex items-center w-full justify-between"
                  onClick={() =>
                    setShowExplore({
                      ...showExplore,
                      template: !showExplore.template,
                    })
                  }
                >
                  <p className="text-black text-2xl font-medium py-2">
                    Template
                  </p>

                  {showExplore.template ? (
                    <Icon name={"dash"} className={"h-7 w-7 text-black p-0"} />
                  ) : (
                    <Icon name={"plus"} className={"h-7 w-7 text-black"} />
                  )}
                </div>
                {showExplore.template && (
                  <>
                    {error !== null ? (
                      <div className="flex flex-col absolute top-full w-max shadow-md bg-white rounded-lg">
                        <ul className="p-2 space-y-1 divide-y">
                          <ErrorHandler error={error} onRetry={handleNavbar} />
                        </ul>
                      </div> //error handle
                    ) : (
                      <>
                        {loadingFilter ? (
                          <p>Loading...</p>
                        ) : (
                          <div className="flex gap-2 w-full pl-4">
                            <div className="after:block after:bg-gray-400 after:w-[1px] after:h-full"></div>
                            <div className="flex flex-col w-full">
                              <ul>
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
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </li>
            <li>
              <div
                className={
                  "flex flex-col md:flex-row items-center cursor-pointer "
                }
                onClick={() =>
                  setShowExplore({
                    ...showExplore,
                    tutorial: !showExplore.tutorial,
                  })
                }
              >
                <div className="flex items-center w-full justify-between">
                  <span className="text-black text-2xl font-medium">Video</span>

                  {showExplore.tutorial ? (
                    <Icon name={"dash"} className={"h-7 w-7 text-black"} />
                  ) : (
                    <Icon name={"plus"} className={"h-7 w-7 text-black"} />
                  )}
                </div>
                {showExplore.tutorial && (
                  <>
                    {error !== null ? (
                      <div className="flex flex-col absolute top-full w-max shadow-md bg-white rounded-lg">
                        <ul className="p-2 space-y-1 divide-y">
                          <ErrorHandler error={error} onRetry={handleNavbar} />
                        </ul>
                      </div> //error handle
                    ) : (
                      <>
                        {loadingFilter ? (
                          <p>Loading...</p>
                        ) : (
                          <div className="flex gap-2 w-full pl-4">
                            <div className="after:block after:bg-gray-400 after:w-[1px] after:h-full"></div>
                            <div className="flex flex-col w-full">
                              <ul>
                                {filterTutorialAndTip.data.map((el, index) => (
                                  <Menu
                                    key={index}
                                    item={el}
                                    showExplore={showExplore}
                                    setShowExplore={setShowExplore}
                                  />
                                ))}
                                <li className="hover:no-underline hover:bg-gray-100 hover:rounded-md hover:w-full md:p-2">
                                  <Button
                                    type={"link"}
                                    size={"large"}
                                    // onClick={() => {
                                    //   navigate("/all-video");
                                    //   setShowExplore({
                                    //     ...showExplore,
                                    //     video: false,
                                    //   });
                                    // }}
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
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
