import { DefaultClient } from "../DefaultClient";
import { Favoritelist } from "../../components/FavoriteList";
import { BackButton } from "../../components/BackButton";
import { Link } from "react-router-dom";


export const Favorites = () => {
  return (
    <DefaultClient>
      <Link to="/home">
        <BackButton />
      </Link>
      <Favoritelist />
    </DefaultClient>
  );
};
