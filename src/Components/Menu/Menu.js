import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Icon from "../../Assets/Icon/Icon";
import Button from "../Button/Button";
import SubMenu from "./SubMenu";

const Menu = ({ item, showExplore, setShowExplore }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenuMore, setShowSubmenuMore] = useState({
    color: false,
    purpose: false,
    style: false,
  });
  const navigate = useNavigate();

  return (
    <>
      <li
        className="hover:bg-gray-100 hover:rounded-md hover:w-full relative md:p-2 py-2 md:block hidden"
        onMouseEnter={() => setShowSubMenu(!showSubMenu)}
        onMouseLeave={() => setShowSubMenu(!showSubMenu)}
      >
        <Button
          onClick={() =>
            navigate({
              pathname:
                item.attributes.name !== "tutorial" &&
                item.attributes.name !== "tips"
                  ? "/all-template"
                  : "/all-video",
              search: `?${createSearchParams({
                filter: JSON.stringify([
                  {
                    type: "Kategori",
                    key:
                      item.attributes.name !== "tutorial" &&
                      item.attributes.name !== "tips"
                        ? "template_category"
                        : "tutorial_and_tip_category",
                    value: {
                      name: item.attributes.desc,
                      id: item.id,
                    },
                  },
                ]),
              })}`,
            })
          }
          type={"link"}
          size={"medium"}
          className={`md:!flex !hidden !py-1 !justify-between !w-full !items-center !gap-2 !font-normal hover:!no-underline !text-black`}
        >
          {item.attributes.desc}{" "}
          {item.attributes.name !== "tutorial" &&
            item.attributes.name !== "tips" && (
              <Icon
                name={"chevronRight"}
                className={"h-3 w-3 md:block hidden"}
              />
            )}
        </Button>

        {(item.attributes.name === "slide" ||
          item.attributes.name === "sheet" ||
          item.attributes.name === "doc") &&
          showSubMenu && (
            <div className="md:flex hidden flex-col md:absolute md:left-full md:top-0 w-max md:shadow-md md:bg-white rounded-lg ">
              <ul className="p-2 space-y-1 divide-y">
                {item.attributes.template_colors.data.length > 0 && (
                  <li
                    className="hover:bg-gray-100 hover:rounded-md hover:w-ful relative p-2"
                    onMouseEnter={() =>
                      setShowSubmenuMore({
                        ...showSubMenuMore,
                        color: !showSubMenuMore.color,
                      })
                    }
                    onMouseLeave={() =>
                      setShowSubmenuMore({
                        ...showSubMenuMore,
                        color: !showSubMenuMore.color,
                      })
                    }
                  >
                    <Button
                      type={"link"}
                      size={"medium"}
                      className={`!flex py-1 !justify-between !w-full !items-center !gap-2 !font-normal hover:!no-underline !text-black`}
                    >
                      Berdasarkan Warna{" "}
                      <Icon name={"chevronRight"} className={"h-3 w-3"} />
                    </Button>
                    {showSubMenuMore.color && (
                      <SubMenu
                        items={item.attributes.template_colors.data}
                        setShowExplore={setShowExplore}
                        setShowSubMenu={setShowSubMenu}
                        showExplore={showExplore}
                        keys={"template_colors"}
                        types={"Warna Template"}
                        itemId={item.id}
                        itemName={item.attributes.desc}
                      />
                    )}
                  </li>
                )}
                {item.attributes.template_purposes.data.length > 0 && (
                  <li
                    className="hover:bg-gray-100 hover:rounded-md hover:w-ful relative p-2"
                    onMouseEnter={() =>
                      setShowSubmenuMore({
                        ...showSubMenuMore,
                        purpose: !showSubMenuMore.purpose,
                      })
                    }
                    onMouseLeave={() =>
                      setShowSubmenuMore({
                        ...showSubMenuMore,
                        purpose: !showSubMenuMore.purpose,
                      })
                    }
                  >
                    <Button
                      type={"link"}
                      size={"medium"}
                      className={`!flex !py-1 !justify-between !w-full !items-center !gap-2 !font-normal hover:!no-underline !text-black`}
                    >
                      Berdasarkan Kegunaan{" "}
                      <Icon name={"chevronRight"} className={"h-3 w-3"} />
                    </Button>
                    {showSubMenuMore.purpose && (
                      <SubMenu
                        items={item.attributes.template_purposes.data}
                        setShowExplore={setShowExplore}
                        setShowSubMenu={setShowSubMenu}
                        showExplore={showExplore}
                        keys={"template_purposes"}
                        types={"Warna Template"}
                        itemId={item.id}
                        itemName={item.attributes.desc}
                      />
                    )}
                  </li>
                )}
                {item.attributes.template_styles.data.length > 0 && (
                  <li
                    className="hover:bg-gray-100 hover:rounded-md hover:w-ful relative p-2"
                    onMouseEnter={() =>
                      setShowSubmenuMore({
                        ...showSubMenuMore,
                        style: !showSubMenuMore.style,
                      })
                    }
                    onMouseLeave={() =>
                      setShowSubmenuMore({
                        ...showSubMenuMore,
                        style: !showSubMenuMore.style,
                      })
                    }
                  >
                    <Button
                      type={"link"}
                      size={"medium"}
                      className={`!flex !py-1 !justify-between !w-full !items-center !gap-2 !font-normal hover:!no-underline !text-black`}
                    >
                      Berdasarkan Gaya{" "}
                      <Icon name={"chevronRight"} className={"h-3 w-3"} />
                    </Button>
                    {showSubMenuMore.style && (
                      <SubMenu
                        items={item.attributes.template_styles.data}
                        setShowExplore={setShowExplore}
                        setShowSubMenu={setShowSubMenu}
                        showExplore={showExplore}
                        keys={"template_styles"}
                        types={"Warna Template"}
                        itemId={item.id}
                        itemName={item.attributes.desc}
                      />
                    )}
                  </li>
                )}
              </ul>
            </div>
          )}
      </li>

      {/* Mobile */}
      <li className="block md:hidden">
        <Button
          onClick={() => setShowSubMenu(!showSubMenu)}
          type={"link"}
          className={`!flex !text-xl !px-0 !pl-4 !justify-between !w-full !items-center !gap-2 !font-normal hover:!no-underline !text-black`}
        >
          {item.attributes.desc}{" "}
          {item.attributes.name !== "tutorial" &&
            item.attributes.name !== "tips" &&
            (showSubMenu ? (
              <Icon name={"dash"} className={"h-7 w-7 block md:hidden"} />
            ) : (
              <Icon name={"plus"} className={"h-7 w-7 block md:hidden"} />
            ))}
        </Button>

        {(item.attributes.name === "slide" ||
          item.attributes.name === "sheet" ||
          item.attributes.name === "doc") &&
          showSubMenu && (
            <div className="flex flex-col w-full rounded-lg pl-6">
              <div className="flex gap-4">
                <div className="after:block after:bg-gray-400 after:w-[1px] after:h-full"></div>
                <ul className="flex flex-col justify-center w-full">
                  {item.attributes.template_colors.data.length > 0 && (
                    <li
                      className="py-2 w-full"
                      onClick={() =>
                        setShowSubmenuMore({
                          ...showSubMenuMore,
                          color: !showSubMenuMore.color,
                          purpose: false,
                          style: false,
                        })
                      }
                    >
                      <Button
                        type={"link"}
                        size={"large"}
                        className={`!flex !p-0 !justify-between !w-full !items-center !gap-2 !font-normal hover:!no-underline !text-black`}
                      >
                        Berdasarkan Warna{" "}
                        {showSubMenuMore.color ? (
                          <Icon
                            name={"dash"}
                            className={"h-7 w-7 block md:hidden"}
                          />
                        ) : (
                          <Icon
                            name={"plus"}
                            className={"h-7 w-7 block md:hidden"}
                          />
                        )}
                      </Button>
                      {showSubMenuMore.color && (
                        <SubMenu
                          items={item.attributes.template_colors.data}
                          setShowExplore={setShowExplore}
                          setShowSubMenu={setShowSubMenu}
                          showExplore={showExplore}
                          keys={"template_colors"}
                          types={"Warna Template"}
                          itemId={item.id}
                          itemName={item.attributes.desc}
                        />
                      )}
                    </li>
                  )}
                  {item.attributes.template_purposes.data.length > 0 && (
                    <li
                      className="py-2"
                      onClick={() =>
                        setShowSubmenuMore({
                          ...showSubMenuMore,
                          purpose: !showSubMenuMore.purpose,
                          color: false,
                          style: false,
                        })
                      }
                    >
                      <Button
                        type={"link"}
                        size={"large"}
                        className={`!flex !py-1 !p-0 !justify-between !w-full !items-center !gap-2 !font-normal hover:!no-underline !text-black`}
                      >
                        Berdasarkan Kegunaan{" "}
                        {showSubMenuMore.color ? (
                          <Icon
                            name={"dash"}
                            className={"h-7 w-7 block md:hidden"}
                          />
                        ) : (
                          <Icon
                            name={"plus"}
                            className={"h-7 w-7 block md:hidden"}
                          />
                        )}
                      </Button>
                      {showSubMenuMore.purpose && (
                        <SubMenu
                          items={item.attributes.template_purposes.data}
                          setShowExplore={setShowExplore}
                          setShowSubMenu={setShowSubMenu}
                          showExplore={showExplore}
                          keys={"template_purposes"}
                          types={"Warna Template"}
                          itemId={item.id}
                          itemName={item.attributes.desc}
                        />
                      )}
                    </li>
                  )}
                  {item.attributes.template_styles.data.length > 0 && (
                    <li
                      className="py-2"
                      onClick={() =>
                        setShowSubmenuMore({
                          ...showSubMenuMore,
                          style: !showSubMenuMore.style,
                          purpose: false,
                          color: false,
                        })
                      }
                    >
                      <Button
                        type={"link"}
                        size={"large"}
                        className={`!flex !py-1 !p-0 !justify-between !w-full !items-center !gap-2 !font-normal hover:!no-underline !text-black`}
                      >
                        Berdasarkan Gaya{" "}
                        {showSubMenuMore.color ? (
                          <Icon
                            name={"dash"}
                            className={"h-7 w-7 block md:hidden"}
                          />
                        ) : (
                          <Icon
                            name={"plus"}
                            className={"h-7 w-7 block md:hidden"}
                          />
                        )}
                      </Button>
                      {showSubMenuMore.style && (
                        <SubMenu
                          items={item.attributes.template_styles.data}
                          setShowExplore={setShowExplore}
                          setShowSubMenu={setShowSubMenu}
                          showExplore={showExplore}
                          keys={"template_styles"}
                          types={"Warna Template"}
                          itemId={item.id}
                          itemName={item.attributes.desc}
                        />
                      )}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
      </li>
    </>
  );
};

export default Menu;
