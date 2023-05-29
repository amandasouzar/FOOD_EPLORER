import styles from "../AdminHeader/style.module.css";
import { MenuIcon } from "../../assets/MenuIcon";
import { LogoHexagon } from "../../assets/LogoHexagon";
import { Link } from "react-router-dom";

export const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <Link to='/admin/menu'>
        <MenuIcon className={styles.MenuIcon} />
      </Link>
      <div className={styles.div}>
        <LogoHexagon />
        <h2 className={styles.title}>food explorer</h2>
        <p className={styles.subtitle}>admin</p>
      </div>
    </header>
  );
};
