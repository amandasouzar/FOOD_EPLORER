import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const InitialButtons = (props) => {
  const [snackbarMessage, setSnackbarMessage] = useState();
  const {login} = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(process.env)
      if (props.SignUp) {
        const response = await fetch(process.env.REACT_APP_BASE_URL + "/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: props.inputs.name,
            password: props.inputs.pass,
            email: props.inputs.email,
            isAdmin: false,
          }),
        });

        if (!response.ok) {
          console.log(response);
        } else {
          const jsonResponse = await response.json();

          if (jsonResponse.status < 400) {
            setSnackbarMessage({message: jsonResponse.message, severity: 'success'});
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          } else {
            setSnackbarMessage({message: jsonResponse.message, severity: 'error'});
          }
        }
      } else {
        const response = await fetch(process.env.REACT_APP_BASE_URL + "/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: props.inputs.pass,
            email: props.inputs.email,
          }),
        });

        if (!response.ok) {
          console.log(response);
        } else {
          const jsonResponse = await response.json();

          if (jsonResponse.token) {
            setSnackbarMessage({message: 'Login autorizado!', severity: 'success'});
            login(jsonResponse.token)
            setTimeout(() => {
              if (jsonResponse.isAdmin) {
                window.location.href = "/admin/home";
              } else {
                window.location.href = "/home";
              }
            }, 3000);
          } else {
            setSnackbarMessage({message: jsonResponse.message, severity: 'error'});
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.buttonsDiv}>
      <button
        className={styles.redButton}
        onClick={handleSubmit}
        disabled={!props.formWasTouched}
      >
        {props.SignUp ? "Criar conta" : "Entrar"}
      </button>
      <Link className={styles.linkDiv} to={props.path}>
        <button className={styles.clearButton}>
          {props.SignUp ? "Já tenho uma conta" : "Criar uma conta"}
        </button>
      </Link>
      <Snackbar
        open={snackbarMessage ? true : false}
        onClose={() => {
          setSnackbarMessage();
        }}
        autoHideDuration={3000}
        anchorOrigin={{vertical: 'top', horizontal: "left"}}
      >
        <Alert severity={snackbarMessage && snackbarMessage.severity}>
          {snackbarMessage && snackbarMessage.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
