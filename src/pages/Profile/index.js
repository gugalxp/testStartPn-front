import { useState, useContext, useEffect } from "react";
import Title from "../../components/Title";
import avatar from "../../assets/images/avatar.png";

import firebase, { storage } from "../../services/firebaseConnection";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../context/auth";
import DashboardColumnLayout from "../../layouts/DashboardColumnLayout";
import { MdAddAPhoto } from "react-icons/md";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IoIosArrowDropleft } from "react-icons/io";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

import { FiSettings, FiUpload } from "react-icons/fi";

export default function Profile() {
  const {
    nameUserAuth,
    updateUserData,
    userAuth,
    telefoneUser,
    urlImgUserAuth,
    setUrlImgUserAuth,
  } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);

  const [nome, setNome] = useState(nameUserAuth);
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState(telefoneUser);
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const imgUrlPerfilLocalStorage = localStorage.getItem("@urlImgPerfil"); // adiciona a URL ao localStorage
    setUrlImgUserAuth(imgUrlPerfilLocalStorage);
    console.log("RESPONSE IMG profile: ", urlImgUserAuth)
  });

  async function handleUpload(event) {
    event.preventDefault();
    
    const file = event.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `images/users/${userAuth}/${file.name}`);

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
          setUrlImgUserAuth(url);
          localStorage.setItem("@urlImgPerfil", url); // adiciona a URL ao localStorage
          updateUserData(nome, email, telefone, password, url);
        });
      }
    );
  }

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
    cursor: "pointer",
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
    lineHeight: "30px",
    color: "#fff",
    width: "180px",
    height: "47px",
    border: "1px solid #D7D7D7",
    borderRadius: "60px",
    marginBottom: "20px",
    marginTop: "30px",
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
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "2px",
  };

  return (
    <div>
      <div className="titleShowProfile">
        <Link to="/dashboard">
          <IoIosArrowDropleft size={30} color="#476EE6" />
        </Link>
        <span
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          Minha conta
        </span>
      </div>
      <DashboardColumnLayout
        colum2Data={
          <div>
            <div className="showTitle">
              <Title nameUser={nameUserAuth} page="Minha conta"></Title>
            </div>
            <div style={container_perfil}>
              <form className="form_profile" onSubmit={handleUpload}>
                <div className="containerStyleImgUserModal">
                  <label className="label-avatar" for="avatar">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                      }}
                    >
                      {typeof urlImgUserAuth === "undefined" || urlImgUserAuth === null ? (
                        <img style={imgStyle} src={avatar} alt="" />
                      ) : (
                        <img style={imgStyle} src={urlImgUserAuth} alt="" />
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
                      />
                    </div>
                  </label>
                </div>
                <div className="content_Input">
                  <div className="containerInputPerfil" style={containerInput}>
                    <label style={label} htmlFor="nome">
                      Nome
                    </label>
                    <input
                      onChange={(e) => setNome(e.target.value)}
                      value={nome}
                      className="input"
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Insira seu nome"
                    />
                  </div>
                  <div className="containerInputPerfil" style={containerInput}>
                    <label style={label} htmlFor="nome">
                      E-mail
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="input"
                      type="email"
                      id="nome"
                      name="nome"
                      placeholder="Insira seu e-mail"
                    />
                  </div>
                  <div className="containerInputPerfil" style={containerInput}>
                    <label style={label} htmlFor="nome">
                      Telefone
                    </label>
                    <input
                      onChange={(e) => setTelefone(e.target.value)}
                      value={telefone}
                      className="input"
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Insira seu telefone"
                    />
                  </div>

                  <div className="containerInputPerfil" style={containerInput}>
                    <label style={label} htmlFor="nome">
                      Senha
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="input"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Insira sua senha"
                    />
                    {showPassword ? (
                      <BsEyeSlash
                        className="iconViewPerfil"
                        size={24}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <BsEye
                        className="iconViewPerfil"
                        size={24}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                </div>

                <Button buttonStyle={button} conteudo="Salvar" type="submit">
                  Salvar
                </Button>
              </form>
            </div>
            <br />
            {/* {!imgUrl && <progress value={progress}></progress>} */}
          </div>
        }
      />
    </div>
  );
}
