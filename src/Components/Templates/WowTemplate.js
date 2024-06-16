import axios from "axios";
import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../Utils/errorUtils";
import Button from "../Button/Button";
import Card from "../Card/Card";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import Label from "../Label/Label";
import Layout from "../Layout/Layout";

const WowTemplate = () => {
  const [templates, setTemplates] = useState([]);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRequestTemplate = async () => {
    setLoadingTemplate(true);
    setError(null);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/templates?sort[0]=count_view:desc&pagination[page]=1&pagination[pageSize]=8&populate=*`
        )
        .then((val) => {
          setTemplates(val.data.data);
        });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoadingTemplate(false);
    }
  };

  useEffect(() => {
    handleRequestTemplate();
  }, []);

  return (
    <Layout className={"mb-6"}>
      <Label type={"section-title"} className={"flex items-center justify-center md:justify-start gap-1"}>
        Template{" "}
        <span className="font-custom font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          WOW
        </span>{" "}
        hari ini
      </Label>
      {error !== null ? (
        <ErrorHandler error={error} onRetry={handleRequestTemplate} /> //error handle
      ) : (
        <>
          {loadingTemplate ? (
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-4 animate-pulse">
              {Array.from(Array(8), (e, i) => (
                <div
                  key={i}
                  className="w-full h-[400px] rounded-lg bg-slate-200"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-4">
              {templates?.map((val, index) => (
                <Card
                  route={`/template?${createSearchParams({
                    filter: JSON.stringify({
                      id: val.id,
                      name: val.attributes.template_name,
                    }),
                  })}`}
                  id={val.id}
                  key={index}
                  category={
                    val.attributes.template_category.data.attributes.desc
                  }
                  images={val.attributes.template_image.data}
                  title={val.attributes.template_name}
                  description={val.attributes.template_description}
                  count_view={val.attributes.count_view}
                  count_like={val.attributes.count_like}
                  template_canva_url={val.attributes.template_canva_url}
                  template_google_url={val.attributes.template_google_url}
                  count_video={val.attributes.tutorial_and_tips.data.length}
                />
              ))}
            </div>
          )}
          <div className="flex w-full justify-center mt-6">
            <Button
              type={"outline"}
              size={"medium"}
              onClick={() => navigate("/all-template")}
            >
              Lihat Template Lainnya
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default WowTemplate;
