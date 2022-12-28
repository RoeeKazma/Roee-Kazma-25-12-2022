import React from "react";
import { useSelector } from "react-redux";
import FavoriteLocationDetails from "../components/FavoriteLocationDetails";

const FavoritesPage = () => {
  const { favoriteLocations } = useSelector(
    (state) => state.favoriteLocationsSlice
  );

  const theme = useSelector((state) => state.darkModeSlice.mode);
  return (
    <div
      className=" bg-cover"
      style={{
        backgroundImage:
          theme === "light"
            ? `url("https://wallpaperaccess.com/full/846628.jpg")`
            : `url("https://wallpaperaccess.com/full/203545.jpg")`,
      }}>
      {favoriteLocations.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-5 md:gap-24 pt-10">
          {favoriteLocations?.map((data, id) => {
            return <FavoriteLocationDetails {...data} key={id} />;
          })}
        </div>
      ) : (
        <div className="text-center text-white pt-8 text-xl md:text-3xl font-bold">
          No favorite location selected
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
