import { ClientHeader } from "../../components/ClientHeader";
import {MenuHeader} from '../../components/MenuHeader'
import { Footer } from "../../components/Footer";
import styles from './style.module.css'

export const DefaultClient = (props) => {
  return (
    <div className={styles.page_container}>
      {props.isMenu ? <MenuHeader/> : <ClientHeader />}
      <main>{props.children}</main>
      <Footer className={styles.footer} />
    </div>
  );
};