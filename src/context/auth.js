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

  const [clients, setClients] = useState(false);
  const [supplier, setSupplier] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [isClients, setIsClients] = useState(true);
  const [searchItemsSuplier, setSearchItemsSuplier] = useState("");
  const [searchItemsClient, setSearchItemsClient] = useState("");

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
      api
        .get("/users/details")
        .then((response) => {
          const { id, name, email } = response.data;
          setUserAuth(id, name, email); //enquanto houver o token no storage manterá o usuário logado
          setNameUserAuth(name);
          setEmailUserAuth(email);
        })
        .catch((err) => {
          signOut();
        });
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

      setCookie(
        undefined,
        "@idNewPassword",
        response.data.resonseEmailSent.id,
        {
          maxAge: 3600, // expirar em 1h
          path: "/",
        }
      );

      toast.success("E-mail enviado com sucesso!");
      return true;
    } catch (error) {
      console.log("O error é esse: ", error);
      return false;
    }
  }

  //search Client
  async function searchClient(search) {
    try {
      const response = await api.post("/client/search", {
        search,
      });

      if (response.data.error !== undefined) {
        toast.info(response.data.error);
      } else {
        setIsClients(false);
        setSearchItemsClient(response.data);
      }
    } catch (error) {
      console.log("ERROR Search Client", error);
    }
  }

  //search Fornecedor
  async function searchSupplier(search) {
    try {
      const response = await api.post("/fornecedor/search", {
        search,
      });
      if (response.data.error !== undefined) {
        toast.info(response.data.error);
      } else {
        setIsSupplier(false);
        setSearchItemsSuplier(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createTerceiroData(name, email, telefone, endereco, tipo) {
    try {
      if (tipo === "Cliente") {
        const response = await api.post("/client", {
          name,
          email,
          telefone,
          endereco,
        });
        listClient();
        toast.success("Novo Terceiro do tipo Cliente criado!");
      }
      if (tipo === "Fornecedor") {
        const response = await api.post("/fornecedor", {
          name,
          email,
          telefone,
          endereco,
        });
        listSupplier();
        toast.success("Novo Terceiro do tipo Fornecedor criado!");
      }
    } catch (error) {
      toast.error(error);
    }
  }

  async function updateTerceiroData(
    name,
    email,
    telefone,
    endereco,
    tipo,
    idItem
  ) {
    try {
      if (tipo === "Cliente") {
        console.log(idItem)
        const response = await api.put(`/client/${idItem}`, {
          name,
          email,
          telefone,
          endereco,
        });
        toast.success("Cliente atualizado com sucesso!");
        listClient();
      }
      if (tipo === "Fornecedor") {
        const response = await api.put(`/fornecedor/${idItem}`, {
          idItem,
          name,
          email,
          telefone,
          endereco,
        });
        toast.success("Fornecedor atualizado com sucesso!");
        listSupplier();
      }
    } catch (error) {
      toast.error(error);
    }
  }

  async function deleteTerceiroData(id, tipo) {
    try {
      if (tipo === "Cliente") {
        const response = await api.delete(`/client/${id}`);
        console.log(response.data);
        toast.success("Cliente excluido com sucesso!");
        listClient();
      }
      if (tipo === "Fornecedor") {
        const response = await api.delete(`/fornecedor/${id}`);
        console.log(response.data);
        toast.success("Fornecedor excluido com sucesso!");
        listSupplier();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function newPasswordCreate(newPassword) {
    try {
      const { "@idNewPassword": idNewPassword } = parseCookies();

      let id = idNewPassword;

      const response = await api.put("/users/update", {
        id,
        newPassword,
      });

      toast.success("Atualizado com sucesso");

      return true;
    } catch (error) {
      return false;
    }
  }

  //Fazendo login do usuario
  async function signIn(email, password) {
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

      setUserAuth(id, email, name, telefone, endereco);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Logado com sucesso!");
      listClient();
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
      console.log(error);
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
        emailSentConfirmed,
        newPasswordCreate,
        searchSupplier,
        searchClient,
        searchItemsClient,
        searchItemsSuplier,
        setIsSupplier,
        setIsClients,
        createTerceiroData,
        updateTerceiroData,
        deleteTerceiroData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
