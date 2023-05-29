import styles from "./style.module.css";

import imageSrc from "../../../src/assets/Plate.png";

export const PlateDescription = (props) => {

  if (!props.plateData || !props.plateIngredients) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className={styles.plateInfo}>
        <img className={styles.plateImg} src={imageSrc} alt="Teste" />
        <h1 className={styles.plateName}>{props.plateData.name}</h1>
        <h3 className={styles.plateDescription}>
          {props.plateData.description}
        </h3>
        <div className={styles.plateIngredients}>
          {props.plateIngredients.map((item) => (
            <p className={styles.plateIngredient}>{item[0].name}</p>
          ))}
        </div>
      </div>
    );
  }
};
