import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import SubModal from "../../components/Modals/SubModal";
import Button from "../../components/Button";
import Modal from "../../components/Modals/Modal";
import Title from "../../components/Title";
import HeaderMobile from "../../components/Header/HeaderMobile";
import { FiMoreVertical, FiSettings, FiSearch } from "react-icons/fi";
import { MdAddAPhoto, MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import avatar from "../../assets/images/avatar.png";
import userImg from "../../assets/images/user.png";
import AvatarImg from "../../assets/images/avatar.png";
import DashboardColumnLayout from "../../layouts/DashboardColumnLayout";
import { toast } from "react-toastify";
import firebase, { storage } from "../../services/firebaseConnection";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { IoIosArrowDropleft } from "react-icons/io";

export default function Dashboard() {
  const [itemMenu, setItemMenu] = useState(1);
  const [itemMenuModal, setItemMenuModal] = useState(1);
  const [showModalEditOrDelete, setShowModalEditOrDelete] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalNewTerceiro, setShowModalNewTerceiro] = useState(false);
  const [showModalConfiguracao, setShowModalConfiguracao] = useState(false);
  const [search, setSearch] = useState();
  const [novoTerceiroNome, setNovoTerceiroNome] = useState();
  const [novoTerceiroEmail, setNovoTerceiroEmail] = useState();
  const [novoTerceiroTelefone, setNovoTerceiroTelefone] = useState();
  const [novoTerceiroEndereco, setNovoTerceiroEndereco] = useState();
  const [novoTerceiroTipo, setNovoTerceiroTipo] = useState();

  const [updateTerceiroNome, setUpdateTerceiroNome] = useState();
  const [updateTerceiroEmail, setUpdateTerceiroEmail] = useState();
  const [updateTerceiroTelefone, setUpdateTerceiroTelefone] = useState();
  const [updateTerceiroEndereco, setUpdateTerceiroEndereco] = useState();
  const [updateTerceiroTipo, setUpdateTerceiroTipo] = useState();
  const [deleteTerceiroTipo, setDeleteTerceiroTipo] = useState("Cliente");

  const [imgUrlAtual, setImgUrlAtual] = useState();
  const [idItem, setIdItem] = useState();
  const [nameItem, setNameItem] = useState();
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const [progress, setProgress] = useState(0);
  const [accessInfoClient, setAccessInfoClient] = useState("");
  const [selectedAllCheckbox, setSelectedAllCheckbox] = useState(false);
  const [isInputSearchMobile, setIsInputSearchMobile] = useState(false);
  const [exibeImagemModal, setExibeImagemModal] = useState(false);
  const [newFieldTable, setNewFieldTable] = useState([]);

  const {
    clients,
    supplier,
    listSupplier,
    isSupplier,
    isClients,
    listClient,
    nameUserAuth,
    searchSupplier,
    searchClient,
    searchItemsClient,
    searchItemsSuplier,
    setIsSupplier,
    setIsClients,
    createTerceiroData,
    updateTerceiroData,
    deleteTerceiroData,
    deleteAll,
    addColumnDinamyc,
  } = useContext(AuthContext);

  ///////////////// SALVA IMAGEM NO FIREBASE

  useEffect(() => {
    const imgUrlFromLocalStorage = localStorage.getItem(
      `imgUrl_${accessInfoClient}`
    ); // adiciona a URL ao localStorage
    setImgUrl(imgUrlFromLocalStorage);
  });

  async function handleUpload(event) {
    event.preventDefault();

    const input = document.getElementById("avatar");
    let file;
    if (input.files && input.files[0]) {
      file = input.files[0];

      // Fazer alguma coisa com o arquivo, por exemplo, enviar para o servidor via AJAX
      // ...
    }
    if (!file) return toast.info("Escolha uma foto de perfil!");

    const storageRef = ref(
      storage,
      `images/clients/${accessInfoClient}/${file.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        try {
          getDownloadURL(uploadTask.snapshot.ref).then((urlImg) => {
            setImgUrl(urlImg);
            setExibeImagemModal(urlImg);

            localStorage.setItem(`imgUrl_${accessInfoClient}`, urlImg);

            const response = createTerceiroData(
              novoTerceiroNome,
              novoTerceiroEmail,
              novoTerceiroTelefone,
              novoTerceiroEndereco,
              novoTerceiroTipo,
              urlImg
            );

            if (response) {
              setAccessInfoClient(response.id);
              setNovoTerceiroNome("");
              setNovoTerceiroEmail("");
              setNovoTerceiroTelefone("");
              setNovoTerceiroEndereco("");
              setNovoTerceiroTipo("");
              setExibeImagemModal(false);
            } else {
              return;
            }

            const responseupdt = updateTerceiroData(
              updateTerceiroNome,
              updateTerceiroEmail,
              updateTerceiroTelefone,
              updateTerceiroEndereco,
              updateTerceiroTipo,
              idItem,
              urlImg
            );

            if (responseupdt) {
              setAccessInfoClient(responseupdt.id);
              setUpdateTerceiroNome("");
              setUpdateTerceiroEmail("");
              setUpdateTerceiroTelefone("");
              setUpdateTerceiroEndereco("");
              setUpdateTerceiroTipo("");
              setExibeImagemModal(false);
            } else {
              return;
            }
          });
        } catch (error) {}
      }
    );
  }

  /////////////////////////////////////////////

  async function newTerceiroModalContent(e) {
    e.preventDefault();

    await handleUpload(e);
  }

  async function updateTerceiroModalContent(e) {
    e.preventDefault();

    await handleUpload(e);
  }

  function deleteTerceiroModalContent() {
    closeModals();
    deleteTerceiroData(idItem, deleteTerceiroTipo);
  }

  function togglePostModalConfiguracao() {
    setShowModalConfiguracao(!showModalConfiguracao); //troca de true para false
  }

  function togglePostModalNewTerceiro() {
    setShowModalNewTerceiro(!showModalNewTerceiro); //troca de true para false
  }

  function handleDeleteAll() {
    if (itemMenu === 1) {
      deleteAll("Cliente");
      setSelectedAllCheckbox(false);
    } else {
      deleteAll("Fornecedor");
      setSelectedAllCheckbox(false);
    }
  }

  function togglePostModalEditOrDelete(id, name, urlImgAtual) {
    setIdItem(id);
    setNameItem(name);
    setImgUrlAtual(urlImgAtual);
    setShowModalEditOrDelete(!showModalEditOrDelete); //troca de true para false
    setShowSubModal(false);
  }

  function togglePostSubModal() {
    setShowSubModal(!showSubModal);
    setShowModalEditOrDelete(false);
  }

  function closeModals() {
    togglePostModalEditOrDelete();
    togglePostSubModal();
  }

  function togglePostModalEdit() {
    setShowModalEdit(!showModalEdit);
    setShowModalEditOrDelete(false);
  }

  async function handleListContentSupplier(list) {
    if (list === "1") {
      setItemMenu(1);
      setDeleteTerceiroTipo("Cliente");
      setIsClients(true);
    } else {
      listSupplier();
      setItemMenu(2);
      setDeleteTerceiroTipo("Fornecedor");
      setIsSupplier(true);
    }
  }

  async function handleListContentClient(list) {
    if (list === "1") {
      setItemMenu(1);
      setDeleteTerceiroTipo("Cliente");
      setIsSupplier(false);
      setIsClients(true);
      listClient();
    } else {
      setItemMenu(2);
      setDeleteTerceiroTipo("Fornecedor");
      setIsClients(false);
      setIsSupplier(true);
    }
  }

  function handleSearch(event) {
    if (itemMenu === 1) {
      if (event.key === "Enter") {
        searchClient(search);
      }
      searchClient(search);
    } else {
      if (event.key === "Enter") {
        searchSupplier(search);
      }
      searchSupplier(search);
    }
  }

  function handleCheckbox() {
    setCheckboxSelected(!checkboxSelected);

    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (checkbox.id !== "current-checkbox") {
        checkbox.checked = !checkboxSelected;
        setSelectedAllCheckbox(checkbox.checked);
      }
    });
  }

  function addFiledModalConfig(e) {
    e.preventDefault();

    setNewFieldTable([...newFieldTable, newFieldTable]);

    if (itemMenuModal === 1) {
      addColumnDinamyc(newFieldTable, "Cliente")
    } else {
      addColumnDinamyc(newFieldTable, "Fornecedor")
    }
  }

  function removeField(index) {
    setNewFieldTable(prevFields => prevFields.filter((_, i) => i !== index));
  }

  const containerNav = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  const containerMenuNavDesktop = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    width: "100%",
  };

  const menuNav = {
    width: "233px",
    height: "45px",
    gap: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    border: "1px solid #D7D7D7",
    borderRadius: "100px",
  };

  const menuNavModal = {
    width: "280px",
    height: "45px",
    padding: ".25em",
    gap: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    border: "1px solid #D7D7D7",
    borderRadius: "100px",
  };

  const menuNavContainer = {
    display: "flex",
    justifyContent: "center",
    marginTop: "1em",
  };

  const newTerceiro = {
    width: "160px",
    height: "45px",
    background: "#476EE6",
    borderRadius: "60px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "24px",
    letterSpacing: "0.3px",
  };

  const deleteAllItems = {
    width: "160px",
    height: "45px",
    background: "red",
    borderRadius: "60px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "24px",
    letterSpacing: "0.3px",
  };

  const iconSettingsContainer = {
    position: "relative",
    right: "5px",
    width: "45px",
    height: "45px",
    background: "#FFFFFF",
    border: "1px solid #D7D7D7",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const checkbox = {
    borderRadius: 0,
    border: "1px solid #989898",
    width: "16px",
    height: "16px",
    cursor: "pointer",
  };

  const checkboxModal = {
    borderRadius: 0,
    border: "1px solid #989898",
    width: "14px",
    height: "14px",
    cursor: "pointer",
  };

  const imgUserStyle = {
    width: "37px",
    height: "37px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const modal_header = {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #D7D7D7",
  };

  const editar_terceiro = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "64px",
    color: "#030303",
    fontWeight: 500,
    fontSize: "10px",
    lineHeight: "27px",
    borderBottom: "1px solid #D7D7D7",
    cursor: "pointer",
  };

  const excluir_terceiro = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "64px",
    color: "#EA0000",
    fontWeight: 500,
    fontSize: "10px",
    lineHeight: "27px",
    borderBottom: "1px solid #D7D7D7",
    cursor: "pointer",
  };

  const title_header = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "27px",
  };

  const button = {
    background: "#476EE6",
    borderRadius: "50px",
    width: "110px",
    height: "35px",
    color: "#FFF",
    border: "none",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "21px",
  };

  const fixEditarTerceiro = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "27px",
  };

  const styleImgUserModal = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    marginTop: "50px",
  };

  const containerStyleImgUserModal = {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  };

  const file_input = {
    opacity: 0,
    position: "absolute",
    zIndex: -1,
    display: "none",
  };

  const form = {
    height: "310px",
    width: "100%",
    position: "absolute",
    bottom: "0",
    padding: "15px",
    gap: "10px",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, auto)",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const formSettings = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const label = {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
    marginBottom: "11px",
    color: "#000000",
    width: "100%",
  };

  const containerInput = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "2px",
  };

  const input = {
    width: "250px",
    borderRadius: "7px",
    height: "50.06px",
    border: "1px solid #d7d7d7",
    background: "#fff",
    padding: "10px",
  };

  const inputModalSettings = {
    height: "40px",
    width: "200px",
    borderRadius: "10px",
    border: "1px solid #d7d7d7",
    background: "#fff",
    padding: "10px",
  };

  const containerCheckboxModal = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: "10px",
    marginTop: "1em",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
    letterSpacing: "0.202385px",
  };

  const select = {
    ...input,
  };

  const qtdNumeroCampo = {
    backgroundColor: "#476EE6",
    width: "2em",
    height: "2em",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ".6em",
    fontWeight: 600,
  };

  const containerQtdNumeroCampo = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: "15px",
    height: "100%",
    marginBottom: "10px",
  };

  const containerInputSearch = {
    display: "flex",
    position: "relative",
  };

  function handleInputSearchMobile() {
    setIsInputSearchMobile(!isInputSearchMobile);
  }

  return (
    <div>
      {isInputSearchMobile ? (
        <div className="inputSearchResponsiveStyle">
          <IoIosArrowDropleft
            size={35}
            color="#476EE6"
            onClick={handleInputSearchMobile}
          />
          <div className="containerInputSearchMobileTop">
            <div>
              <div
                onClick={handleSearch}
                className="iconSearchContainerResponsive"
              >
                <FiSearch
                  style={{ display: "absolute" }}
                  color="#476ee6"
                  size={25}
                  onClick={handleSearch}
                />
              </div>
              <input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar"
                className="inputSearchMobileTop"
                maxLength={100}
                onKeyPress={handleSearch}
                onBlur={handleSearch}
              />
            </div>
          </div>
        </div>
      ) : (
        <HeaderMobile />
      )}
      <DashboardColumnLayout
        colum2Data={
          <div>
            <div className="showTitle">
              <Title nameUser={nameUserAuth} page="Terceiros" />
            </div>
            <div style={containerNav}>
              <div className="showTitleMobile">
                <div className="containerMenuNavMobile">
                  <div className="menuNav">
                    <Link
                      className={itemMenu === 1 ? "item active" : "item"}
                      onClick={() => handleListContentClient("1")}
                    >
                      Clientes
                    </Link>
                    <Link
                      className={itemMenu === 2 ? "item active" : "item"}
                      onClick={() => handleListContentSupplier("2")}
                    >
                      Fornecedores
                    </Link>
                  </div>
                  {!isInputSearchMobile && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          flexDirection: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <span className="titleMobile">Terceiros</span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <div className="containerInputSearch">
                            <div
                              onClick={handleSearch}
                              className="iconSearchContainer"
                            >
                              <svg
                                style={{ cursor: "pointer" }}
                                width="30"
                                height="25"
                                viewBox="3 -2 18 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.16667 16.4798C12.8486 16.4798 15.8333 13.4951 15.8333 9.81315C15.8333 6.13125 12.8486 3.14648 9.16667 3.14648C5.48477 3.14648 2.5 6.13125 2.5 9.81315C2.5 13.4951 5.48477 16.4798 9.16667 16.4798Z"
                                  stroke="#1172EB"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M17.5 18.1465L13.875 14.5215"
                                  stroke="#1172EB"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <input
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Pesquisar"
                              className="inputSearch"
                              maxLength={100}
                              onKeyPress={handleSearch}
                              onBlur={handleSearch}
                            />
                          </div>
                          <div
                            className="containerInputSearchMobile"
                            onClick={handleInputSearchMobile}
                          >
                            <div
                              className="iconSearchContainer"
                              onClick={handleSearch}
                            >
                              <svg
                                style={{ cursor: "pointer" }}
                                width="30"
                                height="25"
                                viewBox="3 -2 18 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.16667 16.4798C12.8486 16.4798 15.8333 13.4951 15.8333 9.81315C15.8333 6.13125 12.8486 3.14648 9.16667 3.14648C5.48477 3.14648 2.5 6.13125 2.5 9.81315C2.5 13.4951 5.48477 16.4798 9.16667 16.4798Z"
                                  stroke="#1172EB"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M17.5 18.1465L13.875 14.5215"
                                  stroke="#1172EB"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                            <input
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Pesquisar"
                              className="inputSearchMobile"
                              maxLength={100}
                              onClick={handleInputSearchMobile}
                            />
                          </div>
                          <div style={iconSettingsContainer}>
                            <FiSettings
                              size={23}
                              color="#476EE6"
                              onClick={togglePostModalConfiguracao}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="showTitleDesktop">
                <div style={containerMenuNavDesktop}>
                  <div className="menuNav">
                    <Link
                      className={itemMenu === 1 ? "item active" : "item"}
                      onClick={() => handleListContentClient("1")}
                    >
                      Clientes
                    </Link>
                    <Link
                      className={itemMenu === 2 ? "item active" : "item"}
                      onClick={() => handleListContentSupplier("2")}
                    >
                      Fornecedores
                    </Link>
                  </div>
                  <div style={containerInputSearch}>
                    <div onClick={handleSearch} className="iconSearchContainer">
                      <svg
                        style={{ cursor: "pointer" }}
                        width="30"
                        height="25"
                        viewBox="2 -2 18 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.16667 16.4798C12.8486 16.4798 15.8333 13.4951 15.8333 9.81315C15.8333 6.13125 12.8486 3.14648 9.16667 3.14648C5.48477 3.14648 2.5 6.13125 2.5 9.81315C2.5 13.4951 5.48477 16.4798 9.16667 16.4798Z"
                          stroke="#1172EB"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.5 18.1465L13.875 14.5215"
                          stroke="#1172EB"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Pesquisar"
                      className="inputSearch"
                      maxLength={100}
                      onKeyPress={handleSearch}
                      onBlur={handleSearch}
                    />
                  </div>
                  <div style={iconSettingsContainer}>
                    <FiSettings
                      size={23}
                      color="#476EE6"
                      onClick={togglePostModalConfiguracao}
                    />
                  </div>
                </div>
              </div>
              <Link
                className="buttonNewSupplierDesktop"
                onClick={
                  !selectedAllCheckbox
                    ? togglePostModalNewTerceiro
                    : handleDeleteAll
                }
                style={!selectedAllCheckbox ? newTerceiro : deleteAllItems}
              >
                {!selectedAllCheckbox ? "Novo terceiro" : "Excluir"}
              </Link>
              <Link
                className="buttonNewSupplierMobile"
                onClick={
                  !selectedAllCheckbox
                    ? togglePostModalNewTerceiro
                    : handleDeleteAll
                }
              >
                <BiPlus size={35} />
              </Link>
            </div>
            <div className="titleListTerceiros">
              <input
                type="checkbox"
                id="current-checkbox"
                style={checkbox}
                onChange={handleCheckbox}
              />
              <div className="contentTitleListTerceiros">
                <span>Nome</span>
                <span>E-mail</span>
                <span>Telefone</span>
                <span>Endereço</span>
              </div>
            </div>
            {!clients.length && itemMenu === 1 && (
              <>
                <strong className="noInfo">
                  Nenhum cliente adicionado a lista
                </strong>
              </>
            )}
            {!supplier.length && itemMenu === 2 && (
              <>
                <strong className="noInfo">
                  Nenhum Fornecedor adicionado a lista
                </strong>
              </>
            )}

            {searchItemsClient && itemMenu === 1 && (
              <div className="containerListagemTerceiros">
                {Object.values(searchItemsClient).map((client) => (
                  <div className="listagemTerceiros" key={client.id}>
                    <div className="containerBoxPhoto">
                      <input type="checkbox" style={checkbox} />
                      <div className="containerUsernamePhoto">
                        {typeof imgUrl === "undefined" ? (
                          <img style={imgUserStyle} src={avatar} alt="" />
                        ) : (
                          <img
                            style={imgUserStyle}
                            src={client.urlImg}
                            alt=""
                          />
                        )}
                        <span data-label="Nome">{client.name}</span>
                      </div>
                      <span className="campoListMoreVerticalMobile">
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() =>
                            togglePostModalEditOrDelete(
                              client.id,
                              client.name,
                              client.urlImg
                            )
                          }
                        />
                      </span>
                    </div>
                    <div className="contentListagemTerceiros">
                      <span data-label="E-mail" className="campoListEmail">
                        {client.email}
                      </span>
                      <span data-label="Telefone" className="campoList">
                        {client.telefone ? client.telefone : "-"}
                      </span>
                      <span data-label="Endereço" className="campoList">
                        {client.endereco}
                      </span>
                      <span className="campoListMoreVerticalDesktop">
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() =>
                            togglePostModalEditOrDelete(
                              client.id,
                              client.name,
                              client.urlImg
                            )
                          }
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchItemsSuplier && itemMenu === 2 && (
              <div className="containerListagemTerceiros">
                {Object.values(searchItemsSuplier).map((supp) => (
                  <div className="listagemTerceiros" key={supp.id}>
                    <div className="containerBoxPhoto">
                      <input type="checkbox" style={checkbox} />
                      <div className="containerUsernamePhoto">
                        {typeof imgUrl === "undefined" ? (
                          <img style={imgUserStyle} src={avatar} alt="" />
                        ) : (
                          <img style={imgUserStyle} src={supp.urlImg} alt="" />
                        )}
                        <span data-label="Nome">{supp.name}</span>
                      </div>
                      <span className="campoListMoreVerticalMobile">
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() =>
                            togglePostModalEditOrDelete(
                              supp.id,
                              supp.name,
                              supp.urlImg
                            )
                          }
                        />
                      </span>
                    </div>
                    <div className="contentListagemTerceiros">
                      <span data-label="E-mail" className="campoListEmail">
                        {supp.email}
                      </span>
                      <span data-label="Telefone" className="campoList">
                        {supp.telefone ? supp.telefone : "-"}
                      </span>
                      <span data-label="Endereço" className="campoList">
                        {supp.endereco}
                      </span>
                      <span className="campoListMoreVerticalDesktop">
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() =>
                            togglePostModalEditOrDelete(
                              supp.id,
                              supp.name,
                              supp.urlImg
                            )
                          }
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {isClients && !searchItemsClient && (
              <div className="containerListagemTerceiros">
                {Object.values(clients).map((client) => (
                  <div className="listagemTerceiros" key={client.id}>
                    <div className="containerBoxPhoto">
                      <input type="checkbox" style={checkbox} />
                      <div className="containerUsernamePhoto">
                        {typeof imgUrl === "undefined" ? (
                          <img style={imgUserStyle} src={avatar} alt="" />
                        ) : (
                          <img
                            style={imgUserStyle}
                            src={client.urlImg}
                            alt=""
                          />
                        )}
                        <span className="nameUser" data-label="Nome">
                          {client.name}
                        </span>
                      </div>

                      <span className="campoListMoreVerticalMobile">
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() =>
                            togglePostModalEditOrDelete(
                              client.id,
                              client.name,
                              client.urlImg
                            )
                          }
                        />
                      </span>
                    </div>
                    <div className="contentListagemTerceiros">
                      <span data-label="E-mail" className="campoListEmail">
                        {client.email}
                      </span>
                      <span data-label="Telefone" className="campoList">
                        {client.telefone ? client.telefone : "-"}
                      </span>
                      <span data-label="Endereço" className="campoList">
                        {client.endereco}
                      </span>
                      <span className="campoListMoreVerticalDesktop">
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() =>
                            togglePostModalEditOrDelete(
                              client.id,
                              client.name,
                              client.urlImg
                            )
                          }
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {isSupplier && !searchItemsSuplier && (
              <div className="containerListagemTerceiros">
                {Object.values(supplier).map((supp) => (
                  <div className="listagemTerceiros" key={supp.id}>
                    <div className="containerBoxPhoto">
                      <input type="checkbox" style={checkbox} />
                      <div className="containerUsernamePhoto">
                        {typeof imgUrl === "undefined" ? (
                          <img style={imgUserStyle} src={avatar} alt="" />
                        ) : (
                          <img style={imgUserStyle} src={supp.urlImg} alt="" />
                        )}
                        <span className="nameUser" data-label="Nome">
                          {supp.name}
                        </span>
                      </div>
                      <span className="campoListMoreVerticalMobile">
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() =>
                            togglePostModalEditOrDelete(
                              supp.id,
                              supp.name,
                              supp.urlImg
                            )
                          }
                        />
                      </span>
                    </div>
                    <div className="contentListagemTerceiros">
                      <span data-label="E-mail" className="campoListEmail">
                        {supp.email}
                      </span>
                      <span data-label="Telefone" className="campoList">
                        {supp.telefone ? supp.telefone : "-"}
                      </span>
                      <span data-label="Endereço" className="campoList">
                        {supp.endereco}
                      </span>
                      <span className="campoListMoreVerticalDesktop">
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() =>
                            togglePostModalEditOrDelete(supp.id, supp.name)
                          }
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        }
      />
      {showModalEditOrDelete && (
        <Modal
          larguraAltura={"modalEditOrDelete"}
          close={togglePostModalEditOrDelete}
        >
          <div style={modal_header}>
            <h3>Ações</h3>
            <FiX
              size={22}
              style={{ cursor: "pointer" }}
              onClick={togglePostModalEditOrDelete}
            />
          </div>

          <div className="modal-body">
            <div
              style={editar_terceiro}
              className="editar-terceiro"
              onClick={() => togglePostModalEdit()}
            >
              <h2>Editar terceiro</h2>
            </div>

            <div
              style={excluir_terceiro}
              className="excluir-terceiro"
              onClick={togglePostSubModal}
            >
              <h2>Excluir terceiro</h2>
            </div>
          </div>
        </Modal>
      )}

      {showSubModal && (
        <SubModal
          conteudo={nameItem}
          closeModal={closeModals}
          excluirItem={deleteTerceiroModalContent}
        />
      )}

      {showModalEdit && (
        <>
          <Modal
            larguraAltura={"modalEditTerceiro"}
            close={togglePostModalEdit}
          >
            <div style={modal_header}>
              <div style={fixEditarTerceiro}>
                <FiX
                  size={22}
                  style={{ cursor: "pointer" }}
                  onClick={togglePostModalEdit}
                />
                Editar Terceiro
              </div>
              <div style={title_header}>
                <Button
                  conteudo="Editar"
                  handle={(e) => updateTerceiroModalContent(e)}
                  buttonStyle={button}
                />
              </div>
            </div>
            <div style={containerStyleImgUserModal}>
              <label for="avatar">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  {exibeImagemModal ? (
                    <img className="imgStyle" src={exibeImagemModal} alt="" />
                  ) : (
                    <img className="imgStyle" src={avatar} alt="" />
                  )}
                  <MdAddAPhoto
                    className="iconImgUserModal"
                    color="#fff"
                    size={30}
                  />
                  <input
                    style={file_input}
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                  />
                </div>
              </label>
            </div>
            <form className="formNewTerceiro">
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  Nome do terceiro
                </label>
                <input
                  onChange={(e) => setUpdateTerceiroNome(e.target.value)}
                  value={updateTerceiroNome}
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  Telefone
                </label>
                <input
                  onChange={(e) => setUpdateTerceiroTelefone(e.target.value)}
                  value={updateTerceiroTelefone}
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  Tipo
                </label>
                <select
                  value={updateTerceiroTipo}
                  onChange={(e) => setUpdateTerceiroTipo(e.target.value)}
                  style={select}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Fornecedor">Fornecedor</option>
                </select>
              </div>
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  E-mail
                </label>
                <input
                  onChange={(e) => setUpdateTerceiroEmail(e.target.value)}
                  value={updateTerceiroEmail}
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  Endereço
                </label>
                <input
                  onChange={(e) => setUpdateTerceiroEndereco(e.target.value)}
                  value={updateTerceiroEndereco}
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
            </form>
          </Modal>
        </>
      )}
      {showModalNewTerceiro && (
        <>
          <Modal
            larguraAltura={"modalNewTerceiro"}
            close={togglePostModalNewTerceiro}
          >
            <div style={modal_header}>
              <div style={fixEditarTerceiro}>
                <FiX
                  size={22}
                  style={{ cursor: "pointer" }}
                  onClick={togglePostModalNewTerceiro}
                />
                Criar Terceiro
              </div>
              <div style={title_header}>
                <Button
                  conteudo="Criar"
                  handle={(e) => newTerceiroModalContent(e)}
                  buttonStyle={button}
                />
              </div>
            </div>
            <div style={containerStyleImgUserModal}>
              <label for="avatar">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  {!exibeImagemModal ? (
                    <img className="imgStyle" src={avatar} alt="" />
                  ) : (
                    <img className="imgStyle" src={exibeImagemModal} alt="" />
                  )}
                  <MdAddAPhoto
                    className="iconImgUserModal"
                    color="#fff"
                    size={30}
                  />
                  <input
                    style={file_input}
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                  />
                </div>
              </label>
              <br />
            </div>
            <form className="formNewTerceiro">
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  Nome do terceiro
                </label>
                <input
                  onChange={(e) => setNovoTerceiroNome(e.target.value)}
                  value={novoTerceiroNome}
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  Telefone
                </label>
                <input
                  onChange={(e) => setNovoTerceiroTelefone(e.target.value)}
                  value={novoTerceiroTelefone}
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  Tipo
                </label>
                <select
                  onChange={(e) => setNovoTerceiroTipo(e.target.value)}
                  value={novoTerceiroTipo}
                  style={select}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Fornecedor">Fornecedor</option>
                </select>
              </div>
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  E-mail
                </label>
                <input
                  onChange={(e) => setNovoTerceiroEmail(e.target.value)}
                  value={novoTerceiroEmail}
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} htmlFor="nome">
                  Endereço
                </label>
                <input
                  onChange={(e) => setNovoTerceiroEndereco(e.target.value)}
                  value={novoTerceiroEndereco}
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
            </form>
          </Modal>
        </>
      )}
      {showModalConfiguracao && (
        <>
          <Modal
            larguraAltura={"modalConfig"}
            close={togglePostModalConfiguracao}
          >
            <div style={modal_header}>
              <div style={fixEditarTerceiro}>
                <FiX
                  size={22}
                  style={{ cursor: "pointer" }}
                  onClick={togglePostModalConfiguracao}
                />
                Configuração
              </div>
              <div style={title_header}>
                <Button conteudo="Editar" buttonStyle={button} />
              </div>
            </div>

            <div style={menuNavContainer}>
              <div style={menuNavModal}>
                <Link
                  className={itemMenuModal === 1 ? "itemModal active" : "item"}
                  onClick={() => setItemMenuModal(1)}
                >
                  Clientes
                </Link>
                <Link
                  className={itemMenuModal === 2 ? "itemModal active" : "item"}
                  onClick={() => setItemMenuModal(2)}
                >
                  Fornecedores
                </Link>
              </div>
            </div>

            <form style={formSettings}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {newFieldTable.map((field, index) => (
                  <div key={index} style={containerQtdNumeroCampo}>
                    <div style={qtdNumeroCampo}>1</div>
                    <div style={containerInput}>
                      <label style={label} htmlFor="nome">
                        Nome do campo
                      </label>
                      <div
                        style={{
                          height: "100% ",
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        <input
                          style={inputModalSettings}
                          type="text"
                          id="nome"
                          name="nome"
                          placeholder="Insira seu nome"
                        />
                        <RiDeleteBin6Line
                          style={{ cursor: "pointer" }}
                          size={25}
                          color="#555555"
                          onClick={() => removeField(index)}
                        />
                      </div>
                      <div style={containerCheckboxModal}>
                        <input style={checkboxModal} type="checkbox" />O campo é
                        obrigatório?
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  onClick={addFiledModalConfig}
                  style={{
                    fontWeight: "500",
                    marginTop: "19px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "100%",
                    color: "#476EE6",
                    cursor: 'pointer',
                  }}
                >
                  <BiPlus size={18} />
                  Adicionar novo campo
                </div>
              </div>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
}
