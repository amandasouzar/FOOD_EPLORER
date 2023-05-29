import { MenuList } from "../../components/MenuList";
import { DefaultAdmin } from "../DefaultAdmin";

export const AdminMenu = () => {
  return (
    <DefaultAdmin isMenu={true}>
      <MenuList items={[{title: 'Novo prato', link: '/admin/create'}, {title: 'Sair', link: '/'}]} />
    </DefaultAdmin>
  );
};
