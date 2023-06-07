import { DefaultClient } from "../DefaultClient";
import { OrderList } from "../../components/OrderList";
import { BackButton } from "../../components/BackButton";
import { Link } from "react-router-dom";


export const Order = () => {
  return (
    <DefaultClient>
      <Link to="/home">
        <BackButton />
      </Link>
      <OrderList />
    </DefaultClient>
  );
};
