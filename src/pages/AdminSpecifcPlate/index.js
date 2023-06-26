import { BackButton } from "../../components/BackButton";
import { PlateDescription } from "../../components/PlateDescription";
import { EditButton } from "../../components/EditButton";
import { DefaultAdmin } from "../DefaultAdmin";
import { Link } from "react-router-dom";
import { useReq } from "../../hooks/useReq";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const AdminSpecificPlate = () => {
  const { plate_id } = useParams();

  const [plateData, setPlateData] = useState();
  const [ingredientsId, setIngredientsId] = useState([]);
  const [plateIngredients, setPlateIngredients] = useState([]);

  const [snackbarMessage, setSnackbarMessage] = useState();

  const { getReq } = useReq();

  const fetchDataFromPlate = async () => {
    try {
      const response = await getReq(
        "/plates/get/" + plate_id
      );

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.status < 400) {
          setPlateData(jsonResponse.message.plate[0]);
          setIngredientsId(jsonResponse.message.ingredients);
        } else {
          setSnackbarMessage({
            message: jsonResponse.message,
            severity: "error",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const findIngredients = async (id) => {
    try {
      const response = await getReq("/ingredients/" + id);

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
    <div>
      <DefaultAdmin>
        <Link to={"/admin/home"}>
          <BackButton />
        </Link>
        {!snackbarMessage && plateData ? (
          <>
            <PlateDescription
              plateData={plateData}
              plateIngredients={plateIngredients}
            />
            <Link to={`/admin/update/${plate_id}`}>
              <EditButton />
            </Link>
          </>
        ) : (
          <Snackbar
            open={snackbarMessage ? true : false}
            onClose={() => {
              setSnackbarMessage();
              setTimeout(() => {
                window.location.href = "/admin/home";
              }, 3000);
            }}
            autoHideDuration={3000}
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
          >
            <Alert severity={snackbarMessage && snackbarMessage.severity}>
              {snackbarMessage && snackbarMessage.message}
            </Alert>
          </Snackbar>
        )}
      </DefaultAdmin>
    </div>
  );
};
