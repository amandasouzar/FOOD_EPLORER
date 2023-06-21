import styles from "./style.module.css";
import { EditIcon } from "../../assets/EditIcon.js";
import { FavoriteIcon } from "../../assets/FavoriteIcon";
import { QuantityButton } from "../QuantityButton";
import { useEffect, useState } from "react";
import { useReq } from "../../hooks/useReq";
import { Snackbar, Alert } from "@mui/material";
import { useOrder } from "../../hooks/useOrder";

export const PlateBox = (props) => {
  const [value, setValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  const { quantity, setQuantity } = useOrder();

  const { putReq, getReq, postReq } = useReq();

  const fetchIsFavorite = async () => {
    try {
      const response = await getReq(
        "http://localhost:3003/favorites/verify/" + props.plate.id
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.isFavorite) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleValue = (value) => {
    setValue(value);
  };

  const handleEditClick = () => {
    window.location.href = "/admin/update/" + props.plate.id;
  };

  const handleFavoriteClick = async () => {
    try {
      const response = await putReq(
        "http://localhost:3003/favorites/update/" + props.plate.id
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.status < 400) {
          setIsFavorite((prevValue) => !prevValue);
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

  const handleAddToOrder = async () => {
    const admin_id = props.plate.admin_id;

    try {
      const orderExists = await getReq(
        "http://localhost:3003/orders/clientOrders"
      );

      if (!orderExists.ok) {
        console.log(orderExists);
      } else {
        const jsonResponse = await orderExists.json();
        if (jsonResponse.status < 400) {
          const response = await putReq(
            "http://localhost:3003/orders/update/0/" +
              jsonResponse.message.ordersFromClient[0].id,
            {
              plates: [
                {
                  plate_id: props.plate.id,
                  quantity: value,
                  price: props.plate.price * value,
                },
              ],
            }
          );

          if (!response.ok) {
            console.log(response);
          } else {
            setQuantity((prevValue) => prevValue + value);
            const jsonResponse = await response.json();
            setSnackbarMessage({message: jsonResponse.message, severity: 'success'});
          }
        } else {
          const response = await postReq(
            "http://localhost:3003/orders/create/" + admin_id,
            {
              plates: [
                {
                  plate_id: props.plate.id,
                  quantity: value,
                  price: props.plate.price * value,
                },
              ],
            }
          );

          if (!response.ok) {
            console.log(response);
          } else {
            setQuantity((prevValue) => prevValue + value);
            const jsonResponse = await response.json();
            setSnackbarMessage({message: jsonResponse.message, severity: 'success'});
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIsFavorite();
  }, []);

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
          <img src={"http://localhost:3003/images/" + props.plate.image}></img>
          <p onClick={handleOpenPlate}>{props.plate.name}</p>
          <h3>R$ {props.plate.price.toFixed(2)}</h3>
        </div>
        {!props.admin && (
          <div className={styles.userButtons}>
            <QuantityButton handleValue={handleValue} />
            <button onClick={handleAddToOrder} className={styles.redButton}>
              Incluir
            </button>
          </div>
        )}
      </div>
      <Snackbar
        open={snackbarMessage}
        onClose={() => {
          setSnackbarMessage();
        }}
        autoHideDuration={3000}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <Alert severity={snackbarMessage && snackbarMessage.severity}>
          {snackbarMessage && snackbarMessage.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
