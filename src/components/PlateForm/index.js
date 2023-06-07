import styles from "./style.module.css";
import { DownloadIcon } from "../../assets/DownloadIcon";
import { useState, useEffect, useRef } from "react";
import { useReq } from "../../hooks/useReq";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CreateButton } from "../CreateButton";
import { UpdateButtons } from "../UpdateButtons";

import { Snackbar } from "@mui/material";

const schema = yup.object({
  plateImg: yup.mixed().required("Adicione uma imagem."),
  plateName: yup.string().min(1, "Adicione um nome.").required(),
  category_id: yup
    .number()
    .required("A categoria é obrigatória.")
    .test("default-value", "Selecione uma categoria.", (value) => value !== 0),
  price: yup
    .number()
    .required("Adicione um valor.")
    .typeError("Adicione um número."),
  description: yup
    .string()
    .min(1, "Adicione uma descrição.")
    .required("Adicione uma descrição."),
});

// perguntar sobre o "input" que é um button
// perguntar sobre input file

export const PlateForm = (props) => {
  const [addedItens, setAddedItens] = useState([]);
  const [removedItens, setRemovedItens] = useState([]);

  const [plateData, setPlateData] = useState({});
  const [responseStatus, setResponseStatus] = useState({});

  const [existingCategory, setExistingCategory] = useState({});

  const [openAddCategoryBox, setOpenAddCategoryBox] = useState(false);
  const [openAddIngredientBox, setOpenAddIngredientBox] = useState(false);

  const [snackbarmessage, setSnackbarMessage] = useState();

  const inputCategory = useRef(null);
  const inputIngredient = useRef(null);

  const { getReq, postReq, putReq } = useReq();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      if (props.create) {
        const response = await postReq("http://localhost:3003/plates/create", {
          admin_id: 1,
          name: data.plateName,
          category_id: data.category_id,
          description: data.description,
          price: data.price,
          image: "#",
          ingredientsId: addedItens,
        });

        if (!response.ok) {
          console.log(response);
        } else {
          const jsonResponse = await response.json();

          if (jsonResponse.status < 400) {
            setSnackbarMessage(jsonResponse.message);
            setTimeout(() => {
              window.location.href = "/admin/home";
            }, 3000);
          } else {
            setSnackbarMessage(jsonResponse.message);
          }
        }
      } else {
        try {
          const response = await putReq(
            "http://localhost:3003/plates/update/" + props.plate_id,
            {
              admin_id: 1,
              name: data.plateName,
              category_id: data.category_id,
              description: data.description,
              price: data.price,
              image: "#",
              addedItens: addedItens,
              removedItens: removedItens,
            }
          );

          if (!response.ok) {
            console.log(response);
          } else {
            const jsonResponse = await response.json();
            setSnackbarMessage(jsonResponse.message);
            setTimeout(() => {
              window.location.href = "/admin/home";
            }, 3000);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataFromPlate = async () => {
    try {
      const response = await getReq(
        "http://localhost:3003/plates/get/" + props.plate_id
      );
      if (!response.ok) {
        console.log("Something went wrong");
      } else {
        const jsonResponse = await response.json();
        setPlateData(jsonResponse.message);
        setResponseStatus(jsonResponse.status);

        if (responseStatus >= 400 && !props.create) {
          setSnackbarMessage(jsonResponse.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategory = async (id) => {
    try {
      const response = await getReq("http://localhost:3003/categories/" + id);
      if (!response.ok) {
        console.log("Something went wrong");
      } else {
        const jsonResponse = await response.json();
        setExistingCategory(jsonResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleIngredientAdd = (event) => {
    event.preventDefault();

    const isAdded = addedItens.find((id) => id === +event.target.value);

    if (isAdded === undefined) {
      setAddedItens((prevArray) => [...prevArray, +event.target.value]);
    } else {
      setAddedItens((prevArray) =>
        prevArray.filter((id) => id != +event.target.value)
      );
      setRemovedItens((prevArray) => [...prevArray, +event.target.value]);
    }
  };

  const toggleAddCategoryButton = (event) => {
    setOpenAddCategoryBox((prevValue) => !prevValue);
  };

  const toggleAddIngredientButton = (event) => {
    setOpenAddIngredientBox((prevValue) => !prevValue);
  };

  const handleNewCategory = async () => {
    try {
      const response = await postReq(
        "http://localhost:3003/categories/create",
        {
          name: inputCategory.current.value,
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.status >= 400) {
          setSnackbarMessage(jsonResponse.message);
        } else {
          setSnackbarMessage("Categoria adicionada!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewIngredient = async () => {
    try {
      const response = await postReq(
        "http://localhost:3003/ingredients/create",
        {
          name: inputIngredient.current.value,
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.status >= 400) {
          setSnackbarMessage(jsonResponse.message);
        } else {
          setSnackbarMessage("Ingrediente adicionado!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataFromPlate();
    if (plateData && responseStatus < 400) {
      fetchCategory(plateData.plate[0].category_id);
    }
    if (!props.create && plateData.ingredients) {
      plateData.ingredients.map((element) => {
        return setAddedItens((prevArray) => [
          ...prevArray,
          element.ingredient_id,
        ]);
      });
    }
  }, [responseStatus]);

  if (
    !plateData ||
    props.ingredients[0] === undefined ||
    props.categories[0] === undefined ||
    (existingCategory[0] === undefined && !props.create)
  ) {
    return (
      <>
        <div className={styles.loading}>Loading...</div>;
        <Snackbar
          open={snackbarmessage ? true : false}
          onClose={() => {
            setSnackbarMessage();
          }}
          autoHideDuration={3000}
          message={snackbarmessage}
        ></Snackbar>
      </>
    );
  } else {
    return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <h1>{props.title}</h1>
        <label htmlFor="img" className={styles.label}>
          Imagem do prato
          <div className={styles.downloadImgDiv}>
            <DownloadIcon />
            <p>{props.placeholder}</p>
            <input
              id="img"
              type="file"
              className={styles.inputImg}
              {...register("plateImg")}
            ></input>
          </div>
          <p className={styles.error}>{errors.plateImg?.message}</p>
        </label>
        <label htmlFor="name" className={styles.label}>
          Nome
          <input
            {...register("plateName")}
            type="text"
            placeholder="Ex: Salada Ceaser"
            id="name"
            className={styles.inputName}
            defaultValue={plateData.plate ? plateData.plate[0].name : ""}
          ></input>
          <p className={styles.error}>{errors.plateName?.message}</p>
        </label>
        <label htmlFor="category" className={styles.label}>
          Categoria
          <p onClick={toggleAddCategoryButton} className={styles.add}>
            Adicionar uma nova categoria
          </p>
          {openAddCategoryBox && (
            <label className={styles.addBox} htmlFor="newCategory">
              <input
                ref={inputCategory}
                id="newCategory"
                placeholder="Insira aqui o nome"
              ></input>
              <button type="button" onClick={handleNewCategory}>
                Criar
              </button>
            </label>
          )}
          <select
            id="category"
            className={styles.inputCategory}
            {...register("category_id")}
            defaultValue={props.create ? 0 : existingCategory[0].id}
          >
            <option disabled hidden value={0}>
              Selecione uma categoria
            </option>
            {props.categories.map((category) => {
              return (
                <option id={category.id} key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <p className={styles.error}>{errors.category_id?.message}</p>
        </label>
        <label htmlFor="ingredients" className={styles.label}>
          Ingredientes
          <p onClick={toggleAddIngredientButton} className={styles.add}>
            Adicionar um novo ingrediente
          </p>
          {openAddIngredientBox && (
            <label className={styles.addBox}>
              <input
                ref={inputIngredient}
                placeholder="Insira aqui o nome"
              ></input>
              <button type="button" onClick={handleNewIngredient}>
                Criar
              </button>
            </label>
          )}
          <div className={styles.ingredientsDiv}>
            {props.ingredients.map((ingredient) => {
              return (
                <button
                  id={
                    addedItens.find((id) => id == ingredient.id) !== undefined
                      ? styles.fullButton
                      : styles.dashedButton
                  }
                  onClick={handleIngredientAdd}
                  key={ingredient.id}
                  value={ingredient.id}
                >
                  {ingredient.name}{" "}
                  {addedItens.find((id) => id == ingredient.id) !== undefined
                    ? "x"
                    : "+"}
                </button>
              );
            })}
          </div>
          {addedItens.length == 0 && (
            <p className={styles.error}>Selecione ao menos um ingrediente.</p>
          )}
        </label>
        <label htmlFor="price" className={styles.label}>
          Preço
          <input
            defaultValue={plateData.plate ? plateData.plate[0].price : ""}
            step="0.01"
            type="number"
            id="price"
            placeholder="Valor em reais"
            className={styles.inputPrice}
            {...register("price")}
          ></input>
          <p className={styles.error}>{errors.price?.message}</p>
        </label>
        <label htmlFor="description" className={styles.label}>
          Descrição
          <input
            defaultValue={plateData.plate ? plateData.plate[0].description : ""}
            type="text"
            id="description"
            placeholder="Fale brevemente sobre o prato"
            className={styles.inputDescription}
            {...register("description")}
          ></input>
          <p className={styles.error}>{errors.description?.message}</p>
        </label>
        {props.create ? (
          <CreateButton type="submit" />
        ) : (
          <UpdateButtons plateData={plateData} plate_id={props.plate_id} />
        )}
        <Snackbar
          open={snackbarmessage ? true : false}
          onClose={() => {
            setSnackbarMessage();
          }}
          autoHideDuration={3000}
          message={snackbarmessage}
        ></Snackbar>
      </form>
    );
  }
};
