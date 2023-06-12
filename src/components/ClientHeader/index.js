import styles from "../ClientHeader/style.module.css";
import { MenuIcon } from "../../assets/MenuIcon";
import { LogoHexagon } from "../../assets/LogoHexagon";
import { CartLogo } from "../../assets/CartLogo";
import { Link } from "react-router-dom";
import { useReq } from "../../hooks/useReq";
import { useEffect, useState } from "react";

export const ClientHeader = (props) => {
  const { getReq } = useReq();
  const [quantity, setQuantity] = useState(0);

  const fetchQuantity = async () => {
    try {
      const response = await getReq(
        "http://localhost:3003/orders/clientOrders"
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.message.platesFromOrder.length > 0) {
            for (const plate of jsonResponse.message.platesFromOrder) {
              setQuantity((quantity) => quantity + plate.quantity)
            }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuantity();
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/client/menu">
        <MenuIcon className={styles.MenuIcon} />
      </Link>
      <div className={styles.titleDiv}>
        <LogoHexagon />
        <h2 className={styles.title}>food explorer</h2>
      </div>
      <Link to="/order">
        <div className={styles.cartDiv}>
          <CartLogo className={styles.CartIcon} />
          <p>{quantity}</p>
        </div>
      </Link>
    </header>
  );
};
