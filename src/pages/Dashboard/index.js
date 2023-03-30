import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import SubModal from "../../components/Modals/SubModal";
import Button from "../../components/Button";
import Modal from "../../components/Modals/Modal";
import Title from "../../components/Title";
import { FiMoreVertical, FiSettings } from "react-icons/fi";
import { MdAddAPhoto } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

import userImg from "../../assets/images/user.png";
import AvatarImg from "../../assets/images/avatar.png";
import DashboardColumnLayout from "../../layouts/DashboardColumnLayout";

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

  const [idItem, setIdItem] = useState();

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
  } = useContext(AuthContext);

  function newTerceiroModalContent(e) {
    e.preventDefault();
    createTerceiroData(
      novoTerceiroNome,
      novoTerceiroEmail,
      novoTerceiroTelefone,
      novoTerceiroEndereco,
      novoTerceiroTipo,
      idItem
    );

    setNovoTerceiroNome("");
    setNovoTerceiroEmail("");
    setNovoTerceiroTelefone("");
    setNovoTerceiroEndereco("");
    setNovoTerceiroTipo("");
  }

  function updateTerceiroModalContent(e) {
    e.preventDefault();
    updateTerceiroData(
      updateTerceiroNome,
      updateTerceiroEmail,
      updateTerceiroTelefone,
      updateTerceiroEndereco,
      updateTerceiroTipo,
      idItem
    );

    setUpdateTerceiroNome("");
    setUpdateTerceiroEmail("");
    setUpdateTerceiroTelefone("");
    setUpdateTerceiroEndereco("");
    setUpdateTerceiroTipo("");
  }

  function deleteTerceiroModalContent() {
    closeModals();
    deleteTerceiroData(
      idItem,
      deleteTerceiroTipo
    );
  }
  
  function togglePostModalConfiguracao() {
    setShowModalConfiguracao(!showModalConfiguracao); //troca de true para false
  }

  function togglePostModalNewTerceiro() {
    setShowModalNewTerceiro(!showModalNewTerceiro); //troca de true para false
  }

  function togglePostModalEditOrDelete(id) {
    setIdItem(id);
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

  const containerNav = {
    display: "flex",
    justifyContent: "space-between",
  };

  const containerMenuNav = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
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

  const iconSettingsContainer = {
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
    width: "240px",
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

  const iconImgUserModal = {
    position: "absolute",
    top: "118px",
    right: "260",
    background: "#476EE6",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "5px",
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
  };

  const campoList = {
    width: "33%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    wordBreak: "break-all",
  };

  const campoListEmail = {
    ...campoList,
    justifyContent: "flex-start !important",
  };

  const containerUsernamePhoto = {
    width: "33%",
    display: "flex",
    alignItems: "center",
    gap: "30px",
    marginLeft: "4em",
  };

  const inputSearch = {
    background: "white",
    height: "45px",
    width: "290px",
    borderRadius: "60px",
    outline: "none",
    paddingLeft: "50px",
    border: "1.9px solid #d7d7d7",
  };

  const containerInputSearch = {
    display: "flex",
    position: "relative",
  };

  return (
    <div>
      <DashboardColumnLayout
        colum2Data={
          <div>
            <Title nameUser={nameUserAuth} userImg={userImg} page="Terceiros">
              <img src={userImg} alt="" />
            </Title>
            <div style={containerNav}>
              <div style={containerMenuNav}>
                <div style={menuNav}>
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
                  <div
                    onClick={handleSearch}
                    style={{ position: "absolute", left: "15px", top: "6px" }}
                  >
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
                    className="inputLogin"
                    maxLength={100}
                    style={inputSearch}
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
              <Link onClick={togglePostModalNewTerceiro} style={newTerceiro}>
                Novo Terceiro
              </Link>
            </div>
            <div className="titleListTerceiros">
              <input type="checkbox" style={checkbox} />
              <div className="contentTitleListTerceiros">
                <span>Nome</span>
                <span>E-mail</span>
                <span>Telefone</span>
                <span>Endereço</span>
              </div>
            </div>
            {searchItemsClient && itemMenu === 1 && (
              <>
                {Object.values(searchItemsClient).map((client) => (
                  <div className="listagemTerceiros" key={client.id}>
                    <input type="checkbox" style={checkbox} />
                    <div style={containerUsernamePhoto}>
                      <img style={imgUserStyle} src={userImg} alt="" />
                      <span>{client.name}</span>
                    </div>
                    <div className="contentListagemTerceiros">
                      <span style={campoListEmail}>{client.email}</span>
                      <span style={campoList}>{client.telefone}</span>
                      <span style={campoList}>{client.endereco}</span>
                      <span style={campoList}>
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() => togglePostModalEditOrDelete(client.id)}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
            {searchItemsSuplier && itemMenu === 2 && (
              <>
                {Object.values(searchItemsSuplier).map((supp) => (
                  <div className="listagemTerceiros" key={supp.id}>
                    <input type="checkbox" style={checkbox} />
                    <div style={containerUsernamePhoto}>
                      <img style={imgUserStyle} src={userImg} alt="" />
                      <span>{supp.name}</span>
                    </div>
                    <div className="contentListagemTerceiros">
                      <span style={campoListEmail}>{supp.email}</span>
                      <span style={campoList}>{supp.telefone}</span>
                      <span style={campoList}>{supp.endereco}</span>
                      <span style={campoList}>
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() => togglePostModalEditOrDelete(supp.id)}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
            {isClients && !searchItemsClient && (
              <>
                {Object.values(clients).map((client) => (
                  <div className="listagemTerceiros" key={client.id}>
                    <input type="checkbox" style={checkbox} />
                    <div style={containerUsernamePhoto}>
                      <img style={imgUserStyle} src={userImg} alt="" />
                      <span>{client.name}</span>
                    </div>
                    <div className="contentListagemTerceiros">
                      <span style={campoListEmail}>{client.email}</span>
                      <span style={campoList}>{client.telefone}</span>
                      <span style={campoList}>{client.endereco}</span>
                      <span style={campoList}>
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() => togglePostModalEditOrDelete(client.id)}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
            {isSupplier && !searchItemsSuplier && (
              <>
                {Object.values(supplier).map((supp) => (
                  <div className="listagemTerceiros" key={supp.id}>
                    <input type="checkbox" style={checkbox} />
                    <div style={containerUsernamePhoto}>
                      <img style={imgUserStyle} src={userImg} alt="" />
                      <span>{supp.name}</span>
                    </div>
                    <div className="contentListagemTerceiros">
                      <span style={campoListEmail}>{supp.email}</span>
                      <span style={campoList}>{supp.telefone}</span>
                      <span style={campoList}>{supp.endereco}</span>
                      <span style={campoList}>
                        <FiMoreVertical
                          size={20}
                          style={{ cursor: "pointer" }}
                          color="#000"
                          onClick={() => togglePostModalEditOrDelete(supp.id)}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        }
      />
      {showModalEditOrDelete && (
        <Modal close={togglePostModalEditOrDelete} width="375px" height="275px">
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
        <SubModal conteudo={"Gustavo Arruda"} closeModal={closeModals} excluirItem={deleteTerceiroModalContent} />
      )}

      {showModalEdit && (
        <>
          <Modal width="605px" height="566px" close={togglePostModalEdit}>
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
              <img style={styleImgUserModal} src={userImg} alt="Foto usuário" />
              <MdAddAPhoto style={iconImgUserModal} color="#fff" size={30} />
            </div>
            <form style={form}>
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
            width="605px"
            height="566px"
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
              <img
                style={styleImgUserModal}
                src={AvatarImg}
                alt="Foto usuário"
              />
              <MdAddAPhoto style={iconImgUserModal} color="#fff" size={30} />
            </div>
            <form style={form}>
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
            width="340px"
            height="600px"
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
                <div style={containerQtdNumeroCampo}>
                  <div style={qtdNumeroCampo}>1</div>
                  <div style={containerInput}>
                    <label style={label} htmlFor="nome">
                      Nome do campo
                    </label>
                    <input
                      style={inputModalSettings}
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Insira seu nome"
                    />
                  </div>
                </div>
                <div style={containerCheckboxModal}>
                  <input style={checkboxModal} type="checkbox" />O campo é
                  obrigatório?
                </div>
              </div>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
}
