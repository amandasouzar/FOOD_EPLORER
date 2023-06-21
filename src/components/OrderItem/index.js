import styles from "./style.module.css";
import { useOrder } from "../../hooks/useOrder";

export const OrderItem = (props) => {

  const {setQuantity} = useOrder()

    const handleDeleteItem = () => {
        setQuantity(prevValue => prevValue - props.item.quantity)
        props.handleDeleteItem(props.item.id)
    }
    
  return (
    <div className={styles.orderItemBox}>
      <img className={styles.plateImg} src={'http://localhost:3003/images/' + props.item.img} onClick={() => {window.location.href=`/client/${props.item.id}`}}></img>
      <div className={styles.infoBox}>
        <div className={styles.topLine}>
          <h2>x{props.item.quantity}</h2>
          <h2>{props.item.name}</h2>
          <p>R${props.item.price}</p>
        </div>
        <button onClick={handleDeleteItem}>Excluir</button>
      </div>
    </div>
  );
};
