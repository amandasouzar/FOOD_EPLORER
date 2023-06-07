import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useReq } from "./hooks/useReq";

import styles from "../src/style.module.css";
import { Signup } from "./pages/SignUp";
import { CreatePlate } from "./pages/CreatePlate";
import { UpdatePlate } from "./pages/UpdatePlate";
import { AdminMenu } from "./pages/AdminMenu";
import { ClientMenu } from "./pages/ClientMenu";
import { AdminSpecificPlate } from "./pages/AdminSpecifcPlate";
import { ClientSpecificPlate } from "./pages/ClientSpecificPlate";
import { ClientHome } from "./pages/ClientHome";
import { AdminHome } from "./pages/AdminHome";
import { Order } from "./pages/Order";
import { OrderRecord } from "./pages/OrderRecord";
import { Favorites } from "./pages/Favorites";

const App = () => {
  const [ingredients, setIngredients] = useState({});
  const [categories, setCategories] = useState({});

  const { getReq } = useReq();

  const fetchIngredients = async () => {
    try {
      const response = await getReq("http://localhost:3003/ingredients/getAll");

      if (!response.ok) {
        console.log("Something went wrong");
      } else {
        const jsonResponse = await response.json();
        setIngredients(jsonResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getReq("http://localhost:3003/categories/getAll");

      if (!response.ok) {
        console.log(response);
      } else {
        const jsonResponse = await response.json();
        setCategories(jsonResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { user, setUser } = useAuth();

  useEffect(() => {
    fetchIngredients();
    fetchCategories();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/home"
            element={<ClientHome categories={categories} />}
          ></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/history" element={<OrderRecord />}></Route>
          <Route path="/client/menu" element={<ClientMenu />}></Route>
          <Route
            path="/client/:plate_id"
            element={<ClientSpecificPlate />}
          ></Route>
          <Route
            path="/admin/home"
            element={<AdminHome categories={categories} />}
          ></Route>
          <Route path="/admin/menu" element={<AdminMenu />}></Route>
          <Route
            path="/admin/:plate_id"
            element={<AdminSpecificPlate />}
          ></Route>
          <Route
            path="/admin/create"
            element={
              <CreatePlate ingredients={ingredients} categories={categories} />
            }
          ></Route>
          <Route
            path="/admin/update/:plate_id"
            element={
              <UpdatePlate ingredients={ingredients} categories={categories} />
            }
          ></Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
