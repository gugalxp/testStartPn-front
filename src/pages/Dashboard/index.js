import "./dashboard.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import SubModal from "../../components/Modals/SubModal";
import Button from "../../components/Button";
import Modal from "../../components/Modals/Modal";
import Header from "../../components/Header";
import Title from "../../components/Title";
import InputSearchProject from "../../components/InputSearchProject";
import { FiMoreVertical, FiSettings } from "react-icons/fi";
import { MdAddAPhoto } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

import userImg from "../../assets/images/user.png";
import AvatarImg from "../../assets/images/avatar.png";

export default function Dashboard() {
  const [itemMenu, setItemMenu] = useState(1);
  const [itemMenuModal, setItemMenuModal] = useState(1);
  const [showModalEditOrDelete, setShowModalEditOrDelete] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalNewTerceiro, setShowModalNewTerceiro] = useState(false);
  const [showModalConfiguracao, setShowModalConfiguracao] = useState(false);

  function togglePostModalConfiguracao() {
    setShowModalConfiguracao(!showModalConfiguracao); //troca de true para false
  }

  function togglePostModalNewTerceiro() {
    setShowModalNewTerceiro(!showModalNewTerceiro); //troca de true para false
  }

  function togglePostModalEditOrDelete() {
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

  const containerUsernamePhoto = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
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

  return (
    <div>
      <Header />
      <div className="content">
        <Title nameUser="Gustavo Arruda" userImg={userImg} page="Terceiros">
          <img src={userImg} alt="" />
        </Title>
        <div style={containerNav}>
          <div style={containerMenuNav}>
            <div style={menuNav}>
              <Link
                className={itemMenu === 1 ? "item active" : "item"}
                onClick={() => setItemMenu(1)}
              >
                Clientes
              </Link>
              <Link
                className={itemMenu === 2 ? "item active" : "item"}
                onClick={() => setItemMenu(2)}
              >
                Fornecedores
              </Link>
            </div>
            <InputSearchProject placeholder="Pesquisar" />
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

        <div className="listagemTerceiros">
          <input type="checkbox" style={checkbox} />
          <div className="contentListagemTerceiros">
            <div style={containerUsernamePhoto}>
              <img style={imgUserStyle} src={userImg} alt="" />
              <span>Gustavo Arruda</span>
            </div>
            <span>gustavoleone3456@hotmail.com</span>
            <span>13 99636-4053</span>
            <span>Rua Treze, 140 - Guarujá SP</span>
            <span>
              <FiMoreVertical
                size={20}
                style={{ cursor: "pointer" }}
                color="#000"
                onClick={() => togglePostModalEditOrDelete()}
              />
            </span>
          </div>
        </div>
        <div className="listagemTerceiros">
          <input type="checkbox" style={checkbox} />
          <div className="contentListagemTerceiros">
            <div style={containerUsernamePhoto}>
              <img style={imgUserStyle} src={userImg} alt="" />
              <span>Gustavo Arruda</span>
            </div>
            <span>gustavoleone3456@hotmail.com</span>
            <span>13 99636-4053</span>
            <span>Rua Treze, 140 - Guarujá SP</span>
            <span>
              <FiMoreVertical size={20} color="#000" />
            </span>
          </div>
        </div>
        <div className="listagemTerceiros">
          <input type="checkbox" style={checkbox} />
          <div className="contentListagemTerceiros">
            <div style={containerUsernamePhoto}>
              <img style={imgUserStyle} src={userImg} alt="" />
              <span>Gustavo Arruda</span>
            </div>
            <span>gustavoleone3456@hotmail.com</span>
            <span>13 99636-4053</span>
            <span>Rua Treze, 140 - Guarujá SP</span>
            <span>
              <FiMoreVertical size={20} color="#000" />
            </span>
          </div>
        </div>
        <div className="listagemTerceiros">
          <input type="checkbox" style={checkbox} />
          <div className="contentListagemTerceiros">
            <div style={containerUsernamePhoto}>
              <img style={imgUserStyle} src={userImg} alt="" />
              <span>Gustavo Arruda</span>
            </div>
            <span>gustavoleone3456@hotmail.com</span>
            <span>13 99636-4053</span>
            <span>Rua Treze, 140 - Guarujá SP</span>
            <span>
              <FiMoreVertical size={20} color="#000" />
            </span>
          </div>
        </div>
        <div className="listagemTerceiros">
          <input type="checkbox" style={checkbox} />
          <div className="contentListagemTerceiros">
            <div style={containerUsernamePhoto}>
              <img style={imgUserStyle} src={userImg} alt="" />
              <span>Gustavo Arruda</span>
            </div>
            <span>gustavoleone3456@hotmail.com</span>
            <span>13 99636-4053</span>
            <span>Rua Treze, 140 - Guarujá SP</span>
            <span>
              <FiMoreVertical size={20} color="#000" />
            </span>
          </div>
        </div>
        <div className="listagemTerceiros">
          <input type="checkbox" style={checkbox} />
          <div className="contentListagemTerceiros">
            <div style={containerUsernamePhoto}>
              <img style={imgUserStyle} src={userImg} alt="" />
              <span>Gustavo Arruda</span>
            </div>
            <span>gustavoleone3456@hotmail.com</span>
            <span>13 99636-4053</span>
            <span>Rua Treze, 140 - Guarujá SP</span>
            <span>
              <FiMoreVertical size={20} color="#000" />
            </span>
          </div>
        </div>
        <div className="listagemTerceiros">
          <input type="checkbox" style={checkbox} />
          <div className="contentListagemTerceiros">
            <div style={containerUsernamePhoto}>
              <img style={imgUserStyle} src={userImg} alt="" />
              <span>Gustavo Arruda</span>
            </div>
            <span>gustavoleone3456@hotmail.com</span>
            <span>13 99636-4053</span>
            <span>Rua Treze, 140 - Guarujá SP</span>
            <span>
              <FiMoreVertical size={20} color="#000" />
            </span>
          </div>
        </div>
        <div className="listagemTerceiros">
          <input type="checkbox" style={checkbox} />
          <div className="contentListagemTerceiros">
            <div style={containerUsernamePhoto}>
              <img style={imgUserStyle} src={userImg} alt="" />
              <span>Gustavo Arruda</span>
            </div>
            <span>gustavoleone3456@hotmail.com</span>
            <span>13 99636-4053</span>
            <span>Rua Treze, 140 - Guarujá SP</span>
            <span>
              <FiMoreVertical size={20} color="#000" />
            </span>
          </div>
        </div>
      </div>
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
        <SubModal conteudo={"Gustavo Arruda"} close={closeModals} />
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
                <Button conteudo="Editar" buttonStyle={button} />
              </div>
            </div>
            <div style={containerStyleImgUserModal}>
              <img style={styleImgUserModal} src={userImg} alt="Foto usuário" />
              <MdAddAPhoto style={iconImgUserModal} color="#fff" size={30} />
            </div>
            <form style={form}>
              <div style={containerInput}>
                <label style={label} for="nome">
                  Nome do terceiro
                </label>
                <input
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} for="nome">
                  Telefone
                </label>
                <input
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} for="nome">
                  Tipo
                </label>
                <select style={select}>
                  <option value="Cliente">Cliente</option>
                  <option value="Fornecedor">Fornecedor</option>
                </select>
              </div>
              <div style={containerInput}>
                <label style={label} for="nome">
                  E-mail
                </label>
                <input
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} for="nome">
                  Endereço
                </label>
                <input
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
                <Button conteudo="Criar" buttonStyle={button} />
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
                <label style={label} for="nome">
                  Nome do terceiro
                </label>
                <input
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} for="nome">
                  Telefone
                </label>
                <input
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} for="nome">
                  Tipo
                </label>
                <select style={select}>
                  <option value="Cliente">Cliente</option>
                  <option value="Fornecedor">Fornecedor</option>
                </select>
              </div>
              <div style={containerInput}>
                <label style={label} for="nome">
                  E-mail
                </label>
                <input
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>
              <div style={containerInput}>
                <label style={label} for="nome">
                  Endereço
                </label>
                <input
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
                    <label style={label} for="nome">
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
