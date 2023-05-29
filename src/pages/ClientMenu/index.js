import { MenuList } from "../../components/MenuList";
import { DefaultClient } from "../DefaultClient";

export const ClientMenu = () => {
  return (
    <DefaultClient isMenu={true}>
      <MenuList items={[{title: 'Sair', link: '/'}]} />
    </DefaultClient>
  );
};
