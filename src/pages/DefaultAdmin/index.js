import { AdminHeader } from "../../components/AdminHeader";
import {MenuHeader} from '../../components/MenuHeader'
import { Footer } from "../../components/Footer";
import styles from "./style.module.css";

export const DefaultAdmin = (props) => {
  return (
    <div className={styles.page_container}>
      {props.isMenu ? <MenuHeader/> : <AdminHeader />}
      <main>{props.children}</main>
      <Footer className={styles.footer} />
    </div>
  );
};
