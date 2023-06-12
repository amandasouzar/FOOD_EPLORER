import { OrderRecordItem } from "../OrderRecordItem";
import styles from "./style.module.css";
import { useReq } from "../../hooks/useReq";
import { useEffect, useState } from "react";

export const OrderRecordList = () => {
  const { getReq } = useReq();
  const [infoList, setInfoList] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      const response = await getReq("http://localhost:3003/orders/history");

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        setInfoList(jsonResponse.message)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div className={styles.orderRecordList}>
      <h1>Pedidos</h1>
      <div className={styles.itens}>
        {infoList ? (
          infoList.length > 0 ? (
            infoList.map((infos) => {

                return <OrderRecordItem
                order={infos.orderData}
                plates={infos.platesFromOrder}
                key={infos.orderData.id}
                ></OrderRecordItem>
            })
          ) : (
            <p>Não há pedidos cadastrados</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
