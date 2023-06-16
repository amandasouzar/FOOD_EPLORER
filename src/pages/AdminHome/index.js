import { DefaultAdmin } from "../DefaultAdmin";
import { PlatesCarousel } from "../../components/PlatesCarousel";
import { HomeRectangle } from "../../assets/HomeRectangle";

export const AdminHome = (props) => {
  return (
    <DefaultAdmin>
      <div>
        <HomeRectangle></HomeRectangle>
      </div>
      <PlatesCarousel categories={props.categories} admin={true} />
    </DefaultAdmin>
  );
};
