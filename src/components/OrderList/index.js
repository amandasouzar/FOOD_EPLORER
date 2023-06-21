import styles from "./style.module.css";
import { OrderItem } from "../OrderItem";
import { useReq } from "../../hooks/useReq";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const OrderList = () => {
  const { getReq, deleteReq, putReq } = useReq();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [orderId, setOrderId] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  const fetchOrderItems = async () => {
    try {
      const response = await getReq(
        "http://localhost:3003/orders/clientOrders"
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();

        setTotalPrice(jsonResponse.message.ordersFromClient[0].totalPrice);
        setOrderId(jsonResponse.message.ordersFromClient[0].id);

        jsonResponse.message.platesFromOrder.map(async (item) => {
          const response = await getReq(
            "http://localhost:3003/plates/get/" + item.plate_id
          );

          const jsonResponse = await response.json();
          const plateInfo = jsonResponse.message.plate[0];

          setCartItems((prevArray) => [
            ...prevArray,
            {
              name: plateInfo.name,
              img: plateInfo.image,
              quantity: item.quantity,
              price: item.price,
              id: plateInfo.id,
            },
          ]);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await deleteReq(
        "http://localhost:3003/orders/delete/" + orderId + "/" + itemId
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.status < 400) {
          setSnackbarMessage({
            message: jsonResponse.message,
            severity: "success",
          });
          setCartItems((prevArray) =>
            prevArray.filter((item) => item.id !== itemId)
          );
          setTotalPrice(jsonResponse.newPrice);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseOrder = async () => {
    try {
      const response = await putReq(
        "http://localhost:3003/orders/close/" + orderId
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.status < 400) {
          setSnackbarMessage({
            message: jsonResponse.message,
            severity: "success",
          });
          setTimeout(() => {
            window.location.href = "/history";
          }, 3000);
        } else {
          setSnackbarMessage({
            message: jsonResponse.message,
            severity: "error",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  if (!cartItems) {
    return (
      <>
        <div className={styles.orderList}>
          <h1>Meu pedido</h1>
          <div className={styles.orderItens}>
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.orderList}>
        <h1>Meu pedido</h1>
        <div className={styles.orderItens}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <>
                <OrderItem
                  item={item}
                  key={item.id}
                  handleDeleteItem={handleDeleteItem}
                ></OrderItem>
              </>
            ))
          ) : (
            <p>Carrinho vazio!</p>
          )}
        </div>
        {cartItems.length > 0 && (
          <>
            <h2 className={styles.price}>Total: R${totalPrice.toFixed(2)}</h2>
            <button className={styles.redButton} onClick={handleCloseOrder}>
              Avançar
            </button>
          </>
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
    </>
  );
};
