import { useState, useContext, useEffect } from "react";
import Title from "../../components/Title";
import avatar from "../../assets/images/avatar.png";

import firebase, { storage } from "../../services/firebaseConnection";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../context/auth";
import DashboardColumnLayout from "../../layouts/DashboardColumnLayout";
import { MdAddAPhoto } from "react-icons/md";

import { FiSettings, FiUpload } from "react-icons/fi";

export default function Profile() {
  const { nameUserAuth } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const storedUrl = localStorage.getItem("imgUrl");
    if (storedUrl) {
      setImgUrl(storedUrl);
    }
  });

  async function handleUpload(event) {
    event.preventDefault();

    const file = event.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);

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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
          localStorage.setItem("imgUrl", url); // adiciona a URL ao localStorage
        });
      }
    );
  }

  const form_profile = {
    background: "#ffffff",
    border: "1px solid #D7D7D7",
    width: "713px",
    maxWidth: "713px",
    height: "558px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
  };

  const container_perfil = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imgStyle = {
    width: "115px",
    height: "115px",
    borderRadius: "50%",
    objectFit: "cover",
    marginTop: "30px",
  };

  const iconImgUserModal = {
    position: "absolute",
    top: "265px",
    right: "515px",
    background: "#476EE6",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "5px",
  };

  const containerStyleImgUserModal = {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  };

  const file_input = {
    opacity: 0,
    position: "absolute",
    zIndex: -1,
    display: "none",
  };

  const button = {
    background: "#476ee6",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "24px",
    color: "#fff",
    width: "190px",
    height: "43px",
    border: "1px solid #D7D7D7",
    borderRadius: "60px",
    marginBottom: "20px",
  };

  const container_Buttun = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  const content_Input = {
    height: "310px",
    width: "100%",
    padding: "15px",
    gap: "10px",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, auto)",
    flexWrap: "wrap",
  };

  return (
    <div>
      <DashboardColumnLayout
        colum2Data={
          <div>
            <Title nameUser={nameUserAuth} page="Minha conta"></Title>
            <div style={container_perfil}>
              <form style={form_profile} onSubmit={handleUpload}>
                <label
                  style={containerStyleImgUserModal}
                  className="label-avatar"
                  for="avatar"
                >
                  {typeof imgUrl === "undefined" ? (
                    <img style={imgStyle} src={avatar} alt="" />
                  ) : (
                    <img style={imgStyle} src={imgUrl} alt="" />
                  )}
                  <MdAddAPhoto
                    style={iconImgUserModal}
                    color="#fff"
                    size={30}
                  />
                  <input
                    style={file_input}
                    id="avatar"
                    type="file"
                    accept="image/*"
                  />
                </label>
                <div style={content_Input}>
                  <div style={containerInput}>
                    <label style={label} htmlFor="nome">
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
                    <label style={label} htmlFor="nome">
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
                    <label style={label} htmlFor="nome">
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
                    <label style={label} htmlFor="nome">
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
                </div>

                <button style={button} type="submit">
                  Enviar
                </button>
              </form>
            </div>
            <br />
            {!imgUrl && <progress value={progress}></progress>}
          </div>
        }
      />
    </div>
  );
}
