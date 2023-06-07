import styles from "./style.module.css";
import { PlateBox } from "../PlateBox/index.js";
import { useEffect, useState } from "react";
import { useReq } from "../../hooks/useReq";

export const PlatesCarousel = (props) => {

  const {getReq} = useReq()

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.categories.length > 0) {
      props.categories.map(async (category) => {
        await fetchPlatesFromCategory(category)
      })
    }
  }, [props.categories]);
  
  if (platesOfCategory.length === 0) {
    return <p>loading</p>;
  } else {
    return (
      <div className={styles.platesList}>
        {platesOfCategory.map((category) => {
          return (
            <div className={styles.carrouselWithTitle}>
              <h1>{category.name}</h1>
              <div className={styles.plateCarousel}>
                {category.plates[0].name ? category.plates.map((plate) => {
                  return (
                    <PlateBox admin={props.admin} plate={plate}></PlateBox>
                  );
                }) : <h3>{category.plates}</h3> } 
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
