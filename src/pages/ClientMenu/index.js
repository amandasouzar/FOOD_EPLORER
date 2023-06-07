import { MenuList } from "../../components/MenuList";
import { DefaultClient } from "../DefaultClient";

export const ClientMenu = () => {
  return (
    <DefaultClient isMenu={true}>
      <MenuList
        isAdmin={false}
        items={[
          { title: "Histórico de pedidos", link: "/history" },
          { title: "Meus favoritos", link: "/favorites" },
          { title: "Sair", link: "/" },
        ]}
      />
    </DefaultClient>
  );
};
