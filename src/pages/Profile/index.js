import { useState, useContext, useEffect } from "react";
import Title from "../../components/Title";
import avatar from "../../assets/images/avatar.png";

import firebase, { storage } from "../../services/firebaseConnection";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../context/auth";
import DashboardColumnLayout from "../../layouts/DashboardColumnLayout";
import { MdAddAPhoto } from "react-icons/md";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Button from "../../components/Button";

import { FiSettings, FiUpload } from "react-icons/fi";

export default function Profile() {
  const { nameUserAuth, updateUserData, userAuth, telefoneUser } =
    useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState();
  const [progress, setProgress] = useState(0);

  const [nome, setNome] = useState(nameUserAuth);
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState(telefoneUser);
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUrl = localStorage.getItem(`imgUrl_${userAuth}`);
    if (storedUrl) {
      setImgUrl(storedUrl);
    }
  });

  function handleUpdateDataUser() {
    updateUserData(nome, email, telefone, password);
  }

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
          setImgUrl(url);
          localStorage.setItem(`imgUrl_${userAuth}`, url); // adiciona a URL ao localStorage
        });
      }
    );
  }

  const form_profile = {
    background: "#ffffff",
    border: "1px solid #D7D7D7",
    width: "713px",
    maxWidth: "713px",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    marginTop: "-5px",
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
    cursor: "pointer",
  };

  const iconImgUserModal = {
    position: "absolute",
    top: "230px",
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
    lineHeight: "30px",
    color: "#fff",
    width: "180px",
    height: "47px",
    border: "1px solid #D7D7D7",
    borderRadius: "60px",
    marginBottom: "20px",
    marginTop: "20px",
  };

  const label = {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
    marginBottom: "11px",
    color: "#000000",
    width: "100%",
  };

  const input = {
    width: "315px",
    borderRadius: "7px",
    height: "50px",
    border: "1px solid #d7d7d7",
    background: "#fff",
    padding: "10px",
    color: "#060606",
  };

  const containerInput = {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "2px",
  };

  const content_Input = {
    height: "600px",
    padding: "15px",
    gap: "15px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, auto)",
    flexWrap: "wrap",
  };

  const containerInputIcon = {
    position: "relative",
  };

  const icon = {
    position: "absolute",
    right: "3%",
    top: "45%",
    cursor: "pointer",
  };

  return (
    <div>
      <DashboardColumnLayout
        colum2Data={
          <div>
            <Title nameUser={nameUserAuth} page="Minha conta"></Title>
            <div style={container_perfil}>
              <form style={form_profile} onSubmit={handleUpload}>
                <div style={containerStyleImgUserModal}>
                  <label className="label-avatar" for="avatar">
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
                </div>
                <div style={content_Input}>
                  <div style={containerInput}>
                    <label style={label} htmlFor="nome">
                      Nome
                    </label>
                    <input
                      onChange={(e) => setNome(e.target.value)}
                      value={nome}
                      style={input}
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Insira seu nome"
                    />
                  </div>
                  <div style={containerInput}>
                    <label style={label} htmlFor="nome">
                      E-mail
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      style={input}
                      type="email"
                      id="nome"
                      name="nome"
                      placeholder="Insira seu e-mail"
                    />
                  </div>
                  <div style={containerInput}>
                    <label style={label} htmlFor="nome">
                      Telefone
                    </label>
                    <input
                      onChange={(e) => setTelefone(e.target.value)}
                      value={telefone}
                      style={input}
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Insira seu telefone"
                    />
                  </div>

                  <div style={containerInput}>
                    <label style={label} htmlFor="nome">
                      Senha
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      style={input}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Insira sua senha"
                    />
                    {showPassword ? (
                      <BsEyeSlash
                        style={icon}
                        size={24}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <BsEye
                        style={icon}
                        size={24}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                </div>

                <Button
                  handle={handleUpdateDataUser}
                  buttonStyle={button}
                  conteudo="Salvar"
                  type="submit"
                >
                  Salvar
                </Button>
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
