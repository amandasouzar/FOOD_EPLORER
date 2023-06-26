import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { OutLogo } from "../../assets/OutLogo";
import { useEffect, useState } from "react";
import { useReq } from "../../hooks/useReq";
import { useAuth } from "../../hooks/useAuth";
import {
  Snackbar,
  Dialog,
  DialogTitle,
  Alert,
  Autocomplete,
  TextField,
  Stack,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const WebMenu = (props) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { logout } = useAuth();

  const { getReq } = useReq();

  const [returnedPlate, setReturnedPlate] = useState();
  const [returnedPlates, setReturnedPlates] = useState();
  const [options, setOptions] = useState();
  const [returnedIngredients, setReturnedIngredients] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  const handleLogout = () => {
    logout();

    window.location.href = "/";
  };

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

  const handleOpenDialog = () => {
    if (returnedPlate && returnedPlate.length > 0) {
      return true;
    } else {
      return false;
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

  if (options) {
    return (
      <div className={styles.div}>
        <ThemeProvider theme={darkTheme}>
          <Stack className={styles.searchField} spacing={2}>
            <Autocomplete
              sx={{ width: "100%" }}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event.target.value);
                  
                }
              }}
              clearOnBlur
              id="combo-box-demo"
              options={options.map((option) => option.name)}
              groupBy={(option) => {
                const isPlate = returnedPlates.filter(
                  (plate) => plate.name === option
                );
                const isIngredient = returnedIngredients.filter(
                  (plate) => plate.name === option
                );

                if (isPlate.length > 0) {
                  return "Pratos";
                }
                if (isIngredient.length > 0) {
                  return "Ingredientes";
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
        </ThemeProvider>
        {props.otherLinks &&
          props.otherLinks.map((link) => {
            return (
              <Link to={link.href}>
                <p className={styles.linkText}>{link.text}</p>
              </Link>
            );
          })}
        <Link to={props.link}>
          <button className={styles.redButton}>{props.buttonText}</button>
        </Link>
        <button className={styles.noButton} onClick={handleLogout}>
          <OutLogo className={styles.outLogo} />
        </button>
        <Snackbar
          open={snackbarMessage}
          onClose={() => {
            setSnackbarMessage();
          }}
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <Alert severity={snackbarMessage && snackbarMessage.severity}>
            {snackbarMessage && snackbarMessage.message}
          </Alert>
        </Snackbar>
        <ThemeProvider theme={darkTheme}>
          <Dialog
            open={handleOpenDialog()}
            onClose={() => {
              setReturnedPlate();
            }}
            sx={{
              ".MuiPaper-root": {
                paddingTop: 2,
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              },
            }}
          >
            <DialogTitle>Pratos</DialogTitle>
            {returnedPlate && returnedPlate.length !== 0 && (
              <div className={styles.plateAcessBox}>
                {returnedPlate.map((plate) => (
                  <div className={styles.plateAcess}>
                    <Link
                      to={
                        props.isAdmin
                          ? `/admin/${plate.id}`
                          : `/client/${plate.id}`
                      }
                    >
                      <img
                        className={styles.plateImg}
                        src={"http://localhost:3003/images/" + plate.image}
                      ></img>
                      <h2>{plate.name}</h2>
                    </Link>
                    <h3>{plate.description}</h3>
                  </div>
                ))}
              </div>
            )}
          </Dialog>
        </ThemeProvider>
      </div>
    );
  }
};
