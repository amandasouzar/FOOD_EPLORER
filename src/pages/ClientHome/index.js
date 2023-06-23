import { DefaultClient } from "../DefaultClient";
import { PlatesCarousel } from "../../components/PlatesCarousel";
import image from '../../assets/pngegg 2.png'

import styles from "./style.module.css";

export const ClientHome = (props) => {
  return (
    <DefaultClient>
      <div className={styles.homeTop}>
        <div className={styles.image}>
          <img src={image}></img>
        </div>
        <div className={styles.text}>
          <h1>Sabores inigualáveis</h1>
          <h2>Sinta o cuidado do preparo com ingredientes selecionados.</h2>
        </div>
      </div>
      <PlatesCarousel categories={props.categories} admin={false} />
    </DefaultClient>
  );
};
