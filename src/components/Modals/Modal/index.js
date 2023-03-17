
import { FiX } from "react-icons/fi";
import DeleteModal from "../SubModal";
import { useState } from "react";

export default function EditOrDeleteModal({ close }) {
  
  const [showModalDeleteModal, setShowModalDeleteModal] = useState(false);


  function togglePostModal() {
    setShowModalDeleteModal(!showModalDeleteModal)
  }

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
  }

  const editar_terceiro = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '64px',
    color: '#030303',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '27px',
    borderBottom: '1px solid #D7D7D7',
    borderTop: '1px solid #D7D7D7',
    cursor: 'pointer',
  }

  const excluir_terceiro = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '64px',
    color: '#EA0000',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '27px',
    borderBottom: '1px solid #D7D7D7',
    cursor: 'pointer',
  }

  return (
    <>
      <div style={fade} onClick={close}></div>
      <div style={modalStyle}>
        <div style={modal_header}>
          <h3>Ações</h3>
          <FiX size={22} style={{ cursor: 'pointer' }}onClick={close}/>
        </div>

        <div className="modal-body">
          <div style={editar_terceiro} className="editar-terceiro">
              <h2>Editar terceiro</h2>
          </div>

          <div style={excluir_terceiro} className="excluir-terceiro" onClick={togglePostModal}>
              <h2>Excluir terceiro</h2>
          </div>
        </div>
      </div>
      {showModalDeleteModal && (
        <DeleteModal conteudo={"Gustavo Arruda"} close={close} />
      )}
    </>
  );
}
