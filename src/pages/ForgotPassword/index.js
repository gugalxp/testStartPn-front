import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TitlePrimary from "../../components/TitlePrimary";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";
import BeforeLoggerColumnLayout from "../../layouts/BeforeLoggerColumnLayout";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { sendMail, setEmailSentConfirmed } = useContext(AuthContext);
  const history = useHistory();

  async function handleSendMail(e) {
    e.preventDefault();
    if (email) {
      setEmailSentConfirmed(email);
      let isEmail = await sendMail(email);
      if (isEmail) {
        history.push(`/emailSent`);
      }
    }
  }

  const containerLogo = {
    width: "100%",
    marginBottom: "39.26px",
    display: "flex",
  };

  const containerTitle = {
    width: "100%",
    marginBottom: "17px",
    display: "flex",
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "500",
    lineHeight: "3%",
    padding: "0",
  };

  const form = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0",
    padding: "0",
  };

  const label = {
    marginBottom: "14px",
    color: "#000000",
    fontWeight: "400",
    lineHeight: "18.21px",
    letterSpacing: "0.202385px",
    fontSize: "14px",
    fontStyle: "normal",
  };

  const containerInputEmail = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "51px",
    width: "100%",
  };

  const containerButton = {
    marginTop: "0",
  };

  const containerForgotPassword = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
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
        <form className="formForgotPassword" onSubmit={handleSendMail}>
          <Logo containerLogo={containerLogo} />
          <div className="containerTitle">
            <TitlePrimary conteudo="Esqueceu a senha?" />
          </div>
          <div className="description">
            <p>
              Não se preocupe! Digite seu e-mail para receber instruções de
              recuperação de senha
            </p>
          </div>
          <div className="containerInputEmail">
            <div className="contentInputForgotPassword">
              <label className="labelForgotPassword" for="email">
                E-mail
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="inputForgotPassword"
                type="text"
                id="email"
                name="email"
                placeholder="Insira seu e-mail"
              />
            </div>
          </div>
          <div className="containerButtonForgotPassword">
            <button
              handle={sendMail}
              type="submit"
              className="buttonForgotPassword"
            >
              Recuperar senha
            </button>
            <Link style={lembrouSenha} to="/login">
              Lembrou da senha?
            </Link>
          </div>
        </form>
      }
    />
  );
}
