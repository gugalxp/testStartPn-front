import ArteVisual from "../../components/ArteVisual";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TitlePrimary from "../../components/TitlePrimary";

import { Link } from "react-router-dom";

export default function NewPassword() {
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
  };

  const containerTitle = {
    width: "100%",
    marginBottom: "14px",
    display: "flex",
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

  const containerInputSenha = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "25.93px",
    width: "100%",
  };

  const containerInputNewSenha = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginBottom: "37.67px",
  };

  const description = {
    marginBottom: "27.19px",
    width: "418px",
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
    <div style={containerMain}>
      <ArteVisual />
      <div style={column2}>
        <form style={form}>
          <Logo containerLogo={containerLogo} />
          <TitlePrimary
            containerTitle={containerTitle}
            conteudo="Crie uma nova senha"
          />
          <p style={description}>
            Preencha os campos abaixo com a nova senha que deseja cadastrar
          </p>
          <div style={containerInputSenha}>
            <label style={label} for="email">
              Nova senha
            </label>
            <input
              style={input}
              type="password"
              id="password"
              name="password"
              placeholder="Insira seu e-mail"
            />
          </div>
          <div style={containerInputNewSenha}>
            <label style={label} for="password">
                Confirmação de nova senha
            </label>
            <input
              style={input}
              type="password"
              id="password"
              name="password"
              placeholder="Insira seu e-mail"
            />
          </div>
          <div style={containerForgotPassword}>
            <Link to="/emailSent">
              <Button
                type="submit"
                containerButton={containerButton}
                buttonStyle={button}
                conteudo="Criar senha"
              />
            </Link>
            <Link style={lembrouSenha} to="/">
              Lembrou da senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}