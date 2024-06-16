import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Icon from "../../Assets/Icon/Icon";
import Button from "../Button/Button";

const SubMenu = ({
  items,
  setShowExplore,
  setShowSubMenu,
  showExplore,
  types,
  keys,
  itemId,
  itemName,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="md:flex hidden flex-col absolute left-full top-0 w-max shadow-md bg-white rounded-lg ">
        <ul className="divide-y p-2 space-y-1">
          {items.map((subItem, index) => (
            <li
              key={index}
              className="hover:no-underline hover:bg-gray-100 hover:rounded-md hover:w-full"
            >
              <Button
                type={"link"}
                size={"medium"}
                className={`!flex py-1 !items-center !gap-2 !font-normal hover:!no-underline !text-black `}
                onClick={() => {
                  setShowExplore({
                    ...showExplore,
                    template: false,
                  });
                  setShowSubMenu(false);
                  navigate({
                    pathname: "/all-template",
                    search: `?${createSearchParams({
                      filter: JSON.stringify([
                        {
                          type: "Kategori Template",
                          key: "template_category",
                          value: {
                            name: itemName,
                            id: itemId,
                          },
                        },
                        {
                          type: types,
                          key: keys,
                          value: {
                            name: subItem.attributes["name"],
                            id: subItem.id,
                          },
                        },
                      ]),
                    })}`,
                  });
                }}
              >
                {subItem.attributes.color_code !== undefined && (
                  <div
                    className="rounded-full h-4 w-4"
                    style={{
                      backgroundColor: subItem.attributes.color_code,
                    }}
                  ></div>
                )}
                {subItem.attributes.name}
              </Button>
            </li>
          ))}
          <li className="hover:no-underline hover:bg-gray-100 hover:rounded-md hover:w-full">
            <Button
              type={"link"}
              size={"medium"}
              onClick={() => {
                navigate("/all-template");
                setShowExplore({
                  ...showExplore,
                  template: false,
                });
              }}
              className={`!flex py-1 !items-center !gap-2 !font-semibold hover:!no-underline !text-black `}
            >
              Lihat Semua <Icon name={"arrowRight"} className={"h-4 w-4"} />
            </Button>
          </li>
        </ul>
      </div>

      {/* Mobile */}
      <div className="flex flex-col md:hidden">
        <div className="flex gap-2 pl-4">
          <div className="after:block after:bg-gray-400 after:w-[1px] after:h-full"></div>

          <ul className="flex py-4 flex-col justify-center gap-2 w-full">
            {items.map((subItem, index) => (
              <li key={index} className="hover:no-underline">
                <Button
                  type={"link"}
                  size={"large"}
                  className={`!flex !py-2 w-full justify-between !px-0 !pl-4 !items-center !gap-2 !font-normal hover:!no-underline !text-black `}
                  onClick={() => {
                    setShowExplore({
                      ...showExplore,
                      template: false,
                    });
                    setShowSubMenu(false);
                    navigate({
                      pathname: "/all-template",
                      search: `?${createSearchParams({
                        filter: JSON.stringify([
                          {
                            type: "Kategori Template",
                            key: "template_category",
                            value: {
                              name: itemName,
                              id: itemId,
                            },
                          },
                          {
                            type: types,
                            key: keys,
                            value: {
                              name: subItem.attributes["name"],
                              id: subItem.id,
                            },
                          },
                        ]),
                      })}`,
                    });
                  }}
                >
                  <div className="flex gap-2 items-center">
                    {subItem.attributes.color_code !== undefined && (
                      <span
                        className="rounded-full h-4 w-4"
                        style={{
                          backgroundColor: subItem.attributes.color_code,
                        }}
                      ></span>
                    )}
                    {subItem.attributes.name}
                  </div>
                  <Icon name={"chevronRight"} className={"h-5 w-5"} />
                </Button>
              </li>
            ))}
            <li className="hover:no-underline hover:bg-gray-100 hover:rounded-md hover:w-full">
              <Button
                type={"link"}
                size={"large"}
                onClick={() => {
                  navigate("/all-template");
                  setShowExplore({
                    ...showExplore,
                    template: false,
                  });
                }}
                className={`!flex py-1 !items-center !gap-2 !font-semibold hover:!no-underline !text-black `}
              >
                Lihat Semua <Icon name={"arrowRight"} className={"h-4 w-4"} />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubMenu;
