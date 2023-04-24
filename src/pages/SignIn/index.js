import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import TitlePrimary from "../../components/TitlePrimary";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import BeforeLoggerColumnLayout from "../../layouts/BeforeLoggerColumnLayout";
import { ImSpinner } from "react-icons/im";
import { toast } from "react-toastify";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, exibeSppiner } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      let isSignIn = await signIn(email, password);
      if (isSignIn) {
        history.push("/dashboard");
      } else {
        history.push("/");
      }
    }

    if (email === "" || password === "") {
      toast.info("Preencha os campos");
    }
  }

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

  const containerButton = {
    marginTop: "0",
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
    <BeforeLoggerColumnLayout
      colum2Data={
        <form className="formLogin" onSubmit={handleLogin}>
          <div className="containerLogoLogin">
            <Logo />
          </div>
          <div className="containerTitle">
            <TitlePrimary conteudo="Dados de acesso" />
          </div>
          <div style={containerInputEmail}>
            <label style={label} for="email">
              E-mail
            </label>
            <input
              className="inputLogin"
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
                className="inputLogin"
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
          <div className="containerSignIn">
            <div style={containerButton}>
              <button type="submit" className="buttonSignIn">
                {exibeSppiner ? (
                  <ImSpinner size={30} className="loaderIcon" />
                ) : (
                  "Entrar"
                )}
              </button>
            </div>
            <Link className="esqueceuSenha" to="/forgotPassword">
              Esqueceu sua senha?
            </Link>
          </div>
        </form>
      }
    />
  );
}

export default SignIn;
