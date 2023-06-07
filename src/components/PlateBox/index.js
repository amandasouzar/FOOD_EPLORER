import styles from "./style.module.css";
import { EditIcon } from "../../assets/EditIcon.js";
import { FavoriteIcon } from "../../assets/FavoriteIcon";
import { QuantityButton } from "../QuantityButton";
import { useState } from "react";
import { useReq } from "../../hooks/useReq";

export const PlateBox = (props) => {
  const [quantity, setQuantity] = useState();
  const [isFavorite, setIsFavorite] = useState(props.plate.isFavorite);

  const { putReq } = useReq();

  const handleQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const handleEditClick = () => {
    window.location.href = "/admin/update/" + props.plate.id;
  };

  const handleFavoriteClick = async () => {
    try {
      const response = await putReq(
        "http://localhost:3003/plates/update/" + props.plate.id,
        {
          isFavorite: !props.plate.isFavorite,
        }
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.status < 400) {
          setIsFavorite(!props.plate.isFavorite);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenPlate = () => {
    if (props.admin) {
      window.location.href = "/admin/" + props.plate.id;
    } else {
      window.location.href = "/client/" + props.plate.id;
    }
  };

  return (
    <div>
      <div className={props.admin ? styles.plateBoxAdmin : styles.plateBoxUser}>
        <div className={styles.icon}>
          {props.admin ? (
            <button onClick={handleEditClick} className={styles.editButton}>
              <EditIcon className={styles.img} />
            </button>
          ) : (
            <button onClick={handleFavoriteClick} className={styles.editButton}>
              <FavoriteIcon
                className={isFavorite ? styles.filledImg : styles.img}
              />
            </button>
          )}
        </div>
        <div className={styles.plateInfos}>
          <img src={props.plate.img}></img>
          <p onClick={handleOpenPlate}>{props.plate.name}</p>
          <h3>R$ {props.plate.price}</h3>
        </div>
        {!props.admin && (
          <div className={styles.userButtons}>
            <QuantityButton handleQuantity={handleQuantity} />
            <button className={styles.redButton}>Incluir</button>
          </div>
        )}
      </div>
    </div>
  );
};
