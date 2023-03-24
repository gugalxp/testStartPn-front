import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import ArteVisual from "../../components/ArteVisual";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TitlePrimary from "../../components/TitlePrimary";

import { BsEye, BsEyeSlash } from "react-icons/bs";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isAuthUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory(true);

  function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      signIn(email, password);
      history.push("/dashboard")
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
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
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
    marginBottom: "14.43px",
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
    marginBottom: "24.51px",
    width: "100%",
  };

  const containerInputPassword = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  };

  const form = {
    display: "flex",
    maxWidth: "418px",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0",
    padding: "0",
  };

  const containerButton = {
    marginTop: "0",
  };

  const containerForgotPassword = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "48.38px",
    cursor: "pointer",
  };

  const esqueceuSenha = {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "20px",
    color: "#476ee6",
  };

  const button = {
    background: "#476ee6",
    border: "none",
    width: "160px",
    height: "48px",
    borderRadius: "60px",
    color: "#fff",
    fontWeight: "500",
    fontSize: "17px",
    lineHeight: "20px",
  };

  const containerLogo = {
    width: "100%",
    marginBottom: "36.26px",
    display: "flex",
  };

  const containerTitle = {
    width: "100%",
    marginBottom: "30px",
    display: "flex",
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "500",
    lineHeight: "3%",
    padding: "0",
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
    <div style={containerMain} key={history.location.key}>
      <ArteVisual />
      <div style={column2}>
        <form style={form} onSubmit={handleLogin}>
          <Logo containerLogo={containerLogo} />
          <TitlePrimary
            containerTitle={containerTitle}
            conteudo="Dados de acesso"
          />
          <div style={containerInputEmail}>
            <label style={label} for="email">
              E-mail
            </label>
            <input
              style={input}
              type="text"
              id="email"
              name="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={containerInputPassword}>
            <label style={label} for="password">
              Senha
            </label>
            <div style={containerInputIcon}>
              <input
                style={input}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div style={containerForgotPassword}>
            <Button
              type="submit"
              containerButton={containerButton}
              buttonStyle={button}
              conteudo="Entrar"
            ></Button>
            <Link style={esqueceuSenha} to="/forgotPassword">
              Esqueceu sua senha?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
