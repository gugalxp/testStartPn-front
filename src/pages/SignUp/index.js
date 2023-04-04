import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import Button from "../../components/Button";
import Logo from "../../components/Logo";
import TitlePrimary from "../../components/TitlePrimary";
import BeforeLoggerColumnLayout from "../../layouts/BeforeLoggerColumnLayout";
import { toast } from "react-toastify";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const { signUp } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmaPassword, setShowConfirmaPassword] = useState(false);
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    if (email && password && confirmedPassword && name) {
      if (checkboxSelected) {
        const isRegister = await signUp(
          email,
          password,
          confirmedPassword,
          name
        );
        console.log(isRegister);
        if (isRegister) {
          history.push("/login");
        }
      } else {
        toast.info("Confirme o termo de privacidade!")
      }
    } else {
      toast.info("Preencha os campos vazios!")
    }
  }

  function handleCheckbox() {
    setCheckboxSelected(!checkboxSelected);

    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (checkbox.id === "current-checkbox") {
        console.log("CHECK", checkbox.checked);
      }
    });
  }

  const form = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, auto)",
    gap: "1rem",
    marginBottom: "35.4px",
  };

  const containerInput = {
    display: "flex",
    flexDirection: "column",
  };

  const input = {
    borderRadius: "10px",
    width: "290px",
    height: "50.06px",
    border: "1px solid #d7d7d7",
    background: "#fff",
    padding: "10px",
  };

  const label = {
    marginBottom: "14.6px",
    color: "#000000",
    fontWeight: "400",
    fontSize: "14px",
  };

  const containerTitleTermosPrivacidade = {
    marginBottom: "21.3px",
  };

  const titleTermoPrivacidade = {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "600",
  };

  const containerConfirmaTermosPrivacidade = {
    marginBottom: "6.1px",
  };

  const inputCheckbox = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2em",
    fontSize: "13px",
    fontWeight: "500",
    marginLeft: "10px",
    cursor: "pointer",
    gap: "10px",
    width: "561px",
  };

  const containerTermosPrivacidade = {
    marginBottom: "20px",
  };

  const lerTermosPrivacidade = {
    color: "#476ee6",
    cursor: "pointer",
    marginLeft: "2em",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "500",
  };

  const jaTemConta_Logar = {
    color: "#476ee6",
    cursor: "pointer",
    fontWeight: "500",
  };

  const jaTemConta = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "1em",
    gap: "15px",
    alignItems: "center",
    fontWeight: "500",
    color: "#3C3C43",
    lineHeight: "22.5px",
    fontSize: "15px",
    textAlign: "center",
  };

  const containerButton = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const button = {
    background: "#476ee6",
    border: "none",
    width: "180px",
    height: "45.37px",
    borderRadius: "60px",
    color: "#fff",
    lineHeight: "20px",
    fontWeight: "600",
    fontSize: "15px",
    fontStyle: "normal",
  };

  const containerInputIcon = {
    position: "relative",
  };

  const icon = {
    position: "absolute",
    right: "3%",
    top: "25%",
    cursor: "pointer",
  };

  return (
    <div className="containerCadastro">
      <BeforeLoggerColumnLayout
        colum2Data={
          <div>
            <Logo containerLogo={{ width: "100%", marginBottom: "25px" }} />
            <TitlePrimary
              containerTitle={{ fontStyle: "normal" }}
              conteudo="Cadastrar"
            />
            <form style={form}>
              <div style={containerInput}>
                <label style={label} for="name">
                  Nome
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  style={input}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Insira seu nome"
                />
              </div>

              <div style={containerInput}>
                <label style={label} for="email">
                  E-mail
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  style={input}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Insira um e-mail"
                />
              </div>

              <div style={containerInput}>
                <label style={label} for="senha">
                  Senha
                </label>
                <div style={containerInputIcon}>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    style={input}
                    type={showPassword ? "text" : "password"}
                    id="senha"
                    name="senha"
                    placeholder="Insira senha"
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

              <div style={containerInput}>
                <label style={label} for="confirmacao-senha">
                  Confirmação de Senha
                </label>
                <div style={containerInputIcon}>
                  <input
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    style={input}
                    type={showConfirmaPassword ? "text" : "password"}
                    id="confirmacao-senha"
                    name="confirmacao-senha"
                    placeholder="Confirma senha"
                  />
                  {showConfirmaPassword ? (
                    <BsEyeSlash
                      style={icon}
                      size={24}
                      onClick={() =>
                        setShowConfirmaPassword(!showConfirmaPassword)
                      }
                    />
                  ) : (
                    <BsEye
                      style={icon}
                      size={24}
                      onClick={() =>
                        setShowConfirmaPassword(!showConfirmaPassword)
                      }
                    />
                  )}
                </div>
              </div>
            </form>
            <div style={containerTitleTermosPrivacidade}>
              <strong style={titleTermoPrivacidade}>
                Termos de uso e privacidade
              </strong>
            </div>
            <div style={containerConfirmaTermosPrivacidade}>
              <label style={inputCheckbox} for="current-checkbox">
                <input
                  type="checkbox"
                  id="current-checkbox"
                  onChange={handleCheckbox}
                />
                Ao clicar neste botão, eu concordo com os termos de uso de
                privacidade da nosa empresa.
              </label>
            </div>
            <div style={containerTermosPrivacidade}>
              <a style={lerTermosPrivacidade}>Termos de uso e privacidade</a>
            </div>
            <Button
              handle={handleRegister}
              containerButton={containerButton}
              buttonStyle={button}
              conteudo="Cadastrar"
            ></Button>
            <div style={jaTemConta}>
              Já tem uma conta?
              <Link style={jaTemConta_Logar} to="/login">
                Login
              </Link>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default SignUp;
