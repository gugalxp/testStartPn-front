import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TitlePrimary from "../../components/TitlePrimary";
import EmailEnviadoImg from "../../assets/images/emailEnviado.png";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import { ImSpinner } from "react-icons/im";
import BeforeLoggerColumnLayout from "../../layouts/BeforeLoggerColumnLayout";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

export default function EmailSent() {
  const { emailSentConfirmed, sendMail, exibeSppiner } = useContext(AuthContext);

  async function handleEmailSent(e) {
    e.preventDefault();
    let response = await sendMail(emailSentConfirmed);
    if (response) {
      toast.success("E-mail reenviado com sucesso!");
    }
  }

  const containerTitle = {
    width: "100%",
    marginBottom: "17px",
    display: "flex",
    justifyContent: "center",
    fontStyle: "normal",
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "500",
    padding: "0",
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
    <BeforeLoggerColumnLayout
      colum2Data={
        <form className="formEmailSent">
          <div className="containerLogo">
            <Logo />
          </div>
          <TitlePrimary
            containerTitle={containerTitle}
            conteudo="E-mail enviado!"
          />
          <p className="descriptionEmailSent">
            Um link de recuperação de senha foi enviado para o e-mail
            <strong> {emailSentConfirmed} </strong>
          </p>

          <div style={containeremailEnviado}>
            <img style={emailEnviado} src={EmailEnviadoImg} alt="" />
          </div>

          <div style={containerButtons}>
            <Link to="/login">
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
              conteudo={exibeSppiner ? <ImSpinner size={30} className="loaderIcon" /> : "Reenviar e-mail"}
              handle={handleEmailSent}
            />
          </div>
        </form>
      }
    />
  );
}
