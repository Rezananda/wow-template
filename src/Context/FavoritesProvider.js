import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

// Custom hook to access favorites context
export const useFavorites = () => useContext(FavoritesContext);

// Component to provide favorites context
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Function to toggle favorite status
  const toggleFavorite = async (id, count_like) => {
    try {
      setFavoriteLoading(true);
      !isFavorite(id) &&
        (await axios
          .put(`${process.env.REACT_APP_API_URL}/api/templates/${id}`, {
            data: {
              count_like: count_like + 1,
            },
          })
          .then(() => null));
    } catch (error) {
      if (error) {
        console.log(error);
      }
    } finally {
      setFavoriteLoading(false);
    }

    const isCurrentlyFavorite = favorites.includes(id);
    const updatedFavorites = isCurrentlyFavorite
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    // Save to local storage
    localStorage.setItem("template", JSON.stringify(updatedFavorites));
    return !isCurrentlyFavorite; // Return true if card is added, false if removed
  };

  // Function to check if a card is favorited
  const isFavorite = (id) => favorites.includes(id);

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("template");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, favoriteLoading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
