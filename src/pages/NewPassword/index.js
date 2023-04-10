import ArteVisual from "../../components/ArteVisual";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TitlePrimary from "../../components/TitlePrimary";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Link, useHistory } from "react-router-dom";
import BeforeLoggerColumnLayout from "../../layouts/BeforeLoggerColumnLayout";
import { toast } from "react-toastify";

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState();
  const { newPasswordCreateForgotPassword } = useContext(AuthContext);
  const history = useHistory();

  function handleNewPassword(e) {
    e.preventDefault();
    if (
      newPassword === newPasswordConfirmed &&
      newPasswordConfirmed &&
      newPassword
    ) {
      let response = newPasswordCreateForgotPassword(newPassword);
      if (response) {
        history.push("/");
      }
    } else {
      history.push("/newPassword");
      toast.error("As senhas não conicidem.");
    }
  }

  const form = {
    display: "flex",
    maxWidth: "418px",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0",
    padding: "0",
  };

  const input = {
    width: "418px",
    height: "50.06px",
    borderRadius: "10px",
    border: "1px solid #d7d7d7",
    background: "#fff",
    fontSize: "14px",
    lineHeight: "20px",
    paddingLeft: "15px",
    fontWeight: "500",
    fontStyle: "normal",
  };

  const label = {
    marginBottom: "14px",
    color: "#000000",
    fontWeight: "400",
    lineHeight: "18.21px",
    letterSpacing: "0.202385px",
    fontSize: "14px",
    fontStyle: "normal",
    display: "flex",
  };

  const containerButton = {
    marginTop: "0",
  };

  const lembrouSenha = {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "20px",
    color: "#476ee6",
  };

  const button = {
    background: "#476ee6",
    border: "none",
    width: "180px",
    height: "48px",
    borderRadius: "60px",
    color: "#fff",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "27px",
  };

  return (
    <BeforeLoggerColumnLayout
      colum2Data={
        <form className="formNewPassword">
          <div className="containerLogoNewPassword">
            <Logo />
          </div>
          <div className="containerTitleNewPassword">
            <TitlePrimary conteudo="Crie uma nova senha" />
          </div>
          <p className="descriptionNewPassword">
            Preencha os campos abaixo com a nova senha que deseja cadastrar
          </p>
          <div className="containerInputNewSenha">
            <div className="contentInputNewPassword">
              <label style={label} for="email">
                Nova senha
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className="inputNewPassword"
                type="password"
                id="password"
                name="password"
                placeholder="Insira seu e-mail"
              />
            </div>
          </div>
          <div className="containerInputNewSenha">
            <div className="contentInputNewPassword">
              <label style={label} for="password">
                Confirmação de nova senha
              </label>
              <input
                onChange={(e) => setNewPasswordConfirmed(e.target.value)}
                className="inputNewPassword"
                type="password"
                id="password"
                name="password"
                placeholder="Insira seu e-mail"
              />
            </div>
          </div>
          <div className="containerForgotPassword">
            <Button
              handle={(e) => handleNewPassword(e)}
              type="submit"
              containerButton={containerButton}
              buttonStyle={button}
              conteudo="Criar senha"
            />
            <Link style={lembrouSenha} to="/">
              Lembrou da senha?
            </Link>
          </div>
        </form>
      }
    />
  );
}
