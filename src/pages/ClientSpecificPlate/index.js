import { BackButton } from "../../components/BackButton";
import { PlateDescription } from "../../components/PlateDescription";
import { DefaultClient } from "../DefaultClient";
import { OrderPlateButtons } from "../../components/OrderPlateButtons";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";

export const ClientSpecificPlate = () => {
  const { plate_id } = useParams();

  const [plateData, setPlateData] = useState();
  const [ingredientsId, setIngredientsId] = useState([]);
  const [plateIngredients, setPlateIngredients] = useState([]);

  const [snackbarMessage, setSnackbarMessage] = useState();

  const fetchDataFromPlate = async () => {
    try {
      const response = await fetch(
        "http://localhost:3003/plates/get/" + plate_id
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.status < 400) {
          setPlateData(jsonResponse.message.plate[0]);
          setIngredientsId(jsonResponse.message.ingredients);
        } else {
          setSnackbarMessage(jsonResponse.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const findIngredients = async (id) => {
    try {
      const response = await fetch("http://localhost:3003/ingredients/" + id);

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        setPlateIngredients((prevArray) => [
          ...prevArray,
          jsonResponse.message,
        ]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    ingredientsId.map(async (id) => {
      await findIngredients(id.ingredient_id);
    });
  }, [ingredientsId]);

  useEffect(() => {
    fetchDataFromPlate();
  }, []);

  return (
    <DefaultClient>
      <Link to={"/home"}>
        <BackButton />
      </Link>
      {!snackbarMessage && plateData ? (
        <>
          <PlateDescription
            plateData={plateData}
            plateIngredients={plateIngredients}
          />
          <OrderPlateButtons plateData={plateData}></OrderPlateButtons>
        </>
      ) : (
        <Snackbar
          open={snackbarMessage ? true : false}
          onClose={() => {
            setSnackbarMessage();
            setTimeout(() => {
              window.location.href = "/home";
            }, 3000);
          }}
          autoHideDuration={3000}
          message={snackbarMessage}
        ></Snackbar>
      )}
    </DefaultClient>
  );
};
