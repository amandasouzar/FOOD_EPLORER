import styles from "./style.module.css";
import { PlateBox } from "../PlateBox/index.js";
import { useEffect, useState } from "react";
import { useReq } from "../../hooks/useReq";

export const PlatesCarousel = (props) => {
  const { getReq, postReq } = useReq();

  const [platesOfCategory, setPlatesOfCategory] = useState([]);

  const fetchPlatesFromCategory = async (category) => {
    try {
      const response = await getReq(
        "http://localhost:3003/plates/category/" + category.id
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        setPlatesOfCategory((prevArray) =>
          prevArray.concat({
            name: category.name,
            plates: jsonResponse.message,
          })
        );
        if (jsonResponse.status < 400) {
          jsonResponse.message.map((plateInfo) =>
            connectFavorites(plateInfo.id)
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectFavorites = async (plate_id) => {
    try {
      const response = await postReq(
        "http://localhost:3003/favorites/connect/" + plate_id
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.categories && props.categories[0].id) {
      props.categories.map(async (category) => {
        await fetchPlatesFromCategory(category);
      });
    }
  }, [props.categories]);

  if (platesOfCategory.length === 0 && !props.categories) {
    return <p>loading</p>;
  } else {
    console.log(platesOfCategory)
    return (
      <>
        {platesOfCategory.length > 0 ?
          <div className={styles.platesList}>
            {platesOfCategory.map((category) => {
              return (
                <>
                  {category.plates[0].name && (
                    <div className={styles.carrouselWithTitle}>
                      <h1>{category.name}</h1>
                      <div className={styles.plateCarousel}>
                        {category.plates[0].name &&
                          category.plates.map((plate) => {
                            return (
                              <PlateBox
                                admin={props.admin}
                                plate={plate}
                              ></PlateBox>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        : <h1 className={styles.errorMessage} onClick={() => {if (props.admin) {window.location.href='/admin/create'}}}>{props.admin ? "Crie aqui um prato!" : 'Não há pratos'}</h1>}
      </>
    );
  }
};
