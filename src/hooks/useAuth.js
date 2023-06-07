import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const setItem = (key, value) => {
    localStorage.setItem(key, value);
  };

  const getItem = (key) => {
    const value = localStorage.getItem(key);
    return value;
  };

  const removeItem = (key) => {
    localStorage.removeItem(key);
  };

  const addUser = (user) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user) => {
    console.log(user);
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { login, logout, user, setUser, getItem };
};
