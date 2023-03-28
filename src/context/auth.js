import { useState, createContext, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import { toast } from "react-toastify";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "../../src/services/apiClient";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [userAuth, setUserAuth] = useState(null);
  const [emailUserAuth, setEmailUserAuth] = useState(null);
  const [nameUserAuth, setNameUserAuth] = useState(null);
  const [emailSentConfirmed, setEmailSentConfirmed] = useState(null);
  
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState(false);
  const [supplier, setSupplier] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [isClients, setIsClients] = useState(true);


  //Listar clientes
  async function listClient() {
    try {
      if (isSupplier) {
        setIsSupplier(false);
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
    //detalhes usuario
    const { "@startpn": token } = parseCookies();
    if (token) {
      api.get("/users/details").then((response) => {
        const {id, name, email} = response.data;
        setUserAuth(id, name, email);//enquanto houver o token no storage manterá o usuário logado
        setNameUserAuth(name)
        setEmailUserAuth(email)
      }).catch(err => {
        signOut();
      })
    } else {
      signOut();
    }

    if (isClients) {
      listClient();
    }
  }, []);

  //Enviar Email
  async function sendMail(email) {
    try {
      const response = await api.post("/sendMail", {
        email,
      });
      console.log(response.data.message)
      toast.success("E-mail enviado com sucesso!");
      return true;
    } catch (error) {
      console.log("O error é esse: ", error.message);
      if (error != "") {
        toast.error("Houve algum problema ao enviar e-mail!");
      }
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

      setNameUserAuth(name);
      setEmailUserAuth(email);

      setCookie(undefined, "@startpn", token, {
        maxAge: 3600, // expirar em 1h
        path: "/",
      });

      setUserAuth(
        id,
        email,
        name,
        telefone,
        endereco,
      );

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Logado com sucesso!");
      return true;
    } catch (error) {
      toast.error(error);
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

        setUserAuth(response.data);

        if (response.data.id) {
          toast.success("Cadastrado efetuado com sucesso!");
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

  //Logout do usuario
  async function signOut() {
    try {
      destroyCookie(null, "@startpn", { path: "/" });
    } catch (error) {
      console.log("Erro ao tentar deslogar o usuario: ", error);
    }
    setUserAuth(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!userAuth,
        userAuth,
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
        setUserAuth,
        emailUserAuth,
        nameUserAuth,
        setEmailSentConfirmed,
        emailSentConfirmed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
