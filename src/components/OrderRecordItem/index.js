import styles from "./style.module.css";
import { useReq } from "../../hooks/useReq";
import { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import ptBr from "dayjs/locale/pt-br";

export const OrderRecordItem = (props) => {
  const { getReq } = useReq();
  const [plateData, setPlateData] = useState([]);
  const [date, setDate] = useState()

  dayjs.extend(relativeTime);
  dayjs.extend(utc);

  useEffect(() => {
    if (props.order) {
      let date = dayjs.utc(props.order.created_at);
      date = date.locale(ptBr).fromNow();
      setDate(date)
    }
  }, [props.order]);

  const fetchPlateData = async (plate_id) => {
    try {
      const response = await getReq(
        "http://localhost:3003/plates/get/" + plate_id
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        const specificPlateData = props.plates.filter(
          (plate) => plate.plate_id === plate_id
        );
        setPlateData((prevArray) =>
          prevArray.concat({
            name: jsonResponse.message.plate[0].name,
            quantity: specificPlateData[0].quantity,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.plates) {
      props.plates.map((plate) => fetchPlateData(plate.plate_id));
    }
  }, []);

  if (!plateData || !props.order || !date) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.orderRecordItem}>
      <div className={styles.topLine}>
        <p>{props.order.id}</p>
        <p>{props.order.status && "FINALIZADO"}</p>
        <p>{date.toUpperCase()}</p>
      </div>
      <div className={styles.platesList}>
        <ul>
          <p>ITENS:</p>
          {plateData.map((plate) => (
            <li>
              <p>X{plate.quantity}</p>
              <p>{plate.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>TOTAL: R${props.order.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};
