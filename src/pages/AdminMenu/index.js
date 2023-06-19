import { MenuList } from "../../components/MenuList";
import { DefaultAdmin } from "../DefaultAdmin";
import { useAuth } from "../../hooks/useAuth";

export const AdminMenu = () => {
  const {logout} = useAuth()

  return (
    <DefaultAdmin isMenu={true}>
      <MenuList isAdmin={true} items={[{title: 'Novo prato', link: '/admin/create'}, {title: 'Sair', link: '/', onClick: logout}]} />
    </DefaultAdmin>
  );
};
