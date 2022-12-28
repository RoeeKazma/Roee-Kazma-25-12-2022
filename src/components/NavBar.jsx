import { Link } from "react-router-dom";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../store/slices/darkModeSlice";
import { toggleDegree } from "../store/slices/degreeSlice";

export const NavBar = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkModeSlice.mode);
  const degree = useSelector((state) => state.degreeSlice.mode);

  const themeToggleHandler = () => {
    dispatch(toggleDarkMode());
  };

  const degreeToggleHandler = () => {
    dispatch(toggleDegree());
  };

  return (
    <>
      <nav
        className={`flex justify-between   ${
          theme === "light"
            ? "bg-gradient-to-r from-blue-500 to-blue-400 shadow-2xl"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300 shadow-2xl"
        } p-5`}>
        <div className="flex gap-10">
          <Link
            to={"/"}
            className={`text-md md:text-2xl  ${
              theme === "light" ? "" : " text-gray-100"
            }`}>
            Weather App
          </Link>
          <Link
            to={"/"}
            className={`text-md md:text-2xl md:mt-0 mt-2 ${
              theme === "light" ? "" : " text-gray-100"
            }`}>
            Home
          </Link>
          <Link
            to={"/favorites"}
            className={`text-md md:text-2xl md:mt-0 mt-2 ${
              theme === "light" ? "" : " text-gray-100"
            }`}>
            Favorites
          </Link>
        </div>

        <ul className=" flex items-center gap-4 mr-5 ml-10 mb-2">
          <li className=" cursor-pointer border-solid rounded-md bg-blue-200 p-2">
            {theme === "light" ? (
              <BsSun
                onClick={themeToggleHandler}
                className={`  text-sm md:text-2xl `}
              />
            ) : (
              <BsFillMoonStarsFill
                onClick={themeToggleHandler}
                className="md:text-2xl text-white"
              />
            )}
          </li>
          <li className=" cursor-pointer border-solid rounded-md bg-blue-200 p-1 pl-2">
            {degree === "F" ? (
              <span
                onClick={degreeToggleHandler}
                className={`text-sm md:text-2xl font-bold ${
                  theme === "light" ? "" : " text-white"
                }`}>
                C°
              </span>
            ) : (
              <span
                onClick={degreeToggleHandler}
                className={`text-sm md:text-3xl font-bold ${
                  theme === "light" ? " text-black" : " text-white"
                }`}>
                F°
              </span>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
