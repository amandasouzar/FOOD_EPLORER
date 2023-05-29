import { CloseLogo } from "../../assets/CloseLogo";
import styles from "./style.module.css";


export const MenuHeader = () => {

    const handleCloseMenu = () => {
        window.history.go(-1)
    }

  return (
    <div className={styles.menuBox}>
      <button className={styles.button} onClick={handleCloseMenu}>
        <CloseLogo className={styles.closeLogo} />
      </button>
      <h2 className={styles.menuText}>Menu</h2>
    </div>
  );
};
