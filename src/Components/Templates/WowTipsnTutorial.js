import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../Utils/errorUtils";
import Button from "../Button/Button";
import CardVideo from "../Card/CardVideo";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import Label from "../Label/Label";
import Layout from "../Layout/Layout";

const WowTipsnTutorial = () => {
  const [video, setVideo] = useState([]);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRequestTipsnTricks = async () => {
    setLoadingVideo(true);
    setError(null);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/tutorial-and-tips?sort[0]=count_view:desc&pagination[page]=1&pagination[pageSize]=8&populate=*`
        )
        .then((val) => {
          setVideo(val.data.data);
        });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoadingVideo(false);
    }
  };

  useEffect(() => {
    handleRequestTipsnTricks();
  }, []);

  return (
    <Layout className={"mb-6"}>
      <Label
        type={"section-title"}
        className={"flex items-center justify-center md:justify-start gap-1"}
      >
        Video{" "}
        <span className="font-custom font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          WOW
        </span>{" "}
        hari ini
      </Label>
      {error !== null ? (
        <ErrorHandler error={error} onRetry={handleRequestTipsnTricks} /> //error handle
      ) : (
        <>
          {loadingVideo ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 animate-pulse">
              {Array.from(Array(8), (e, i) => (
                <div
                  key={i}
                  className="w-full h-[400px] rounded-lg bg-slate-200"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              {video?.map((val, index) => (
                <CardVideo
                  key={index}
                  name={val.attributes.video_name}
                  video_id={val.attributes.video_id}
                  images={val.attributes.thumbnail.data.attributes.url}
                  category={
                    val.attributes.tutorial_and_tip_category.data.attributes
                      .desc
                  }
                  id={val.id}
                  count_view={val.attributes.count_view}
                  handleRefreshVideo={handleRequestTipsnTricks}
                />
              ))}
            </div>
          )}
          <div className="flex w-full justify-center mt-6">
            <Button
              type={"outline"}
              size={"medium"}
              onClick={() => navigate("/all-video")}
            >
              Lihat Video Lainnya
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default WowTipsnTutorial;
