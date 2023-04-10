import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "./api";
import { handleServerError } from "../../config/toastConfig";

export const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    getUser();
    getToken();
  }, []);

  const signup = async (phoneNumber, name) => {
    try {
      const response = await api.signup(phoneNumber, name);
      const { token, user } = response.data;
      setUser(user);
      setToken(token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error)
      handleServerError(error.response.status);
    }
  };

  const login = async (phoneNumber) => {
    try {
      const response = await api.login(phoneNumber);
      const { token, user } = response.data;
      setUser(user);
      setToken(token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error)
      handleServerError(error.response.status);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  };

  const addUserInfo = async (about) => {
    try {
      await api.addUserInfo(token, about);
    } catch (error) {
      console.log(error)
      handleServerError(error.response.status);
    }
  };

  return (
    <AuthenticatedUserContext.Provider
      value={{
        user,
        token,
        signup,
        login,
        logout,
        addUserInfo
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export default AuthenticatedUserProvider;
// export { AuthenticatedUserProvider };
