import styles from "./style.module.css";
import { SearchLogo } from "../../assets/SearchLogo";
import { Link } from "react-router-dom";

export const MenuList = (props) => {
  return (
    <div className={styles.menuList}>
      <div className={styles.searchField}>
        <SearchLogo className={styles.searchLogo}></SearchLogo>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Busque por pratos ou ingredientes"
        ></input>
      </div>
      <div className={styles.optionsField}>
        {props.items.map((item) => {
          return <Link to={item.link}>
            <h2>{item.title}</h2>
          </Link>;
        })}
      </div>
    </div>
  );
};
