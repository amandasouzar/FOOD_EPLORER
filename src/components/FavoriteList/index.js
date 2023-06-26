import styles from "./style.module.css";
import { FavoriteItem } from "../FavoriteItem";
import { useEffect, useState } from "react";
import { useReq } from "../../hooks/useReq";

export const Favoritelist = () => {
  const { getReq, putReq } = useReq();
  const [favoritesPlates, setFavoritesPlates] = useState();
  const [noFavorites, setNoFavorites] = useState()

  const fetchFavorites = async () => {
    try {
      const response = await getReq("/favorites/getAll");

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.status < 400) {
          setFavoritesPlates(jsonResponse.message);
        } else {
            setNoFavorites('Não há pratos favoritados!')
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFavorite = async (plateId) => {
    try {
      const response = await putReq(
        "/favorites/update/" + plateId
      );

      if (!response.ok) {
        console.log(response);
      } else {
        setFavoritesPlates((prevArray) =>
          prevArray.filter((plate) => plate.plate_id !== plateId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className={styles.favoriteList}>
      <h1>Meus favoritos</h1>
      {favoritesPlates || noFavorites ? (
        <div className={styles.favoriteItens}>
          {noFavorites ? (
            <p>Não há pratos favoritados!</p>
          ) : (
            favoritesPlates.map((plate) => (
              <FavoriteItem
                handleDeleteFavorite={handleDeleteFavorite}
                key={plate.id}
                plate={plate}
              ></FavoriteItem>
            ))
          )}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};
