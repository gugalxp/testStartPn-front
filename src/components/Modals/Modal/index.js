
import { FiX } from "react-icons/fi";
import SubModal from "../SubModal";
import { useState } from "react";

export default function Modal({ conteudo, close, width, height, children }) {
  
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
    width: width,
    height: height,
    boxShadow: '0 0 15px 5px #1b1a1a23',
  }

  return (
    <>
      <div style={fade} onClick={close}></div>
      <div style={modalStyle}>
        {children}
      </div>

    </>
  );
}
