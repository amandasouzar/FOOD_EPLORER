import styles from "./style.module.css";
import { SearchLogo } from "../../assets/SearchLogo";
import { Link } from "react-router-dom";
import { OutLogo } from "../../assets/OutLogo";
import { useRef, useState } from "react";
import { useReq } from "../../hooks/useReq";
import { useAuth } from "../../hooks/useAuth";
import { Snackbar, Dialog, DialogTitle, Alert } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const WebMenu = (props) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { logout } = useAuth();

  let inputSearch = useRef(null);

  const { getReq } = useReq();

  const [returnedPlate, setReturnedPlate] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  const handleLogout = () => {
    logout();

    window.location.href = "/";
  };

  const handleOpenDialog = () => {
    if (returnedPlate && returnedPlate.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSearch = async (event) => {
    setReturnedPlate();
    event.preventDefault()

    try {
      const responseForName = await getReq(
        `http://localhost:3003/plates/filter?plate_name=${inputSearch.current.value}`
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
            `http://localhost:3003/plates/filter?ingredient_name=${inputSearch.current.value}`
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

  return (
    <div className={styles.div}>
      <form className={styles.form} onSubmit={handleSearch}>
        <label className={styles.searchField}>
          <input
            className={styles.inputField}
            type="text"
            ref={inputSearch}
            placeholder="Busque por pratos ou ingredientes"
          ></input>
          <button>
            <SearchLogo className={styles.searchLogo}></SearchLogo>
          </button>
        </label>
      </form>
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
};
