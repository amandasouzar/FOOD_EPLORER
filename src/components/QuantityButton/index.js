import styles from "./style.module.css";
import { AddIcon } from "../../assets/AddIcon";
import { RemoveIcon } from "../../assets/RemoveIcon";
import { useEffect, useState } from "react";

export const QuantityButton = (props) => {
  const [quantity, setQuantity] = useState(1);

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity((prevNumber) => prevNumber - 1);
    }
  };

  const handleAdd = () => {
    setQuantity((prevNumber) => prevNumber + 1);
  };

  useEffect(() => {
    props.handleQuantity(quantity)
  }, [quantity])

  return (
    <div className={styles.quantityButton}>
      <button onClick={handleRemove} className={styles.img}>
        <RemoveIcon />
      </button>
      <h2>{quantity}</h2>
      <button onClick={handleAdd} className={styles.img}>
        <AddIcon />
      </button>
    </div>
  );
};
