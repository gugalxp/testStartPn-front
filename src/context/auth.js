import { useState, createContext, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from "react-toastify";

import { destroyCookie, setCookie } from "nookies";
import { api } from "../../src/services/apiClient";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authRegisterUser, setAuthRegisterUser] = useState(false);
  const [tokenURL, setTokenURL] = useState(false)

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("SistemaUser");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  //Esqueci senha
  async function sendMail(email) {
    try {
      const response = await api.post("/sendMail", {
        email,
      });

      setUser({
        email
      })
      setTokenURL(response.data.token)
      console.log(response.data.token)
    } catch (error) {
      console.log(error)
    }
  }

  //Fazendo login do usuario
  async function signIn(email, password) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      const { id, email, name, telefone, endereco, token } = response.data;

      setCookie(undefined, "@startpn", token, {
        maxAge: 3600, // expirar em 1h
        path: "/",
      });

      setUser({
        id,
        email,
        name,
        telefone,
        endereco,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.log(error);
    }
  }

  //Cadastrando um novo usuario
  async function signUp(email, password, confirmedPassword, name) {
    try {
      if (confirmedPassword === password) {
        const response = await api.post("/users", {
          email,
          password,
          name,
        });
        
        if (response.data.id) {
          setAuthRegisterUser(true)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function storageUser(data) {
    localStorage.setItem("SistemaUser", JSON.stringify(data));
  }

  //Logout do usuario
  async function signOut() {
    try {
      destroyCookie(null, "@startpn", { path: "/" });
    } catch (error) {
      console.log("Erro ao tentar deslogar o usuario: ", error);
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut,
        authRegisterUser,
        sendMail,
        tokenURL,
        signIn,
        loadingAuth,
        setUser,
        storageUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
