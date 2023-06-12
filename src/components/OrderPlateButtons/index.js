import styles from "./style.module.css";
import { QuantityButton } from "../QuantityButton";
import { CartLogo } from "../../assets/CartLogo";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import { useReq } from "../../hooks/useReq";

export const OrderPlateButtons = (props) => {
  const price = props.plateData.price;
  const [quantity, setQuantity] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  const { getReq, putReq, postReq } = useReq();

  const handleQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const handleAddToOrder = async () => {
    const admin_id = props.plateData.admin_id;

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
              plates: [{ plate_id: props.plateData.id, quantity, price }],
            }
          );

          if (!response.ok) {
            console.log(response);
          } else {
            const jsonResponse = await response.json();
            console.log(jsonResponse)
            setSnackbarMessage(jsonResponse.message);
          }
        } else {
          const response = await postReq(
            "http://localhost:3003/orders/create/" + admin_id,
            {
              plates: [{ plate_id: props.plateData.id, quantity, price }],
            }
          );

          if (!response.ok) {
            console.log(response);
          } else {
            const jsonResponse = await response.json();
            setSnackbarMessage(jsonResponse.message);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.buttons}>
      <QuantityButton handleQuantity={handleQuantity} />
      <button onClick={handleAddToOrder} className={styles.orderButton}>
        <CartLogo className={styles.cartImg} />
        <p>pedir - R${price * quantity}</p>
      </button>
      <Snackbar
        open={snackbarMessage ? true : false}
        onClose={() => {
          setSnackbarMessage();
        }}
        autoHideDuration={3000}
        message={snackbarMessage}
      ></Snackbar>
    </div>
  );
};
