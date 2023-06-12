import styles from "./style.module.css";

export const OrderItem = (props) => {

    const handleDeleteItem = () => {
        props.handleDeleteItem(props.item.id)
    }

  return (
    <div className={styles.orderItemBox}>
      <img src="#"></img>
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
