import styles from "./style.module.css";
import { useReq } from "../../hooks/useReq";
import { useEffect, useState } from "react";

export const OrderRecordItem = (props) => {
  const { getReq } = useReq();
  const [plateData, setPlateData] = useState([]);

  const fetchPlateData = async (plate_id) => {
    try {
      const response = await getReq(
        "http://localhost:3003/plates/get/" + plate_id
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        const specificPlateData = props.plates.filter(plate => plate.plate_id === plate_id)
        setPlateData((prevArray) =>
          prevArray.concat({name: jsonResponse.message.plate[0].name , quantity: specificPlateData[0].quantity})
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

  if (!plateData || !props.order) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.orderRecordItem}>
      <div className={styles.topLine}>
        <p>{props.order.id}</p>
        <p>{props.order.status && "FINALIZADO"}</p>
        <p>{props.order.created_at}</p>
      </div>
      <div className={styles.platesList}>
        <ul>
          {plateData.map(plate => <li>
            <p>X {plate.quantity}</p>
            <p>{plate.name}</p>
          </li>)}
        </ul>
      </div>
    </div>
  );
};
