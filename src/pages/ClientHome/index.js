import { DefaultClient } from "../DefaultClient";
import { PlatesCarousel } from "../../components/PlatesCarousel";
import { HomeRectangle } from "../../assets/HomeRectangle";

import styles from "./style.module.css";

export const ClientHome = (props) => {
  return (
    <DefaultClient>
      <div className={styles.homeTop}>
        <h1>Sabores inigualáveis</h1>
        <h2>Sinta o cuidado do preparo com ingredientes selecionados.</h2>
      </div>
      <PlatesCarousel categories={props.categories} admin={false} />
    </DefaultClient>
  );
};
