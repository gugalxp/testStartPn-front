import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "../../src/services/apiClient";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [userAuth, setUserAuth] = useState(null);
  const [emailUserAuth, setEmailUserAuth] = useState(null);
  const [urlImgUserAuth, setUrlImgUserAuth] = useState(null);
  const [nameUserAuth, setNameUserAuth] = useState(null);
  const [telefoneUser, setTelefoneUser] = useState(null);
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
      setIsSupplier(false);
      setIsClients(true);
      const response = await api.get(`/client/${userAuth}`);
      console.log("LISTA CLIENTES", response.data.length);
      setClients(response.data);
    } catch (error) {
      console.log("error  CATCH: ", error);
      console.log("error response:", error.response);
    }
  }

  //Listar fornecedor
  async function listSupplier() {
    try {
      setIsClients(false);
      setIsSupplier(true);
      const response = await api.get(`/fornecedor/${userAuth}`);
      setSupplier(response.data);
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
          console.log("USER ATUAL LOGADO: ", response.data);
          const { id, name, email, urlImg } = response.data;
          setUserAuth(id, name, email, urlImg); //enquanto houver o token no storage manterá o usuário logado
          setNameUserAuth(name);
          setEmailUserAuth(email);
          if (urlImg !== null) {
            setUrlImgUserAuth(urlImg);
            localStorage.setItem("@urlImgPerfil", urlImg); // adiciona a URL ao localStorage
          }
        })
        .catch((err) => {
          console("ERRO DE LOGIN: ", err);
          signOut();
        });
    } else {
      signOut();
    }

    if (isClients) {
      const idInterval = setInterval(() => {
        if (userAuth) {
          console.log("O ID É ESSE: ", userAuth);
          console.log("CHEGOU NA CONDIÇÃO");
          listClient();
          clearInterval(idInterval);
        }
      });
    }
  }, [userAuth]);

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

      return true;
    } catch (error) {
      toast.error("Houve algum problema ao tentar enviar o e-mail! ");
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
        // toast.info(response.data.error);
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
        // toast.info(response.data.error);
      } else {
        setIsSupplier(false);
        setSearchItemsSuplier(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createTerceiroData(
    name,
    email,
    telefone,
    endereco,
    tipo,
    imgUrl
  ) {
    try {
      if (tipo === "Cliente" && userAuth) {
        const response = await api.post("/client", {
          name,
          email,
          telefone,
          endereco,
          urlImg: imgUrl,
          id: userAuth,
        });

        listClient();
        toast.success("Novo Terceiro do tipo Cliente criado!");
        return response.data;
      }
      if (tipo === "Fornecedor" && userAuth) {
        const response = await api.post("/fornecedor", {
          name,
          email,
          telefone,
          endereco,
          urlImg: imgUrl,
          id: userAuth,
        });
        listSupplier();
        toast.success("Novo Terceiro do tipo Fornecedor criado!");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async function addColumnDinamyc(campo, tipo) {
    try {
      if (tipo === "Cliente" && userAuth) {
        console.log("O CAMPO ADICIONADO FOI: ", campo);
        console.log("O tipo escolhido foi: ", tipo);
        // const response = await api.post("/", {
        //   campo,
        //   userAuth
        // });

        listClient();
        // toast.success("Novo Terceiro do tipo Cliente criado!");
        // return response.data;
      }
      if (tipo === "Fornecedor" && userAuth) {
        console.log("O CAMPO ADICIONADO FOI: ", campo);
        console.log("O tipo escolhido foi: ", tipo);
        // const response = await api.post("/", {
        //   campo,
        //   userAuth
        // });
        listSupplier();
        // toast.success("Novo Terceiro do tipo Fornecedor criado!");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async function updateTerceiroData(
    name,
    email,
    telefone,
    endereco,
    tipo,
    idItem,
    imgUrl
  ) {
    try {
      if (tipo === "Cliente") {
        console.log("A URL É ESSA: ", imgUrl);
        const response = await api.put(`/client/${idItem}`, {
          name,
          email,
          telefone,
          endereco,
          urlImg: imgUrl,
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
          urlImg: imgUrl,
        });
        toast.success("Fornecedor atualizado com sucesso!");
        listSupplier();
        return true;
      }
    } catch (error) {
      toast.error(error);
    }
  }

  async function updateUserData(name, email, telefone, password, urlImg) {
    try {
      if (password) {
        newPasswordUpdateUser(password);
      }
      const response = await api.put(`/users/updateUser/${userAuth}`, {
        name,
        email,
        telefone,
        urlImg,
      });
      console.log(response.data);
      toast.success("Seus dados foram atualizados com sucesso!");
    } catch (error) {
      toast.error(error);
    }
  }

  async function newPasswordUpdateUser(newPassword) {
    try {
      const response = await api.put(`/users/updatePassword/${userAuth}`, {
        newPassword,
      });

      toast.success(response.data);

      return true;
    } catch (error) {
      return false;
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

  async function deleteAll(tipo) {
    try {
      if (tipo === "Cliente") {
        const response = await api.delete(`/client/deleteAll/${userAuth}`);
        toast.success(response.data);
        listClient();
      }
      if (tipo === "Fornecedor") {
        console.log("ID USER FORNE: ", userAuth)
        const response = await api.delete(`/fornecedor/deleteAll/${userAuth}`);
        toast.success(response.data);
        listSupplier();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function newPasswordCreateForgotPassword(newPassword) {
    try {
      const { "@idNewPassword": idNewPassword } = parseCookies();

      let id = idNewPassword;

      const response = await api.put(`/users/updatePassword/${id}`, {
        newPassword,
      });

      toast.success("Atualizado com sucesso");

      return true;
    } catch (error) {
      toast.error("Houve algum problema ao tentar criar nova senha");
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

      const { id, name, telefone, endereco, token, urlImg } = response.data;

      console.log("METODO SIGNIN", urlImg);
      setTelefoneUser(telefone);
      setNameUserAuth(name);
      setEmailUserAuth(email);

      if (urlImg !== null) {
        setUrlImgUserAuth(urlImg);
        localStorage.setItem("@urlImgPerfil", urlImg); // adiciona a URL ao localStorage
      }

      setCookie(undefined, "@startpn", token, {
        maxAge: 3600, // expirar em 1h
        path: "/",
      });

      setUserAuth(id, email, name, telefone, endereco);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Logado com sucesso!");
      listClient();
      console.log("ESTADO DE CLIENTE: ", isClients);
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

        if (response.data.id) {
          toast.success("Cadastrado efetuado com sucesso!");
          return true;
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
      localStorage.clear();
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
        sendMail,
        supplier,
        listClient,
        listSupplier,
        signIn,
        setUserAuth,
        emailUserAuth,
        nameUserAuth,
        setEmailSentConfirmed,
        emailSentConfirmed,
        newPasswordCreateForgotPassword,
        searchSupplier,
        searchClient,
        searchItemsClient,
        searchItemsSuplier,
        setIsSupplier,
        setIsClients,
        createTerceiroData,
        updateTerceiroData,
        deleteTerceiroData,
        updateUserData,
        deleteAll,
        telefoneUser,
        addColumnDinamyc,
        urlImgUserAuth,
        setUrlImgUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
