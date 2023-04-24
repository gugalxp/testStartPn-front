import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TitlePrimary from "../../components/TitlePrimary";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";
import BeforeLoggerColumnLayout from "../../layouts/BeforeLoggerColumnLayout";
import { Link } from "react-router-dom";
import { ImSpinner } from "react-icons/im";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { sendMail, setEmailSentConfirmed, exibeSppiner } = useContext(AuthContext);
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

  const lembrouSenha = {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "20px",
    color: "#476ee6",
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
            Não se preocupe! <span style={{whiteSpace: "nowrap"}}>Digite seu e-mail</span> para receber instruções de
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
              className={exibeSppiner ? "buttonForgotPassword buttonSignInActive" : "buttonForgotPassword"}
            >
              {exibeSppiner ? <ImSpinner size={30} className="loaderIcon" /> : "Recuperar senha"}
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
