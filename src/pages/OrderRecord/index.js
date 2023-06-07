import { DefaultClient } from "../DefaultClient";
import { OrderRecordList } from "../../components/OrderRecordList";
import { BackButton } from "../../components/BackButton";
import { Link } from "react-router-dom";

export const OrderRecord = () => {
  return (
    <DefaultClient>
      <Link to="/home">
        <BackButton />
      </Link>
      <OrderRecordList></OrderRecordList>
    </DefaultClient>
  );
};
