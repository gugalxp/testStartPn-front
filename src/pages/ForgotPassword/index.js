import ArteVisual from "../../components/ArteVisual";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TitlePrimary from "../../components/TitlePrimary";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { sendMail, setEmailSentConfirmed } = useContext(AuthContext);
  const history = useHistory();
  
  async function handleSendMail(e) {
    e.preventDefault();
    if (email) {
      setEmailSentConfirmed(email);
      let isEmail = await sendMail(email)
      if (isEmail) {
        history.push(`/emailSent`);
      }
    }
  }

  const containerMain = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr" /* cria duas colunas com a mesma largura */,
    gridColumnGap: "0px",
    gridRowGap: "0px",
    background: "#fff",
  };

  const column2 = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "column",
    height: '100%'
  };

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
  };

  const containerInputEmail = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "51px",
    width: "100%",
  };

  const description = {
    marginBottom: '34px',
    width: '418px'
  }

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
    <div style={containerMain}>
      <ArteVisual />
      <div style={column2}>
        <form style={form} onSubmit={handleSendMail}>
          <Logo containerLogo={containerLogo} />
          <TitlePrimary
            containerTitle={containerTitle}
            conteudo="Esqueceu a senha?"
          />
          <p style={description}>
            Não se preocupe! Digite seu e-mail para receber instruções de
            recuperação de senha
          </p>
          <div style={containerInputEmail}>
            <label style={label} for="email">
              E-mail
            </label>
            <input
              onChange={ (e) => setEmail(e.target.value) }
              style={input}
              type="text"
              id="email"
              name="email"
              placeholder="Insira seu e-mail"
            />
          </div>
        <div style={containerForgotPassword}>
              <Button
                handle={sendMail}
                type="submit"
                containerButton={containerButton}
                buttonStyle={button}
                conteudo="Recuperar senha"
              />
            <Link style={lembrouSenha} to="/">Lembrou da senha?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
