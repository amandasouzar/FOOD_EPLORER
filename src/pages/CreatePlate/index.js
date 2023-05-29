import { BackButton } from "../../components/BackButton";
import { PlateForm } from "../../components/PlateForm";
import { DefaultAdmin } from "../DefaultAdmin";

import { Link } from "react-router-dom";

export const CreatePlate = (props) => {

  return (
    <div>
      <DefaultAdmin>
      <Link to={'/admin/home'}>
          <BackButton />
        </Link>
        <PlateForm
          create={true}
          placeholder="Selecione imagem"
          title="Novo prato"
          categories={props.categories}
          ingredients={props.ingredients}
        />
      </DefaultAdmin>
    </div>
  );
};
