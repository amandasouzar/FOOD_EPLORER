import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useReq } from "../../hooks/useReq";
import {
  Autocomplete,
  TextField,
  Stack,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const MenuList = (props) => {

  const { getReq } = useReq();

  const [returnedPlate, setReturnedPlate] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [returnedPlates, setReturnedPlates] = useState();
  const [options, setOptions] = useState();
  const [returnedIngredients, setReturnedIngredients] = useState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const getAllPlates = async () => {
    try {
      const response = await getReq("http://localhost:3003/plates/getAll");

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        setReturnedPlates(jsonResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllIngredients = async () => {
    try {
      const response = await getReq("http://localhost:3003/ingredients/getAll");

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        setReturnedIngredients(jsonResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (value) => {
    setReturnedPlate();
    try {
      const responseForName = await getReq(
        `http://localhost:3003/plates/filter?plate_name=${value}`
      );

      if (!responseForName.ok) {
        console.log(responseForName);
      } else {
        const jsonResponse = await responseForName.json();

        if (jsonResponse.status < 400) {
          setReturnedPlate(jsonResponse.message);
        } else {
          setSnackbarMessage({
            message: jsonResponse.message,
            severity: "warning",
          });

          const responseForIngredient = await getReq(
            `http://localhost:3003/plates/filter?ingredient_name=${value}`
          );
          if (!responseForIngredient.ok) {
            console.log(responseForIngredient);
          } else {
            const jsonResponse = await responseForIngredient.json();

            if (jsonResponse.status < 400) {
              setReturnedPlate(jsonResponse.message);
            } else {
              setSnackbarMessage({
                message: jsonResponse.message,
                severity: "warning",
              });
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPlates();
    getAllIngredients();
  }, []);

  useEffect(() => {
    if (returnedPlates && returnedIngredients) {
      setOptions([...returnedPlates, ...returnedIngredients]);
    }
  }, [returnedIngredients, returnedPlates]);
  
  return (
    <div className={styles.menuList}>
       {options && <ThemeProvider theme={darkTheme}>
          <Stack className={styles.searchField} spacing={2}>
            <Autocomplete
              sx={{ width: "100%" }}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event.target.value);
                }
              }}
              id="combo-box-demo"
              options={
                options
                  ? options.filter(option => option.name !== undefined)?.map((option) => {
                    if (option.name) {
                        return option.name;
                      } 
                    })
                  : "Não há opções cadastradas"
              }
              groupBy={(option) => {
                if (!option) {
                  return "Nenhum resultado encontrado";
                } else {
                  if (typeof returnedPlates !== "string") {
                    const isPlate = returnedPlates?.filter(
                      (plate) => plate.name === option
                    );

                    if (isPlate.length > 0) {
                      return "Pratos";
                    }
                  }

                  if (typeof returnedIngredients !== "string") {
                    const isIngredient = returnedIngredients?.filter(
                      (plate) => plate.name === option
                    );

                    if (isIngredient.length > 0) {
                      return "Ingredientes";
                    }
                  }
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Busque por pratos ou ingredientes"
                />
              )}
            />
          </Stack>
        </ThemeProvider>}
      {returnedPlate && (
        <div className={styles.plateAcessBox}>
          {returnedPlate.map((plate) => (
            <div className={styles.plateAcess}>
              <Link
                to={
                  props.isAdmin ? `/admin/${plate.id}` : `/client/${plate.id}`
                }
              >
                <img
                  className={styles.plateImg}
                  src={"http://localhost:3003/images/" + plate.image}
                  alt="Imagem do prato"
                ></img>
                <h2>{plate.name}</h2>
              </Link>
              <h3>{plate.description}</h3>
            </div>
          ))}
        </div>
      )}
      <div className={styles.optionsField}>
        {props.items.map((item) => {
          return (
            <Link to={item.link}>
              <h2 onClick={item.onClick}>{item.title}</h2>
            </Link>
          );
        })}
      </div>
      <Snackbar
        open={snackbarMessage ? true : false}
        onClose={() => {
          setSnackbarMessage();
        }}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert severity={snackbarMessage && snackbarMessage.severity}>
          {snackbarMessage && snackbarMessage.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
