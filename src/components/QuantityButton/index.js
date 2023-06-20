import styles from "./style.module.css";
import { AddIcon } from "../../assets/AddIcon";
import { RemoveIcon } from "../../assets/RemoveIcon";
import { useEffect, useState } from "react";

export const QuantityButton = (props) => {
  const [value, setValue] = useState(1);

  const handleRemove = () => {
    if (value > 0) {
      setValue((prevNumber) => prevNumber - 1);
    }
  };

  const handleAdd = () => {
    setValue((prevNumber) => prevNumber + 1);
  };

  useEffect(() => {
    props.handleValue(value)
  }, [value])

  return (
    <div className={styles.quantityButton}>
      <button onClick={handleRemove} className={styles.img}>
        <RemoveIcon />
      </button>
      <h2>{value}</h2>
      <button onClick={handleAdd} className={styles.img}>
        <AddIcon />
      </button>
    </div>
  );
};
