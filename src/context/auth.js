import { useState, createContext, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from "react-toastify";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "../../src/services/apiClient";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState(false);
  const [supplier, setSupplier] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [isClients, setIsClients] = useState(true);
  
  function loadStorage() {
    const storageUser = localStorage.getItem("SistemaUser");

    if (storageUser) {
      setUser(JSON.parse(storageUser));
      setLoading(false);
    }

    setLoading(false);
  }
  //Listar clientes
  async function listClient() {
    try {
      if (isSupplier) {
        setIsSupplier(false)
        setIsClients(true);
        const response = await api.get("/client");
        setClients(response.data);
      } else {
        const response = await api.get("/client");
        setClients(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Listar fornecedor
  async function listSupplier() {
    try {
      if (isClients) {
       setIsClients(false);
       setIsSupplier(true);
       const response = await api.get("/fornecedor");
       setSupplier(response.data);
      } else {
        const response = await api.get("/fornecedor");
        setSupplier(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    const { "@startpn": token } = parseCookies();
    if (!token) {
      signOut();
    }
    if (isClients) {
      listClient();
    }
    loadStorage();
  }, []);

  //Esqueci senha
  async function sendMail(email) {
    try {
      const response = await api.post("/sendMail", {
        email,
      });
      toast.success("E-mail enviado com sucesso!")
      return true;
    } catch (error) {
      toast.error("Houve algum problema ao enviar e-mail!")
      return false;
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

      const { id, name, telefone, endereco, token } = response.data;

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
      toast.success("Logado com sucesso!")
      return true;
    } catch (error) {
      toast.error(error)
      return false;
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
          toast.success("Cadastrado efetuado com sucesso!")
        }
      } else {
        toast.error("As senhas inseridas não coincidem!");
        return false;
      }
      return true;
    } catch (error) {
      toast.error(error);
      return false;
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
        signUp,
        clients,
        signOut,
        isSupplier,
        isClients,
        listClient,
        sendMail,
        supplier,
        listSupplier,
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
