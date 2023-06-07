import styles from "./style.module.css";
import { SearchLogo } from "../../assets/SearchLogo";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Snackbar } from "@mui/material";
import { useReq } from "../../hooks/useReq";

export const MenuList = (props) => {
  const inputSearch = useRef(null);

  const {getReq} = useReq()

  const [returnedPlate, setReturnedPlate] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  const handleSearch = async () => {
    setReturnedPlate()

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
          setSnackbarMessage(jsonResponse.message);

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
              setSnackbarMessage(jsonResponse.message);
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.menuList}>
      <label className={styles.searchField}>
        <button type="button" onClick={handleSearch}>
          <SearchLogo className={styles.searchLogo}></SearchLogo>
        </button>
        <input
          className={styles.inputField}
          type="text"
          ref={inputSearch}
          placeholder="Busque por pratos ou ingredientes"
        ></input>
      </label>
      {returnedPlate && (
        <div className={styles.plateAcessBox}>
          {returnedPlate.map((plate) => (
            <div className={styles.plateAcess}>
              <Link to={props.isAdmin ? `/admin/${plate.id}` : `/client/${plate.id}`}>
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
        message={snackbarMessage}
      ></Snackbar>
    </div>
  );
};
