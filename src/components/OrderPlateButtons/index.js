import styles from "./style.module.css";
import { QuantityButton } from "../QuantityButton";
import { CartLogo } from "../../assets/CartLogo";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useReq } from "../../hooks/useReq";
import { useOrder } from "../../hooks/useOrder";

export const OrderPlateButtons = (props) => {
  const price = props.plateData.price;
  const [value, setValue] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState();

  const {setQuantity} = useOrder()

  const { getReq, putReq, postReq } = useReq();

  const handleValue = (value) => {
    setValue(value);
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
              plates: [{ plate_id: props.plateData.id, quantity: value, price }],
            }
          );

          if (!response.ok) {
            console.log(response);
          } else {
            setQuantity(prevValue => prevValue + value)
            const jsonResponse = await response.json();
            setSnackbarMessage({message: jsonResponse.message, severity: 'success'});
          }
        } else {
          const response = await postReq(
            "http://localhost:3003/orders/create/" + admin_id,
            {
              plates: [{ plate_id: props.plateData.id, quantity: value, price }],
            }
          );

          if (!response.ok) {
            console.log(response);
          } else {
            setQuantity(prevValue => prevValue + value)
            const jsonResponse = await response.json();
            setSnackbarMessage({message: jsonResponse.message, severity: 'success'});
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.buttons}>
      <QuantityButton handleValue={handleValue} />
      <button onClick={handleAddToOrder} className={styles.orderButton}>
        <CartLogo className={styles.cartImg} />
        <p>pedir - R${(price * value).toFixed(2)}</p>
      </button>
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
