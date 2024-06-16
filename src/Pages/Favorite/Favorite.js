import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import ErrorHandler from "../../Components/ErrorHandler/ErrorHandler";
import Footer from "../../Components/Footer/Footer";
import Label from "../../Components/Label/Label";
import Layout from "../../Components/Layout/Layout";
import Navbar from "../../Components/Navbar/Navbar";
import { useFavorites } from "../../Context/FavoritesProvider";
import { getErrorMessage } from "../../Utils/errorUtils";

const Favorite = () => {
  const [favorite, setFavorite] = useState([]);
  const [loadingFavirite, setLoadingFavorite] = useState(false);
  const [error, setError] = useState(null);
  const { favorites } = useFavorites();

  console.log(favorites);

  const handleTemplate = useCallback(async () => {
    setLoadingFavorite(true);
    setError(null);
    try {
      favorites.length > 0 &&
        (await axios
          .get(
            `${process.env.REACT_APP_API_URL}/api/templates/?${favorites
              .map((el, index) => `filters[id][$in][${index}]=${el}&`)
              .join("")}populate=*`
          )
          .then((val) => {
            setFavorite(val.data.data);
          }));
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoadingFavorite(false);
    }
  }, [favorites]);

  useEffect(() => {
    handleTemplate();
  }, [handleTemplate]);

  return (
    <div className="bg-slate-50">
      <Navbar />
      <Layout className={"mb-6"}>
        <Label type={"section-title"}>Template Favoritmu</Label>
        {error !== null ? (
          <ErrorHandler error={error} onRetry={handleTemplate} /> //error handle
        ) : (
          <>
            {loadingFavirite ? (
              <p>Loading...</p>
            ) : (
              <>
                {favorites.length > 0 ? (
                  <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-4">
                    {favorite?.map((val, index) => (
                      <Card
                        key={index}
                        id={val.id}
                        category={
                          val.attributes.template_category.data.attributes.desc
                        }
                        images={val.attributes.template_image.data}
                        title={val.attributes.template_name}
                        description={val.attributes.template_description}
                      />
                    ))}
                  </div>
                ) : (
                  <Label type={"section-desc"}>
                    Belum ada template favorit
                  </Label>
                )}
              </>
            )}
          </>
        )}
      </Layout>
      <Footer />
    </div>
  );
};

export default Favorite;
