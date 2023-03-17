
import { FiX } from "react-icons/fi";

import { useState, useContext } from "react";
import { AuthContext } from "../../../context/auth";


export default function SubModal({ conteudo, close }) {

  const { modal, isOpenModal } = useContext(AuthContext);

  const fade = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff93',
    zIndex: 5,
  }

  const modalStyle = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    backgroundColor: '#ffff',
    borderRadius: '20px',
    width: '375px',
    height: '275px',
    boxShadow: '0 0 15px 5px #1b1a1a23',
  }

  const modal_header = {
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #D7D7D7',
  }

  const title_header = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '27px',
  }

  const excluir = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '27px',
    background: '#FFE1E1',
    borderRadius: '50px',
    padding: '7px 17px',
    color: '#EA0000',
    cursor: 'pointer',
  }

  const confirm_delete = {
    width: '300px',
    height: '85px',
    textAlign: 'center',
  }

  const modal_body = {
    height: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px'
  }

  return (
    <>
      <div style={fade} onClick={close}></div>
      <div style={modalStyle}>
        <div style={modal_header}>
          <div style={title_header}>
            <FiX size={22} style={{ cursor: 'pointer' }}onClick={close}/>
            Excluir Terceiros
          </div>
          <div style={excluir}>Excluir</div>
        </div>

        <div style={modal_body}>
          <div  style={confirm_delete}>
              <p>Tem certeza que deseja excluir o cliente <strong>{conteudo}</strong> ? </p>
          </div>
        </div>
      </div>
    </>
  );
}
