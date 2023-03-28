import ArteVisual from "../../components/ArteVisual";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TitlePrimary from "../../components/TitlePrimary";
import EmailEnviadoImg from "../../assets/images/emailEnviado.png";

import { Link } from "react-router-dom";

export default function EmailSent() {
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
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  };

  const containerLogo = {
    width: "100%",
    marginBottom: "39.26px",
    display: "flex",
    justifyContent: "center",
  };

  const containerTitle = {
    width: "100%",
    marginBottom: "17px",
    display: "flex",
    justifyContent: "center",
    fontStyle: "normal",
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

  const description = {
    marginBottom: "34px",
    width: "410px",
    textAlign: "center",
  };

  const containerButton = {
    marginTop: "0",
  };

  const containerButtons = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    gap: "20px",
  };

  const button1 = {
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

  const button2 = {
    background: "transparent",
    border: "1px solid #476ee6",
    width: "180px",
    height: "48px",
    borderRadius: "60px",
    color: "#476ee6",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "27px",
  };

  const containeremailEnviado = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  };

  const emailEnviado = {
    width: "100px",
    height: "100px",
  };

  return (
    <div style={containerMain}>
      <ArteVisual />
      <div style={column2}>
        <form style={form}>
          <Logo containerLogo={containerLogo} />
          <TitlePrimary
            containerTitle={containerTitle}
            conteudo="E-mail enviado!"
          />
          <p style={description}>
            Um link de recuperação de senha foi enviado para o e-mail
            <strong>mateus@startpn.com</strong>
          </p>

          <div style={containeremailEnviado}>
            <img style={emailEnviado} src={EmailEnviadoImg} alt="" />
          </div>

          <div style={containerButtons}>
            <Link to="/">
              <Button
                containerButton={containerButton}
                buttonStyle={button1}
                conteudo="Entendi"
              />
            </Link>
            <Button
              type="submit"
              containerButton={containerButton}
              buttonStyle={button2}
              conteudo="Reenviar e-mail"
            />
            {/* <Link style={lembrouSenha} to="/">Lembrou da senha?</Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}
