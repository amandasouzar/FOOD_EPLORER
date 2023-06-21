import styles from "../AdminHeader/style.module.css";
import { MenuIcon } from "../../assets/MenuIcon";
import { LogoHexagon } from "../../assets/LogoHexagon";
import { Link } from "react-router-dom";
import { WebMenu } from "../WebMenu";

export const AdminHeader = () => {
  return (
    <>
      <header className={styles.mobileHeader}>
        <Link to="/admin/menu">
          <MenuIcon className={styles.MenuIcon} />
        </Link>
        <div className={styles.div} onClick={() => {window.location.href='/admin/home'}}>
          <LogoHexagon />
          <h2 className={styles.title}>food explorer</h2>
          <p className={styles.subtitle}>admin</p>
        </div>
      </header>
      <header className={styles.webHeader}>
        <div
          className={styles.div}
          onClick={() => {
            window.location.href = "/admin/home";
          }}
        >
          <LogoHexagon />
          <h2 className={styles.title}>food explorer</h2>
          <p className={styles.subtitle}>admin</p>
        </div>
        <WebMenu
          className={styles.menuDiv}
          buttonText={"Novo prato"}
          link={"/admin/create"}
          isAdmin={true}
        />
      </header>
    </>
  );
};
