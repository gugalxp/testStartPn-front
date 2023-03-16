import "./dashboard.css";
import { useState, useEffect } from "react";

import Modal from "../../components/Modal";
import Header from "../../components/Header";
import Title from "../../components/Title";
import InputSearchProject from "../../components/InputSearchProject";
import { FiMoreVertical, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import firebase from "../../services/firebaseConnection";

import userImg from "../../assets/images/user.png";

const listRef = firebase
  .firestore()
  .collection("chamados")
  .orderBy("created", "desc");

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState(false);
  const [pageAtual, setPageAtual] = useState("");
  const [itemMenu, setItemMenu] = useState(1);

  // useEffect(() =>{
  //   setItemMenu();
  // }, [])

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
              <FiSettings size={23} color="#476EE6" />
            </div>
          </div>
          <Link to="/new" style={newTerceiro}>
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
      {/* 
      {showModal && (
        <Modal
        conteudo={detail}
        close={togglePostModal}
        />
      )} */}
    </div>
  );
}
