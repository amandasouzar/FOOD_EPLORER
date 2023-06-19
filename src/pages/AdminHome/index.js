import { DefaultAdmin } from "../DefaultAdmin";
import { PlatesCarousel } from "../../components/PlatesCarousel";
import styles from "./style.module.css";
import image from "../../assets/Macarons.png";

export const AdminHome = (props) => {
  return (
    <DefaultAdmin>
      <div className={styles.homeTop}>
        <div className={styles.image}>
          <img src={image}></img>
        </div>
        <div className={styles.text}>
          <h1>Sabores inigualáveis</h1>
          <h2>Sinta o cuidado do preparo com ingredientes selecionados.</h2>
        </div>
      </div>
      <PlatesCarousel categories={props.categories} admin={true} />
    </DefaultAdmin>
  );
};
