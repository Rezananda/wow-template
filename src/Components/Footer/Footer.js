import axios from "axios";
import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../Utils/errorUtils";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import Layout from "../Layout/Layout";

const Footer = () => {
  const navigate = useNavigate();
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [sections, setSections] = useState([
    {
      title: "Sitemap",
      items: [
        { label: "Beranda", url: "/" },
        { label: "Template", url: "/all-template" },
        { label: "Tutorial & Tips", url: "/all-video" },
        { label: "Favorit", url: "/favorite" },
      ],
    },
    {
      title: "Kategori",
      items: [],
    },
    {
      title: "Ikuti Kami",
      items: [
        { label: "Instagram", url: "/" },
        { label: "Youtube", url: "/all-template" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Kebijakan Privasi", url: "/privacy-policy" },
        { label: "Syarat dan Ketentuan", url: "/terms-and-conditions" },
      ],
    },
  ]);

  const [error, setError] = useState(null);

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
            const templateCategoryResponse = templateCategory.data.map(
              (el) => ({
                label: el.attributes.desc,
                url: {
                  pathname: "/all-template",
                  search: `?${createSearchParams({
                    filter: JSON.stringify([
                      {
                        type: "Kategori Template",
                        key: "template_category",
                        value: {
                          name: el.attributes.desc,
                          id: el.id,
                        },
                      },
                    ]),
                  })}`,
                },
              })
            );

            const tutorialAndTipsCategoryResponse =
              tutorialAndTipsCategory.data.map((el) => ({
                label: el.attributes.desc,
                url: {
                  pathname: "/all-video",
                  search: `?${createSearchParams({
                    filter: JSON.stringify([
                      {
                        type: "Kategori Tutorial & Tips",
                        key: "tutorial_and_tip_category",
                        value: {
                          name: el.attributes.desc,
                          id: el.id,
                        },
                      },
                    ]),
                  })}`,
                },
              }));

            const combinedCategory = [
              ...templateCategoryResponse,
              ...tutorialAndTipsCategoryResponse,
            ];

            setSections((prevSections) =>
              prevSections.map((section) =>
                section.title === "Kategori"
                  ? { ...section, items: combinedCategory }
                  : section
              )
            );
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
    <div className="w-full bg-slate-900 text-gray-300 py-y px-2">
      <Layout>
        <div className="mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
          {error !== null ? (
            <ErrorHandler error={error} onRetry={handleNavbar} /> //error handle
          ) : (
            <>
              {loadingFilter === true ? (
                <div>Loading...</div>
              ) : (
                <>
                  {sections.map((section, index) => (
                    <div key={index}>
                      <h6 className="font-bold uppercase pt-2">
                        {section.title}
                      </h6>
                      <ul>
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="py-1 text-gray-500 hover:text-white cursor-pointer"
                            onClick={() => navigate(item.url)}
                          >
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="col-span-2 pt-8 md:pt-2">
                    <p className="font-bold uppercase">Tentang Kami</p>
                    <p className="py-4">
                      WOWtemplate adalah plaftom yang menyediakan berbagai
                      template Presentasi, Dokumen dan Excel sesuai dengan
                      kebutuhanmu.
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex w-full text-center text-gray-500">
          <p className="py-4">2024 WOWTemplate, All rights reserved</p>
        </div>
      </Layout>
    </div>
  );
};

export default Footer;
