import styles from "./style.module.css";

export const EditButton = () => {
  return (
    <div className={styles.editButton}>
      <button className={styles.button}>Editar prato</button>
    </div>
  );
};
