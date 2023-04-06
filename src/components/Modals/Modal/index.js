
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

  return (
    <>
      <div style={fade} onClick={close}></div>
      <div className="modalStyle">
        {children}
      </div>

    </>
  );
}
