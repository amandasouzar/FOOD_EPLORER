import styles from "../ClientHeader/style.module.css";
import { MenuIcon } from "../../assets/MenuIcon";
import { LogoHexagon } from "../../assets/LogoHexagon";
import { CartLogo } from "../../assets/CartLogo";
import { Link } from "react-router-dom";

export const ClientHeader = () => {
  return (
    <header className={styles.header}>
      <Link to='/client/menu'>
        <MenuIcon className={styles.MenuIcon} />
      </Link>
      <div className={styles.titleDiv}>
        <LogoHexagon />
        <h2 className={styles.title}>food explorer</h2>
      </div>
      <div className={styles.cartDiv}>
        <CartLogo className={styles.CartIcon} />
        <p>1</p>
      </div>
    </header>
  );
};