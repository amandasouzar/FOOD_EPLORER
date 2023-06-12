import { Link } from "react-router-dom";
import { DefaultClient } from "../DefaultClient";
import styles from "./style.module.css";

export const NotFoundPage = (props) => {
  return (
    <DefaultClient>
      <div className={styles.div}>
        <h1 className={styles.text}>Página não encontrada...</h1>
        <Link to={props.isAdmin ? "/admin/home" : "/home"}>
          <button className={styles.button}>Retornar para a home</button>
        </Link>
      </div>
    </DefaultClient>
  );
};
