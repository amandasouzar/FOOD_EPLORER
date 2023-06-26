import styles from "./style.module.css";
import { DownloadIcon } from "../../assets/DownloadIcon";
import { useState, useEffect, useRef } from "react";
import { useReq } from "../../hooks/useReq";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CreateButton } from "../CreateButton";
import { UpdateButtons } from "../UpdateButtons";

import { Snackbar, Alert } from "@mui/material";

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

export const PlateForm = (props) => {
  const [addedItens, setAddedItens] = useState([]);
  const [removedItens, setRemovedItens] = useState([]);

  const [plateData, setPlateData] = useState({});
  const [responseStatus, setResponseStatus] = useState({});

  const [existingCategory, setExistingCategory] = useState({});

  const [openAddCategoryBox, setOpenAddCategoryBox] = useState(false);
  const [openAddIngredientBox, setOpenAddIngredientBox] = useState(false);

  const [allCategories, setAllCategories] = useState();
  const [allIngredients, setAllIngredients] = useState();

  const [newCategory, setNewCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const [snackbarMessage, setSnackbarMessage] = useState();

  const inputCategory = useRef(null);
  const inputIngredient = useRef(null);

  const { getReq, postReq, postFormData } = useReq();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const watchedPlateImg = useWatch({
    control,
    name: "plateImg",
  });

  const onSubmitHandler = async (data) => {
    const formData = new FormData();
    formData.append("file", data.plateImg[0]);
    formData.append("name", JSON.stringify(data.plateName));
    formData.append("category_id", JSON.stringify(data.category_id));
    formData.append("description", JSON.stringify(data.description));
    formData.append("price", JSON.stringify(data.price));
    formData.append("ingredientsId", JSON.stringify(addedItens));
    formData.append("removedItens", JSON.stringify(removedItens));

    try {
      if (props.create) {
        const response = await postFormData(
          "http://localhost:3003/plates/create",
          formData
        );

        if (!response.ok) {
          console.log(response);
        } else {
          const jsonResponse = await response.json();

          if (jsonResponse.status < 400) {
            setSnackbarMessage({
              message: jsonResponse.message,
              severity: "success",
            });
            setTimeout(() => {
              window.location.href = "/admin/home";
            }, 3000);
          } else {
            setSnackbarMessage({
              message: jsonResponse.message,
              severity: "error",
            });
          }
        }
      } else {
        try {
          const formData = new FormData();
          formData.append("file", data.plateImg[0]);
          formData.append("name", JSON.stringify(data.plateName));
          formData.append("category_id", JSON.stringify(data.category_id));
          formData.append("description", JSON.stringify(data.description));
          formData.append("price", JSON.stringify(data.price));
          formData.append("ingredientsId", JSON.stringify(addedItens));
          formData.append("removedItens", JSON.stringify(removedItens));

          const response = await postFormData(
            "http://localhost:3003/plates/update/" + props.plate_id,
            formData
          );

          if (!response.ok) {
            console.log(response);
          } else {
            const jsonResponse = await response.json();
            setSnackbarMessage({
              message: jsonResponse.message,
              severity: "success",
            });
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
          setSnackbarMessage({
            message: jsonResponse.message,
            severity: "warning",
          });
        } else {
          setNewCategory(jsonResponse.information);
          setAllCategories((prevArray) => [
            ...prevArray,
            { name: inputCategory.current.value, id: jsonResponse.id },
          ]);
          setOpenAddCategoryBox(false);
          setSnackbarMessage({
            message: "Categoria adicionada!",
            severity: "success",
          });
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
          setSnackbarMessage({
            message: jsonResponse.message,
            severity: "warning",
          });
        } else {
          setAddedItens((prevArray) => [...prevArray, +jsonResponse.id]);
          setAllIngredients((prevArray) => [
            ...prevArray,
            { name: inputIngredient.current.value, id: jsonResponse.id },
          ]);
          setOpenAddIngredientBox(false);
          setSnackbarMessage({
            message: "Ingrediente adicionado!",
            severity: "success",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSettingStates = (categories, ingredients) => {
    setAllCategories(categories);
    setAllIngredients(ingredients);
  };

  useEffect(() => {
    if (newCategory) {
      setSelectedCategory(newCategory.id);
    }
  }, [newCategory]);

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

    if (
      props.categories &&
      props.ingredients &&
      props.categories[0] !== undefined &&
      props.ingredients[0] !== undefined
    ) {
      handleSettingStates(props.categories, props.ingredients);
    }
  }, [responseStatus]);

  if (
    !plateData ||
    (allCategories === undefined && typeof props.categories !== "string") ||
    (allIngredients === undefined && typeof props.categories !== "string") ||
    (existingCategory[0] === undefined && !props.create)
  ) {
    return (
      <>
        <div className={styles.loading}>Loading...</div>;
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
      </>
    );
  } else {
    return (
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <h1>{props.title}</h1>
        <div className={styles.topDiv}>
          <label htmlFor="plateImg" className={styles.imgLabel}>
            Imagem do prato
            <div className={styles.downloadImgDiv}>
              <DownloadIcon />
              <p>
                {watchedPlateImg
                  ? watchedPlateImg?.[0].name
                  : props.placeholder}
              </p>
              <input
                id="plateImg"
                name="plateImg"
                type="file"
                accept="image/*"
                className={styles.inputImg}
                {...register("plateImg")}
              ></input>
            </div>
            <p className={styles.error}>{errors.plateImg?.message}</p>
          </label>
          <label htmlFor="name" className={styles.nameLabel}>
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
          <label htmlFor="category" className={styles.categoryLabel}>
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
            {allCategories && (
              <select
                id="category"
                className={styles.inputCategory}
                {...register("category_id")}
                defaultValue={
                  selectedCategory
                    ? selectedCategory
                    : props.create
                    ? 0
                    : existingCategory[0].id
                }
              >
                <option disabled hidden value={0}>
                  Selecione uma categoria
                </option>
                {typeof allCategories !== "string" && allCategories?.map((category) => {
                  return (
                    <option
                      id={category.id}
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            )}
            <p className={styles.error}>{errors.category_id?.message}</p>
          </label>
        </div>
        <div className={styles.middleDiv}>
          <label htmlFor="ingredients" className={styles.ingredientLabel}>
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
            {typeof allCategories !== "string" && (
              <div className={styles.ingredientsDiv}>
                {allIngredients?.map((ingredient) => {
                  return (
                    <button
                      id={
                        addedItens.find((id) => id == ingredient.id) !==
                        undefined
                          ? styles.fullButton
                          : styles.dashedButton
                      }
                      onClick={handleIngredientAdd}
                      key={ingredient.id}
                      value={ingredient.id}
                    >
                      {ingredient.name}{" "}
                      {addedItens.find((id) => id == ingredient.id) !==
                      undefined
                        ? "x"
                        : "+"}
                    </button>
                  );
                })}
              </div>
              )}
              {addedItens.length == 0 && (
                <p className={styles.error}>Selecione ao menos um ingrediente.</p>
                )}
          </label>
        </div>
        <div className={styles.bottomDiv}>
          <label htmlFor="price" className={styles.priceLabel}>
            Preço
            <input
              defaultValue={
                plateData.plate ? plateData.plate[0].price.toFixed(2) : ""
              }
              step="0.01"
              type="number"
              id="price"
              placeholder="Valor em reais"
              className={styles.inputPrice}
              {...register("price")}
            ></input>
            <p className={styles.error}>{errors.price?.message}</p>
          </label>
          <label htmlFor="description" className={styles.descriptionLabel}>
            Descrição
            <input
              defaultValue={
                plateData.plate ? plateData.plate[0].description : ""
              }
              type="text"
              id="description"
              placeholder="Fale brevemente sobre o prato"
              className={styles.inputDescription}
              {...register("description")}
            ></input>
            <p className={styles.error}>{errors.description?.message}</p>
          </label>
        </div>
        {props.create ? (
          <CreateButton type="submit" />
        ) : (
          <UpdateButtons plateData={plateData} plate_id={props.plate_id} />
        )}
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
      </form>
    );
  }
};
