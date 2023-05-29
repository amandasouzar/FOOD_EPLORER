import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { PlateForm } from "../../components/PlateForm";
import { DefaultAdmin } from "../DefaultAdmin";
import { Link } from "react-router-dom";

export const UpdatePlate = (props) => {

  const { plate_id } = useParams();

  return (
    <div>
      <DefaultAdmin>
      <Link to={'/admin/home'}>
          <BackButton />
        </Link>
        <PlateForm
          create={false}
          placeholder="Selecione imagem para alterá-la"
          title="Editar prato"
          categories={props.categories}
          ingredients={props.ingredients}
          plate_id={plate_id}
        />
      </DefaultAdmin>
    </div>
  );
};
